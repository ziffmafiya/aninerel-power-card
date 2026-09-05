import { html, TemplateResult } from 'lit';
import { BmsConfig } from '../types';

export interface CellData {
  index: number;
  voltage: number; // Normalized in Volts (e.g. 3.34)
  rawEntityId?: string;
}

export interface BmsPanelProps {
  bmsConfig: BmsConfig;
  soc: number | null;
  temperature: number | null;
  temperature2?: number | null;
  cycleCount: number | null;
  remainingCapacity: number | null;
  fullCapacity: number | null;
  cellDelta: number | null; // in mV
  cells: CellData[];
  onBmsClick: (entityId?: string) => void;
}

export function renderBmsPanel(props: BmsPanelProps): TemplateResult {
  const {
    bmsConfig,
    soc,
    temperature,
    temperature2,
    cycleCount,
    remainingCapacity,
    fullCapacity,
    cellDelta,
    cells,
    onBmsClick,
  } = props;

  // Compute min and max cell voltages
  const validVoltages = cells.map((c) => c.voltage).filter((v) => v > 0);
  const minV = validVoltages.length > 0 ? Math.min(...validVoltages) : 3.0;
  const maxV = validVoltages.length > 0 ? Math.max(...validVoltages) : 3.65;

  // Auto calculate delta in mV if not directly provided
  const deltaMv =
    cellDelta !== null && !isNaN(cellDelta)
      ? cellDelta
      : validVoltages.length > 0
      ? Math.round((maxV - minV) * 1000)
      : 0;

  // Delta severity color
  let deltaColor = '#10b981'; // Green: <= 20 mV
  let balanceStatus = 'Balanced';
  if (deltaMv > 50) {
    deltaColor = '#ef4444'; // Red: > 50 mV
    balanceStatus = 'Imbalance Alert';
  } else if (deltaMv > 20) {
    deltaColor = '#f59e0b'; // Amber: 20-50 mV
    balanceStatus = 'Normal Drift';
  }

  // Bar height scaling: LiFePO4 range 3.00V to 3.65V
  const minRange = 3.0;
  const maxRange = 3.65;
  const range = maxRange - minRange;

  return html`
    <div class="bms-card-section">
      <!-- Section Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="mdi:battery-heart-variant"></ha-icon>
          <span>BMS Redodo LiFePO4</span>
          ${soc !== null && !isNaN(soc)
            ? html`<span class="bms-soc-badge">${Math.round(soc)}% SOC</span>`
            : ''}
        </div>

        <div class="bms-header-status">
          <span
            class="bms-delta-pill"
            style="--delta-color: ${deltaColor}"
            @click=${() => onBmsClick(bmsConfig.cell_delta_entity)}
            title="Разница между максимальной и минимальной ячейкой: ${balanceStatus}"
          >
            <ha-icon icon="mdi:scale-balance"></ha-icon>
            <span>Δ ${deltaMv} mV</span>
          </span>
        </div>
      </div>

      <!-- Main BMS Body: Cell Bars + Key Telemetry -->
      <div class="bms-body">
        <!-- 8-Cell Bar Chart -->
        <div class="cells-grid" role="group" aria-label="LiFePO4 Cell Voltages">
          ${cells.map((cell) => {
            const isMin = cell.voltage === minV && validVoltages.length > 1;
            const isMax = cell.voltage === maxV && validVoltages.length > 1;

            // Height percentage clamped between 15% and 100%
            const heightPct = Math.max(
              15,
              Math.min(100, Math.round(((cell.voltage - minRange) / range) * 100))
            );

            // Color: green by default, special tag for min and max
            const barFillColor = isMax ? '#10b981' : isMin ? '#3b82f6' : '#0ea5e9';

            return html`
              <div
                class="cell-col"
                @click=${() => onBmsClick(cell.rawEntityId)}
                title="Ячейка #${cell.index}: ${cell.voltage.toFixed(3)} V ${isMax ? '(MAX)' : isMin ? '(MIN)' : ''}"
              >
                <div class="cell-bar-track">
                  <div
                    class="cell-bar-fill ${isMax ? 'cell-max' : ''} ${isMin ? 'cell-min' : ''}"
                    style="height: ${heightPct}%; background-color: ${barFillColor};"
                  ></div>
                </div>
                <span class="cell-voltage">${cell.voltage > 0 ? cell.voltage.toFixed(2) : '-'}V</span>
                <span class="cell-id">#${cell.index}</span>
              </div>
            `;
          })}
        </div>

        <!-- Right Side: BMS Telemetry Columns -->
        <div class="bms-telemetry-panel">
          <!-- Battery Temperature -->
          ${temperature !== null && !isNaN(temperature)
            ? html`
                <div
                  class="bms-stat-item"
                  @click=${() => onBmsClick(bmsConfig.temperature_entity)}
                  title="Температура датчика BMS"
                >
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${temperature.toFixed(1)}°C</span>
                    <span class="bms-stat-lbl">Temp</span>
                  </div>
                </div>
              `
            : ''}

          <!-- Cycles Count -->
          ${cycleCount !== null && !isNaN(cycleCount)
            ? html`
                <div
                  class="bms-stat-item"
                  @click=${() => onBmsClick(bmsConfig.cycle_count_entity)}
                  title="Количество циклов заряда/разряда"
                >
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${cycleCount}</span>
                    <span class="bms-stat-lbl">Cycles</span>
                  </div>
                </div>
              `
            : ''}

          <!-- Capacity (Remaining / Full Ah) -->
          ${remainingCapacity !== null && !isNaN(remainingCapacity)
            ? html`
                <div
                  class="bms-stat-item"
                  @click=${() => onBmsClick(bmsConfig.remaining_capacity_entity)}
                  title="Остаточная емкость аккумулятора"
                >
                  <ha-icon icon="mdi:battery-high"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">
                      ${Math.round(remainingCapacity)}${fullCapacity ? `/${Math.round(fullCapacity)}` : ''}Ah
                    </span>
                    <span class="bms-stat-lbl">Capacity</span>
                  </div>
                </div>
              `
            : ''}
        </div>
      </div>
    </div>
  `;
}
