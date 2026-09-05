import { html, TemplateResult } from 'lit';
import { AninerelCardConfig } from '../types';

export interface HeaderBarProps {
  config: AninerelCardConfig;
  operatingMode: string;
  temperature: number | null;
  isCharging: boolean;
  isFault: boolean;
  faultCode?: number | null;
  isWarning: boolean;
  warningCode?: number | null;
  onChipClick: (entityId?: string) => void;
}

export function renderHeaderBar(props: HeaderBarProps): TemplateResult {
  const {
    config,
    operatingMode,
    temperature,
    isCharging,
    isFault,
    faultCode,
    isWarning,
    warningCode,
    onChipClick,
  } = props;

  // Operating mode color mapping
  const modeNormalized = operatingMode ? operatingMode.toLowerCase() : '';
  let modeColor = '#10b981'; // default battery/green
  let modeIcon = 'mdi:battery-charging-60';

  if (modeNormalized.includes('mains') || modeNormalized.includes('line') || modeNormalized.includes('grid')) {
    modeColor = '#3b82f6';
    modeIcon = 'mdi:transmission-tower';
  } else if (modeNormalized.includes('bypass')) {
    modeColor = '#ef4444';
    modeIcon = 'mdi:transit-connection-variant';
  } else if (modeNormalized.includes('battery')) {
    modeColor = '#10b981';
    modeIcon = 'mdi:battery-outline';
  }

  // Inverter Temperature color thresholds
  let tempColor = '#10b981';
  if (temperature !== null && !isNaN(temperature)) {
    if (temperature > 55) {
      tempColor = '#ef4444';
    } else if (temperature > 42) {
      tempColor = '#f59e0b';
    }
  }

  return html`
    <div class="header-bar">
      <!-- Card Title & Inverter Model -->
      <div class="header-left">
        <div class="header-icon-box">
          <ha-icon icon="mdi:solar-power-variant-outline"></ha-icon>
        </div>
        <div class="header-title-box">
          <span class="header-title">${config.title || 'Aninerel ANL 4200T'}</span>
          <span class="header-subtitle">Hybrid 24V 4.2kW Inverter</span>
        </div>
      </div>

      <!-- Live Status Chips -->
      <div class="header-chips">
        <!-- Operating Mode Chip -->
        ${operatingMode && operatingMode !== 'N/A'
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${modeColor}"
                @click=${() => onChipClick(config.operating_mode_entity)}
                title="Режим работы инвертора"
              >
                <ha-icon .icon=${modeIcon}></ha-icon>
                <span>${operatingMode}</span>
              </button>
            `
          : ''}

        <!-- Inverter Temperature Chip -->
        ${temperature !== null && !isNaN(temperature)
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${tempColor}"
                @click=${() => onChipClick(config.inverter_temperature_entity)}
                title="Температура силового блока"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span>${Math.round(temperature)}°C</span>
              </button>
            `
          : ''}

        <!-- Charging Active Flag -->
        ${isCharging
          ? html`
              <button
                type="button"
                class="status-chip pulse-chip"
                style="--chip-color: #10b981"
                @click=${() => onChipClick(config.charging_active_entity)}
                title="Зарядка активна"
              >
                <ha-icon icon="mdi:battery-charging"></ha-icon>
                <span>CHG</span>
              </button>
            `
          : ''}

        <!-- Fault Active Chip -->
        ${isFault
          ? html`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${() => onChipClick(config.safety?.fault_code_entity || config.safety?.fault_active_entity)}
                title="Аварийное состояние инвертора"
              >
                <ha-icon icon="mdi:alert-circle"></ha-icon>
                <span>${faultCode ? `F${faultCode}` : 'FAULT'}</span>
              </button>
            `
          : ''}

        <!-- Warnings Active Chip -->
        ${isWarning && !isFault
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #f59e0b"
                @click=${() => onChipClick(config.safety?.warning_code_entity || config.safety?.warnings_active_entity)}
                title="Предупреждение инвертора"
              >
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${warningCode ? `W${warningCode}` : 'WARN'}</span>
              </button>
            `
          : ''}

        <!-- System Normal Chip -->
        ${!isFault && !isWarning
          ? html`
              <div class="status-chip chip-ok" title="Система в норме">
                <ha-icon icon="mdi:check-circle"></ha-icon>
                <span>OK</span>
              </div>
            `
          : ''}
      </div>
    </div>
  `;
}
