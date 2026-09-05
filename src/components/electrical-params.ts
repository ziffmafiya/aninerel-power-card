import { html, svg, TemplateResult } from 'lit';
import { AninerelCardConfig } from '../types';

export interface ElectricalParamsProps {
  config: AninerelCardConfig;
  batteryVoltage: number | null;
  batteryCurrent: number | null;
  gridVoltage: number | null;
  gridImportEnergyToday: number | null;
  loadEnergyToday: number | null;
  historyMap: Map<string, number[]>;
  onParamClick: (entityId?: string) => void;
}

/**
 * Generates lightweight responsive SVG sparkline
 */
function renderSparkline(data: number[], strokeColor: string): TemplateResult {
  if (!data || data.length < 2) {
    return html`<div class="sparkline-placeholder"></div>`;
  }

  const width = 110;
  const height = 26;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      // Invert Y axis for SVG (0 is top)
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return svg`
    <svg class="sparkline-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <polyline
        points="${points}"
        fill="none"
        stroke="${strokeColor}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;
}

/**
 * Renders radial arc progress gauge for Autarky / Self-Sufficiency
 */
function renderArcGauge(percent: number, color: string): TemplateResult {
  const radius = 22;
  const stroke = 4.5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius; // Half circle arc (180 deg)
  const clampedPercent = Math.max(0, Math.min(100, percent));
  const strokeDashoffset = circumference * (1 - clampedPercent / 100);

  return svg`
    <svg class="arc-gauge-svg" viewBox="0 0 50 30">
      <!-- Background track -->
      <path
        d="M 5 26 A 20 20 0 0 1 45 26"
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        stroke-width="${stroke}"
        stroke-linecap="round"
      />
      <!-- Active gauge arc -->
      <path
        d="M 5 26 A 20 20 0 0 1 45 26"
        fill="none"
        stroke="${color}"
        stroke-width="${stroke}"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${strokeDashoffset}"
      />
    </svg>
  `;
}

export function renderElectricalParams(props: ElectricalParamsProps): TemplateResult {
  const {
    config,
    batteryVoltage,
    batteryCurrent,
    gridVoltage,
    gridImportEnergyToday,
    loadEnergyToday,
    historyMap,
    onParamClick,
  } = props;

  // Battery voltage color coding (for 24V LiFePO4 pack)
  let batVColor = '#10b981';
  if (batteryVoltage !== null && !isNaN(batteryVoltage)) {
    if (batteryVoltage < 24.0 || batteryVoltage > 29.0) {
      batVColor = '#ef4444';
    } else if (batteryVoltage < 25.6) {
      batVColor = '#f59e0b';
    }
  }

  // Grid voltage color coding (230V nominal)
  let gridVColor = '#4285f4';
  let gridStatusLabel = 'Normal';
  if (gridVoltage !== null && !isNaN(gridVoltage)) {
    if (gridVoltage < 190 || gridVoltage > 255) {
      gridVColor = '#ef4444';
      gridStatusLabel = gridVoltage < 190 ? 'Low (Sag)' : 'High (Surge)';
    } else if (gridVoltage < 210 || gridVoltage > 245) {
      gridVColor = '#f59e0b';
      gridStatusLabel = 'Deviated';
    }
  }

  // Self-Sufficiency calculation: (1 - gridImport / totalLoad) * 100
  let selfSufficiency = 100;
  if (loadEnergyToday !== null && loadEnergyToday > 0) {
    const imported = gridImportEnergyToday !== null ? Math.max(0, gridImportEnergyToday) : 0;
    selfSufficiency = Math.max(0, Math.min(100, Math.round((1 - imported / loadEnergyToday) * 100)));
  }

  const autarkyColor = selfSufficiency >= 75 ? '#10b981' : selfSufficiency >= 40 ? '#f59e0b' : '#ef4444';

  const batHistory = historyMap.get('battery_voltage') || [];
  const gridHistory = historyMap.get('grid_voltage') || [];

  return html`
    <div class="params-grid">
      <!-- TILE 1: BATTERY TELEMETRY -->
      <div
        class="param-tile"
        @click=${() => onParamClick(config.battery_voltage_entity)}
        title="Параметры аккумулятора"
      >
        <div class="param-header">
          <ha-icon icon="mdi:car-battery"></ha-icon>
          <span class="param-title">Battery DC</span>
        </div>
        <div class="param-main-value">
          <span style="color: ${batVColor}">
            ${batteryVoltage !== null && !isNaN(batteryVoltage) ? `${batteryVoltage.toFixed(1)}V` : 'N/A'}
          </span>
          <span class="param-slash">/</span>
          <span style="color: ${batteryCurrent && batteryCurrent > 0 ? '#10b981' : '#f59e0b'}">
            ${batteryCurrent !== null && !isNaN(batteryCurrent)
              ? `${batteryCurrent > 0 ? '+' : ''}${batteryCurrent.toFixed(1)}A`
              : 'N/A'}
          </span>
        </div>
        <div class="param-chart-box">
          ${renderSparkline(batHistory, batVColor)}
        </div>
      </div>

      <!-- TILE 2: GRID TELEMETRY -->
      <div
        class="param-tile"
        @click=${() => onParamClick(config.grid_voltage_entity)}
        title="Сетевое напряжение"
      >
        <div class="param-header">
          <ha-icon icon="mdi:transmission-tower"></ha-icon>
          <span class="param-title">Grid AC</span>
          <span class="param-badge" style="background: ${gridVColor}22; color: ${gridVColor}">
            ${gridStatusLabel}
          </span>
        </div>
        <div class="param-main-value">
          <span style="color: ${gridVColor}">
            ${gridVoltage !== null && !isNaN(gridVoltage) ? `${Math.round(gridVoltage)}V` : 'N/A'}
          </span>
        </div>
        <div class="param-chart-box">
          ${renderSparkline(gridHistory, gridVColor)}
        </div>
      </div>

      <!-- TILE 3: KPI SELF-SUFFICIENCY (АВТОНОМНОСТЬ) -->
      <div
        class="param-tile"
        @click=${() => onParamClick(config.daily_energy?.grid_import_entity)}
        title="Дневная автономность"
      >
        <div class="param-header">
          <ha-icon icon="mdi:shield-sun"></ha-icon>
          <span class="param-title">Self-Sufficiency</span>
        </div>
        <div class="param-kpi-container">
          <div class="param-main-value kpi-val" style="color: ${autarkyColor}">
            ${selfSufficiency}%
          </div>
          <div class="arc-gauge-wrapper">
            ${renderArcGauge(selfSufficiency, autarkyColor)}
          </div>
        </div>
      </div>
    </div>
  `;
}
