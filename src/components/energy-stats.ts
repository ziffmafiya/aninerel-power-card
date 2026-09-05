import { html, TemplateResult } from 'lit';
import { DailyEnergyConfig } from '../types';
import { formatEnergy } from '../utils/format';

export interface EnergyStatsProps {
  dailyConfig: DailyEnergyConfig;
  loadEnergy: number | null;
  gridImportEnergy: number | null;
  batteryChargeEnergy: number | null;
  batteryDischargeEnergy: number | null;
  onEnergyClick: (entityId?: string) => void;
}

export function renderEnergyStats(props: EnergyStatsProps): TemplateResult {
  const {
    dailyConfig,
    loadEnergy,
    gridImportEnergy,
    batteryChargeEnergy,
    batteryDischargeEnergy,
    onEnergyClick,
  } = props;

  const load = loadEnergy !== null ? Math.max(0, loadEnergy) : 0;
  const grid = gridImportEnergy !== null ? Math.max(0, gridImportEnergy) : 0;
  const batChg = batteryChargeEnergy !== null ? Math.max(0, batteryChargeEnergy) : 0;
  const batDis = batteryDischargeEnergy !== null ? Math.max(0, batteryDischargeEnergy) : 0;

  // Maximum value for scaling bar widths
  const maxVal = Math.max(load, grid, batChg, batDis, 0.1);

  const items = [
    {
      id: dailyConfig.load_energy_entity,
      label: 'Потребление дома',
      value: load,
      color: '#e2e8f0',
      icon: 'mdi:home-lightning-bolt',
      pct: load > 0 ? 100 : 0,
    },
    {
      id: dailyConfig.grid_import_entity,
      label: 'Импорт из сети',
      value: grid,
      color: '#4285f4',
      icon: 'mdi:transmission-tower',
      pct: load > 0 ? Math.round((grid / load) * 100) : 0,
    },
    {
      id: dailyConfig.battery_charge_entity,
      label: 'Закачано в АКБ',
      value: batChg,
      color: '#10b981',
      icon: 'mdi:battery-plus-variant',
      pct: load > 0 ? Math.round((batChg / load) * 100) : 0,
    },
    {
      id: dailyConfig.battery_discharge_entity,
      label: 'Отдано батареей',
      value: batDis,
      color: '#f59e0b',
      icon: 'mdi:battery-minus-variant',
      pct: load > 0 ? Math.round((batDis / load) * 100) : 0,
    },
  ];

  return html`
    <div class="energy-card-section">
      <!-- Section Header -->
      <div class="energy-header">
        <div class="energy-header-title">
          <ha-icon icon="mdi:chart-box-outline"></ha-icon>
          <span>Суточный баланс энергии</span>
        </div>
        <span class="energy-total-pill">Итого: ${formatEnergy(load)}</span>
      </div>

      <!-- Horizontal Energy Bars List -->
      <div class="energy-bars-container">
        ${items.map((item) => {
          const barWidth = Math.max(3, Math.min(100, Math.round((item.value / maxVal) * 100)));

          return html`
            <div
              class="energy-row"
              @click=${() => onEnergyClick(item.id)}
              title="${item.label}: ${item.value.toFixed(2)} кВт·ч"
            >
              <!-- Icon and Label -->
              <div class="energy-row-info">
                <ha-icon icon="${item.icon}" style="color: ${item.color}"></ha-icon>
                <span class="energy-row-label">${item.label}</span>
              </div>

              <!-- Bar Track -->
              <div class="energy-track-wrapper">
                <div class="energy-track">
                  <div
                    class="energy-fill"
                    style="width: ${barWidth}%; background-color: ${item.color};"
                  ></div>
                </div>
              </div>

              <!-- Numeric Value & Percentage -->
              <div class="energy-row-val">
                <span class="energy-kwh" style="color: ${item.color}">
                  ${item.value.toFixed(1)} <small>kWh</small>
                </span>
                ${item.pct > 0 && item.pct !== 100
                  ? html`<span class="energy-pct">(${item.pct}%)</span>`
                  : ''}
              </div>
            </div>
          `;
        })}
      </div>
    </div>
  `;
}
