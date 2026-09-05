import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, AninerelCardConfig } from './types';
import { localize } from './localize/localize';

@customElement('aninerel-power-card-editor')
export class AninerelPowerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: AninerelCardConfig;

  public setConfig(config: AninerelCardConfig): void {
    this._config = config;
  }

  private _computeLabel(schema: any): string {
    if (schema.label) return schema.label;
    return localize(`editor.${schema.name}`, this.hass) || schema.name;
  }

  private _valueChanged(ev: CustomEvent): void {
    const value = ev.detail.value;
    const event = new CustomEvent('config-changed', {
      detail: { config: value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _getSchema() {
    return [
      {
        name: 'title',
        label: localize('editor.title', this.hass),
        selector: { text: {} },
      },
      // 1. Core Power Entities (Required)
      {
        name: 'entities',
        type: 'expandable',
        title: localize('editor.entities_group', this.hass),
        schema: [
          {
            name: 'solar_power',
            label: 'Солнечная генерация (PV Power)',
            required: true,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_power',
            label: 'Мощность батареи (+заряд / -разряд)',
            required: true,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'grid_power',
            label: 'Сетевая мощность (Grid Power)',
            required: true,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'load_power',
            label: 'Потребление дома (Load Power)',
            required: true,
            selector: { entity: { domain: 'sensor' } },
          },
        ],
      },
      // 2. Electrical Telemetry
      {
        name: '',
        type: 'expandable',
        title: localize('editor.params_group', this.hass),
        schema: [
          {
            name: 'battery_voltage_entity',
            label: 'Напряжение АКБ (Battery Voltage)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_current_entity',
            label: 'Ток АКБ (Battery Current)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'grid_voltage_entity',
            label: 'Напряжение сети (Grid Voltage)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'operating_mode_entity',
            label: 'Режим работы инвертора (Operating Mode)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'inverter_temperature_entity',
            label: 'Температура инвертора (Temperature °C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'charging_active_entity',
            label: 'Флаг зарядки (Charging Active)',
            selector: { entity: { domain: 'binary_sensor' } },
          },
        ],
      },
      // 3. BMS Redodo
      {
        name: 'bms',
        type: 'expandable',
        title: localize('editor.bms_group', this.hass),
        schema: [
          {
            name: 'soc_entity',
            label: 'Уровень заряда АКБ (SOC %)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'voltage_entity',
            label: 'Напряжение батареи по BMS',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'temperature_entity',
            label: 'Температура ячеек BMS (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'cell_delta_entity',
            label: 'Разбаланс ячеек (Cell Delta mV)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'cycle_count_entity',
            label: 'Счетчик циклов АКБ',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'remaining_capacity_entity',
            label: 'Остаточная емкость (Ah)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'cell_count',
            label: 'Количество ячеек (для 24В = 8)',
            selector: { number: { min: 4, max: 16, step: 1, mode: 'box' } },
          },
          {
            name: 'cell_voltage_prefix',
            label: 'Префикс сенсоров ячеек (напр. sensor.redodo_battery_cell_voltage_)',
            selector: { text: {} },
          },
        ],
      },
      // 4. Inverter Controls
      {
        name: 'controls',
        type: 'expandable',
        title: localize('editor.controls_group', this.hass),
        schema: [
          {
            name: 'charge_source_entity',
            label: 'Приоритет источника заряда (Select)',
            selector: { entity: { domain: 'select' } },
          },
          {
            name: 'output_priority_entity',
            label: 'Приоритет выхода потребителей (Select)',
            selector: { entity: { domain: 'select' } },
          },
          {
            name: 'max_charge_current_entity',
            label: 'Макс. ток сетевого заряда (Number)',
            selector: { entity: { domain: 'number' } },
          },
          {
            name: 'bulk_voltage_entity',
            label: 'Порог напряжения Bulk (Number)',
            selector: { entity: { domain: 'number' } },
          },
          {
            name: 'float_voltage_entity',
            label: 'Порог напряжения Float (Number)',
            selector: { entity: { domain: 'number' } },
          },
          {
            name: 'equalization_entity',
            label: 'Режим Equalization (Switch)',
            selector: { entity: { domain: 'switch' } },
          },
        ],
      },
      // 5. Safety & Alerts
      {
        name: 'safety',
        type: 'expandable',
        title: localize('editor.safety_group', this.hass),
        schema: [
          {
            name: 'fault_active_entity',
            label: 'Флаг аварии (Fault Active)',
            selector: { entity: { domain: 'binary_sensor' } },
          },
          {
            name: 'fault_code_entity',
            label: 'Код ошибки (Fault Code)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'warnings_active_entity',
            label: 'Флаг предупреждения (Warnings Active)',
            selector: { entity: { domain: 'binary_sensor' } },
          },
          {
            name: 'warning_code_entity',
            label: 'Код предупреждения (Warning Code)',
            selector: { entity: { domain: 'sensor' } },
          },
        ],
      },
      // 6. Daily Energy
      {
        name: 'daily_energy',
        type: 'expandable',
        title: localize('editor.energy_group', this.hass),
        schema: [
          {
            name: 'load_energy_entity',
            label: 'Суточное потребление дома (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'grid_import_entity',
            label: 'Суточный импорт из сети (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_charge_entity',
            label: 'Суточный заряд АКБ (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_discharge_entity',
            label: 'Суточный разряд АКБ (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
        ],
      },
      // 7. Visual & Section Visibility Options
      {
        name: '',
        type: 'expandable',
        title: localize('editor.display_group', this.hass),
        schema: [
          {
            name: 'max_power',
            label: 'Номинальная мощность шкалы (Вт)',
            selector: { number: { min: 1000, max: 20000, step: 200, mode: 'box' } },
          },
          {
            name: 'use_log_flow_model',
            label: 'Логарифмическая модель скорости анимации потоков',
            selector: { boolean: {} },
          },
          {
            name: 'show_header',
            label: 'Отображать верхнюю шапку со статусами',
            selector: { boolean: {} },
          },
          {
            name: 'show_flow',
            label: 'Отображать анимацию потоков энергии',
            selector: { boolean: {} },
          },
          {
            name: 'show_params',
            label: 'Отображать электрические параметры',
            selector: { boolean: {} },
          },
          {
            name: 'show_bms',
            label: 'Отображать секцию BMS Redodo',
            selector: { boolean: {} },
          },
          {
            name: 'show_controls',
            label: 'Отображать блок управления инвертором',
            selector: { boolean: {} },
          },
          {
            name: 'show_energy',
            label: 'Отображать суточные счетчики энергии',
            selector: { boolean: {} },
          },
          {
            name: 'show_alerts',
            label: 'Отображать предупреждения и аварии',
            selector: { boolean: {} },
          },
        ],
      },
    ];
  }

  static styles = css`
    ha-form {
      display: block;
      padding: 12px 0;
    }
  `;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${(s: any) => this._computeLabel(s)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
