import { html, TemplateResult } from 'lit';
import { ControlsConfig, HomeAssistant } from '../types';

export interface ControlsPanelProps {
  controlsConfig: ControlsConfig;
  hass: HomeAssistant;
  expanded: boolean;
  onToggleExpand: () => void;
  chargeSource?: string;
  chargeSourceOptions: string[];
  outputPriority?: string;
  outputPriorityOptions: string[];
  maxChargeCurrent?: number;
  bulkVoltage?: number;
  floatVoltage?: number;
  isEqualization: boolean;
  onSelectOption: (entityId: string, option: string) => void;
  onSetNumber: (entityId: string, value: number) => void;
  onToggleSwitch: (entityId: string, current: boolean) => void;
}

export function renderControlsPanel(props: ControlsPanelProps): TemplateResult {
  const {
    controlsConfig,
    expanded,
    onToggleExpand,
    chargeSource,
    chargeSourceOptions,
    outputPriority,
    outputPriorityOptions,
    maxChargeCurrent,
    bulkVoltage,
    floatVoltage,
    isEqualization,
    onSelectOption,
    onSetNumber,
    onToggleSwitch,
  } = props;

  return html`
    <div class="controls-card-section ${expanded ? 'expanded' : ''}">
      <!-- Accordion Header -->
      <div class="controls-header" @click=${onToggleExpand}>
        <div class="controls-header-title">
          <ha-icon icon="mdi:tune-vertical"></ha-icon>
          <span>Инвертор: Управление и автоматизации</span>
        </div>
        <div class="controls-header-right">
          <span class="controls-quick-summary">
            ${outputPriority || 'SBU'} • ${maxChargeCurrent ? `${maxChargeCurrent}A` : '15A'}
          </span>
          <ha-icon
            class="chevron-icon ${expanded ? 'open' : ''}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </div>
      </div>

      <!-- Expandable Controls Content -->
      ${expanded
        ? html`
            <div class="controls-body">
              <!-- Grid Row: Priority Selectors -->
              <div class="controls-grid-2">
                <!-- Select 1: Charge Source Priority (SNU / Only Solar) -->
                ${controlsConfig.charge_source_entity
                  ? html`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
                          <label>Источник заряда</label>
                        </div>
                        <div class="pill-selector">
                          ${(chargeSourceOptions.length > 0
                            ? chargeSourceOptions
                            : ['Solar First', 'Solar and Utility', 'Only Solar']
                          ).map(
                            (opt) => html`
                              <button
                                type="button"
                                class="pill-btn ${chargeSource === opt ? 'active' : ''}"
                                @click=${() =>
                                  onSelectOption(controlsConfig.charge_source_entity!, opt)}
                              >
                                ${opt}
                              </button>
                            `
                          )}
                        </div>
                      </div>
                    `
                  : ''}

                <!-- Select 2: Output Source Priority (SUB, SBU, USB) -->
                ${controlsConfig.output_priority_entity
                  ? html`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:power-plug-outline"></ha-icon>
                          <label>Приоритет питания дома</label>
                        </div>
                        <div class="pill-selector">
                          ${(outputPriorityOptions.length > 0
                            ? outputPriorityOptions
                            : ['SUB', 'SBU', 'USB']
                          ).map(
                            (opt) => html`
                              <button
                                type="button"
                                class="pill-btn ${outputPriority === opt ? 'active' : ''}"
                                @click=${() =>
                                  onSelectOption(controlsConfig.output_priority_entity!, opt)}
                              >
                                ${opt}
                              </button>
                            `
                          )}
                        </div>
                      </div>
                    `
                  : ''}
              </div>

              <!-- Slider: Max AC Charging Current (2 to 30 A) -->
              ${controlsConfig.max_charge_current_entity
                ? html`
                    <div class="control-box slider-box">
                      <div class="control-box-header">
                        <div class="control-label-wrap">
                          <ha-icon icon="mdi:current-ac"></ha-icon>
                          <label>Макс. ток сетевого заряда</label>
                        </div>
                        <span class="control-live-val">${maxChargeCurrent ?? 15} A</span>
                      </div>
                      <div class="slider-input-container">
                        <span class="slider-boundary">2A</span>
                        <input
                          type="range"
                          class="control-range"
                          min="2"
                          max="30"
                          step="1"
                          .value=${String(maxChargeCurrent ?? 15)}
                          @change=${(e: Event) => {
                            const val = parseFloat((e.target as HTMLInputElement).value);
                            onSetNumber(controlsConfig.max_charge_current_entity!, val);
                          }}
                        />
                        <span class="slider-boundary">30A</span>
                      </div>
                    </div>
                  `
                : ''}

              <!-- Dual Voltage Inputs: Bulk & Float -->
              <div class="controls-grid-2">
                <!-- Bulk Voltage -->
                ${controlsConfig.bulk_voltage_entity
                  ? html`
                      <div class="control-box mini-voltage">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:arrow-up-bold-box-outline"></ha-icon>
                          <label>Напряжение Bulk</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${() => {
                              const next = Number(((bulkVoltage ?? 28.2) - 0.1).toFixed(1));
                              onSetNumber(controlsConfig.bulk_voltage_entity!, next);
                            }}
                          >
                            -
                          </button>
                          <span class="stepper-val">${bulkVoltage?.toFixed(1) ?? '28.2'} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${() => {
                              const next = Number(((bulkVoltage ?? 28.2) + 0.1).toFixed(1));
                              onSetNumber(controlsConfig.bulk_voltage_entity!, next);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `
                  : ''}

                <!-- Float Voltage -->
                ${controlsConfig.float_voltage_entity
                  ? html`
                      <div class="control-box mini-voltage">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:arrow-down-bold-box-outline"></ha-icon>
                          <label>Напряжение Float</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${() => {
                              const next = Number(((floatVoltage ?? 27.0) - 0.1).toFixed(1));
                              onSetNumber(controlsConfig.float_voltage_entity!, next);
                            }}
                          >
                            -
                          </button>
                          <span class="stepper-val">${floatVoltage?.toFixed(1) ?? '27.0'} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${() => {
                              const next = Number(((floatVoltage ?? 27.0) + 0.1).toFixed(1));
                              onSetNumber(controlsConfig.float_voltage_entity!, next);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `
                  : ''}
              </div>

              <!-- DANGER ZONE: Equalization Switch -->
              ${controlsConfig.equalization_entity
                ? html`
                    <div class="danger-switch-row ${isEqualization ? 'danger-active' : ''}">
                      <div class="danger-info">
                        <div class="danger-title">
                          <ha-icon icon="mdi:alert-octagon"></ha-icon>
                          <span>Режим Equalization (Выравнивание)</span>
                        </div>
                        <span class="danger-desc">
                          ⚠️ Для LiFePO4 должен быть ВСЕГДА ВЫКЛЮЧЕН во избежание перезаряда ячеек!
                        </span>
                      </div>

                      <button
                        type="button"
                        class="toggle-switch-btn ${isEqualization ? 'switch-on' : 'switch-off'}"
                        @click=${() => {
                          if (!isEqualization) {
                            const confirmed = confirm(
                              'ВНИМАНИЕ!\nРежим выравнивания (Equalization) категорически не рекомендуется для LiFePO4 аккумуляторов (Redodo) и может привести к повреждению ячеек!\n\nВы действительно уверены, что хотите включить?'
                            );
                            if (!confirmed) return;
                          }
                          onToggleSwitch(controlsConfig.equalization_entity!, isEqualization);
                        }}
                      >
                        ${isEqualization ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  `
                : ''}
            </div>
          `
        : ''}
    </div>
  `;
}
