import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, AninerelCardConfig } from './types';
import { localize } from './localize/localize';

@customElement('aninerel-power-card-editor')
export class AninerelPowerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: AninerelCardConfig;

  public setConfig(config: AninerelCardConfig): void {
    const copy = JSON.parse(JSON.stringify(config || {}));
    if (copy.bms) {
      if (copy.bms.battery_1) {
        if (!copy.bms.bat1_name && copy.bms.battery_1.name) copy.bms.bat1_name = copy.bms.battery_1.name;
        if (!copy.bms.bat1_soc_entity && copy.bms.battery_1.soc_entity) copy.bms.bat1_soc_entity = copy.bms.battery_1.soc_entity;
        if (!copy.bms.bat1_voltage_entity && copy.bms.battery_1.voltage_entity) copy.bms.bat1_voltage_entity = copy.bms.battery_1.voltage_entity;
        if (!copy.bms.bat1_temperature_entity && copy.bms.battery_1.temperature_entity) copy.bms.bat1_temperature_entity = copy.bms.battery_1.temperature_entity;
        if (!copy.bms.bat1_cell_prefix && copy.bms.battery_1.cell_voltage_prefix) copy.bms.bat1_cell_prefix = copy.bms.battery_1.cell_voltage_prefix;
      }
      if (copy.bms.battery_2) {
        if (!copy.bms.bat2_name && copy.bms.battery_2.name) copy.bms.bat2_name = copy.bms.battery_2.name;
        if (!copy.bms.bat2_soc_entity && copy.bms.battery_2.soc_entity) copy.bms.bat2_soc_entity = copy.bms.battery_2.soc_entity;
        if (!copy.bms.bat2_voltage_entity && copy.bms.battery_2.voltage_entity) copy.bms.bat2_voltage_entity = copy.bms.battery_2.voltage_entity;
        if (!copy.bms.bat2_temperature_entity && copy.bms.battery_2.temperature_entity) copy.bms.bat2_temperature_entity = copy.bms.battery_2.temperature_entity;
        if (!copy.bms.bat2_cell_prefix && copy.bms.battery_2.cell_voltage_prefix) copy.bms.bat2_cell_prefix = copy.bms.battery_2.cell_voltage_prefix;
      }
    }
    this._config = copy;
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
            name: 'dual_battery',
            label: '🔋 Режим: Две батареи 12В последовательно (Серия 24В)',
            selector: { boolean: {} },
          },
          // --- Батарея #1 (12V LiFePO4) ---
          {
            name: 'bat1_name',
            label: 'АКБ #1: Название батареи (напр. Redodo #1)',
            selector: { text: {} },
          },
          {
            name: 'bat1_soc_entity',
            label: 'АКБ #1: Уровень заряда (SOC %)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_voltage_entity',
            label: 'АКБ #1: Напряжение батареи (~13.5В)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_temperature_entity',
            label: 'АКБ #1: Температура (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_cell_prefix',
            label: 'АКБ #1: Префикс сенсоров ячеек (1..4)',
            selector: { text: {} },
          },
          // --- Батарея #2 (12V LiFePO4) ---
          {
            name: 'bat2_name',
            label: 'АКБ #2: Название батареи (напр. Redodo #2)',
            selector: { text: {} },
          },
          {
            name: 'bat2_soc_entity',
            label: 'АКБ #2: Уровень заряда (SOC %)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_voltage_entity',
            label: 'АКБ #2: Напряжение батареи (~13.5В)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_temperature_entity',
            label: 'АКБ #2: Температура (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_cell_prefix',
            label: 'АКБ #2: Префикс сенсоров ячеек (1..4)',
            selector: { text: {} },
          },
          // --- Общие параметры сборки / Одиночный аккумулятор ---
          {
            name: 'soc_entity',
            label: 'Общий / Средний SOC % (если есть общий датчик)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'voltage_entity',
            label: 'Общее напряжение батареи по BMS (24В)',
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
            label: 'Количество ячеек единой сборки (для 24В = 8)',
            selector: { number: { min: 4, max: 16, step: 1, mode: 'box' } },
          },
          {
            name: 'cell_voltage_prefix',
            label: 'Префикс сенсоров ячеек единой сборки (1..8)',
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
