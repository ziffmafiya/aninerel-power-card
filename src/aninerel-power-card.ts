import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, AninerelCardConfig, LovelaceCard } from './types';
import { CARD_NAME, CARD_VERSION, DEFAULT_CONFIG, STUB_CONFIG } from './const';
import { cardStyles } from './styles';
import { renderHeaderBar } from './components/header-bar';
import { renderPowerFlow } from './components/power-flow';
import { renderElectricalParams } from './components/electrical-params';
import { renderBmsPanel, CellData } from './components/bms-panel';
import { renderControlsPanel } from './components/controls-panel';
import { renderEnergyStats } from './components/energy-stats';
import { renderAlertPanel } from './components/alert-panel';

// Console banner on load
console.info(
  `%c  ANINEREL-POWER-CARD  %c  Version ${CARD_VERSION}  `,
  'color: #ffffff; background: #F59E0B; font-weight: bold; border-radius: 3px 0 0 3px;',
  'color: #000000; background: #10B981; font-weight: bold; border-radius: 0 3px 3px 0;'
);

@customElement(CARD_NAME)
export class AninerelPowerCard extends LitElement implements LovelaceCard {
  @state() private _config!: AninerelCardConfig;
  @state() private _hass!: HomeAssistant;
  @state() private _controlsExpanded = false;

  // Sliding history buffer for sparkline generation
  private _historyMap: Map<string, number[]> = new Map();
  private readonly _maxHistoryPoints = 16;

  static styles = [cardStyles];

  // 1. Lifecycle: setConfig
  public setConfig(config: AninerelCardConfig): void {
    if (!config) {
      throw new Error('Некорректная конфигурация карточки');
    }
    if (!config.entities) {
      throw new Error('Обязательный блок "entities" не задан в конфигурации');
    }
    if (!config.entities.solar_power || !config.entities.load_power) {
      throw new Error('Необходимо указать как минимум entities.solar_power и entities.load_power');
    }

    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      entities: { ...config.entities },
      bms: config.bms ? { ...config.bms } : undefined,
      controls: config.controls ? { ...config.controls } : undefined,
      safety: config.safety ? { ...config.safety } : undefined,
      daily_energy: config.daily_energy ? { ...config.daily_energy } : undefined,
      colors: config.colors ? { ...config.colors } : undefined,
    } as AninerelCardConfig;
  }

  // 2. Lifecycle: hass setter with dirty checking and history recording
  set hass(hass: HomeAssistant) {
    const oldHass = this._hass;
    this._hass = hass;

    if (!oldHass || this._hasRelevantEntitiesChanged(oldHass, hass)) {
      this._updateHistoryBuffers();
      this.requestUpdate();
    }
  }

  get hass(): HomeAssistant {
    return this._hass;
  }

  // 3. Lovelace Sizing for Masonry layout (1 unit = 50px)
  public getCardSize(): number {
    return 14;
  }

  // 4. Modern Sections View Grid Options (HA 2024.3+)
  public getLayoutOptions() {
    return {
      grid_rows: 14,
      grid_columns: 4,
      grid_min_rows: 8,
      grid_min_columns: 2,
    };
  }

  // 5. Default stub configuration when clicking "+ Add Card" in HA UI
  public static getStubConfig(): Record<string, any> {
    return STUB_CONFIG;
  }

  // 6. Connect Visual GUI Configuration Editor
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./editor');
    return document.createElement('aninerel-power-card-editor');
  }

  // Records numeric history points for sparklines
  private _updateHistoryBuffers(): void {
    if (!this._config || !this._hass) return;

    if (this._config.battery_voltage_entity) {
      const batV = this._getNumber(this._config.battery_voltage_entity);
      if (batV !== null && !isNaN(batV)) {
        this._pushHistory('battery_voltage', batV);
      }
    }

    if (this._config.grid_voltage_entity) {
      const gridV = this._getNumber(this._config.grid_voltage_entity);
      if (gridV !== null && !isNaN(gridV)) {
        this._pushHistory('grid_voltage', gridV);
      }
    }
  }

  private _pushHistory(key: string, val: number): void {
    const arr = this._historyMap.get(key) || [];
    if (arr.length === 0 || arr[arr.length - 1] !== val) {
      arr.push(val);
      if (arr.length > this._maxHistoryPoints) {
        arr.shift();
      }
      this._historyMap.set(key, arr);
    }
  }

  // Dirty checking helper: only re-render if monitored entities update
  private _hasRelevantEntitiesChanged(oldHass: HomeAssistant, newHass: HomeAssistant): boolean {
    if (!this._config) return true;
    const watched = this._getMonitoredEntityIds();
    for (const id of watched) {
      if (oldHass.states[id] !== newHass.states[id]) {
        return true;
      }
    }
    return false;
  }

  private _getMonitoredEntityIds(): string[] {
    const ids: string[] = [];
    if (!this._config) return ids;

    const { entities, bms, controls, safety, daily_energy } = this._config;

    if (entities) {
      if (entities.solar_power) ids.push(entities.solar_power);
      if (entities.battery_power) ids.push(entities.battery_power);
      if (entities.grid_power) ids.push(entities.grid_power);
      if (entities.load_power) ids.push(entities.load_power);
    }

    if (this._config.battery_voltage_entity) ids.push(this._config.battery_voltage_entity);
    if (this._config.battery_current_entity) ids.push(this._config.battery_current_entity);
    if (this._config.grid_voltage_entity) ids.push(this._config.grid_voltage_entity);
    if (this._config.operating_mode_entity) ids.push(this._config.operating_mode_entity);
    if (this._config.charging_active_entity) ids.push(this._config.charging_active_entity);
    if (this._config.inverter_temperature_entity) ids.push(this._config.inverter_temperature_entity);

    if (bms) {
      if (bms.soc_entity) ids.push(bms.soc_entity);
      if (bms.voltage_entity) ids.push(bms.voltage_entity);
      if (bms.current_entity) ids.push(bms.current_entity);
      if (bms.temperature_entity) ids.push(bms.temperature_entity);
      if (bms.temperature_2_entity) ids.push(bms.temperature_2_entity);
      if (bms.cycle_count_entity) ids.push(bms.cycle_count_entity);
      if (bms.cell_delta_entity) ids.push(bms.cell_delta_entity);
      if (bms.remaining_capacity_entity) ids.push(bms.remaining_capacity_entity);
      if (bms.full_capacity_entity) ids.push(bms.full_capacity_entity);

      const count = bms.cell_count || 8;
      const prefix = bms.cell_voltage_prefix || 'sensor.redodo_battery_cell_voltage_';
      for (let i = 1; i <= count; i++) {
        ids.push(`${prefix}${i}`);
      }
    }

    if (controls) {
      if (controls.charge_source_entity) ids.push(controls.charge_source_entity);
      if (controls.output_priority_entity) ids.push(controls.output_priority_entity);
      if (controls.max_charge_current_entity) ids.push(controls.max_charge_current_entity);
      if (controls.bulk_voltage_entity) ids.push(controls.bulk_voltage_entity);
      if (controls.float_voltage_entity) ids.push(controls.float_voltage_entity);
      if (controls.equalization_entity) ids.push(controls.equalization_entity);
    }

    if (safety) {
      if (safety.fault_active_entity) ids.push(safety.fault_active_entity);
      if (safety.fault_code_entity) ids.push(safety.fault_code_entity);
      if (safety.warnings_active_entity) ids.push(safety.warnings_active_entity);
      if (safety.warning_code_entity) ids.push(safety.warning_code_entity);
    }

    if (daily_energy) {
      if (daily_energy.load_energy_entity) ids.push(daily_energy.load_energy_entity);
      if (daily_energy.grid_import_entity) ids.push(daily_energy.grid_import_entity);
      if (daily_energy.battery_charge_entity) ids.push(daily_energy.battery_charge_entity);
      if (daily_energy.battery_discharge_entity) ids.push(daily_energy.battery_discharge_entity);
    }

    return ids.filter(Boolean);
  }

  private _getState(entityId?: string): string {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return 'N/A';
    return this._hass.states[entityId].state;
  }

  private _getNumber(entityId?: string): number {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return 0;
    const val = parseFloat(this._hass.states[entityId].state);
    return isNaN(val) ? 0 : val;
  }

  private _getOptions(entityId?: string): string[] {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return [];
    return this._hass.states[entityId].attributes?.options || [];
  }

  private _handleEntityClick(entityId?: string): void {
    if (!entityId) return;
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  // Service callers for inverter control commands
  private async _handleSelectOption(entityId: string, option: string): Promise<void> {
    if (!this._hass) return;
    try {
      await this._hass.callService('select', 'select_option', {
        entity_id: entityId,
        option,
      });
    } catch (err: any) {
      console.error('Failed to set option:', err);
    }
  }

  private async _handleSetNumber(entityId: string, value: number): Promise<void> {
    if (!this._hass) return;
    try {
      await this._hass.callService('number', 'set_value', {
        entity_id: entityId,
        value,
      });
    } catch (err: any) {
      console.error('Failed to set number value:', err);
    }
  }

  private async _handleToggleSwitch(entityId: string, currentState: boolean): Promise<void> {
    if (!this._hass) return;
    try {
      await this._hass.callService('switch', currentState ? 'turn_off' : 'turn_on', {
        entity_id: entityId,
      });
    } catch (err: any) {
      console.error('Failed to toggle switch:', err);
    }
  }

  protected render() {
    if (!this._config) return html``;

    // Power values
    const solarWatts = this._getNumber(this._config.entities.solar_power);
    const batteryWatts = this._getNumber(this._config.entities.battery_power);
    const gridWatts = this._getNumber(this._config.entities.grid_power);
    const loadWatts = this._getNumber(this._config.entities.load_power);
    // Electrical telemetry
    const batteryVoltage = this._config.battery_voltage_entity
      ? this._getNumber(this._config.battery_voltage_entity)
      : null;
    const batteryCurrent = this._config.battery_current_entity
      ? this._getNumber(this._config.battery_current_entity)
      : null;
    const gridVoltage = this._config.grid_voltage_entity
      ? this._getNumber(this._config.grid_voltage_entity)
      : null;

    // Battery SOC (reads BMS sensor, with intelligent fallback for 24V 8S LiFePO4 pack)
    let batterySoc = this._config.bms?.soc_entity
      ? this._getNumber(this._config.bms.soc_entity)
      : 0;

    if ((batterySoc <= 0 || isNaN(batterySoc)) && batteryVoltage && batteryVoltage >= 20) {
      if (batteryVoltage >= 27.2) batterySoc = 100;
      else if (batteryVoltage >= 26.8) batterySoc = Math.round(80 + ((batteryVoltage - 26.8) / 0.4) * 20);
      else if (batteryVoltage >= 26.4) batterySoc = Math.round(50 + ((batteryVoltage - 26.4) / 0.4) * 30);
      else if (batteryVoltage >= 26.0) batterySoc = Math.round(20 + ((batteryVoltage - 26.0) / 0.4) * 30);
      else if (batteryVoltage >= 24.0) batterySoc = Math.max(5, Math.round(((batteryVoltage - 24.0) / 2.0) * 20));
      else batterySoc = 5;
    } else if (batterySoc <= 0 && (!batteryVoltage || batteryVoltage < 20)) {
      batterySoc = 80;
    }

    // Inverter statuses & alerts
    const operatingMode = this._getState(this._config.operating_mode_entity);
    const temperature = this._config.inverter_temperature_entity
      ? this._getNumber(this._config.inverter_temperature_entity)
      : null;

    const isCharging = this._getState(this._config.charging_active_entity) === 'on';
    const isFault = this._getState(this._config.safety?.fault_active_entity) === 'on';
    const faultCode = this._config.safety?.fault_code_entity
      ? parseInt(this._getState(this._config.safety.fault_code_entity), 10)
      : null;

    const isWarning = this._getState(this._config.safety?.warnings_active_entity) === 'on';
    const warningCode = this._config.safety?.warning_code_entity
      ? parseInt(this._getState(this._config.safety.warning_code_entity), 10)
      : null;

    // Daily energy
    const gridImportEnergyToday = this._config.daily_energy?.grid_import_entity
      ? this._getNumber(this._config.daily_energy.grid_import_entity)
      : null;
    const loadEnergyToday = this._config.daily_energy?.load_energy_entity
      ? this._getNumber(this._config.daily_energy.load_energy_entity)
      : null;
    const batChargeEnergyToday = this._config.daily_energy?.battery_charge_entity
      ? this._getNumber(this._config.daily_energy.battery_charge_entity)
      : null;
    const batDischargeEnergyToday = this._config.daily_energy?.battery_discharge_entity
      ? this._getNumber(this._config.daily_energy.battery_discharge_entity)
      : null;

    // BMS Redodo telemetry
    const bms = this._config.bms;
    let bmsCells: CellData[] = [];
    if (bms) {
      const cellCount = bms.cell_count || 8;
      const prefix = bms.cell_voltage_prefix || 'sensor.redodo_battery_cell_voltage_';

      for (let i = 1; i <= cellCount; i++) {
        const entityId = `${prefix}${i}`;
        let rawVal = this._getNumber(entityId);
        if (rawVal > 100) {
          rawVal = rawVal / 1000;
        }
        if (rawVal <= 0 && batteryVoltage && batteryVoltage > 0) {
          rawVal = Number((batteryVoltage / cellCount).toFixed(3));
        }
        bmsCells.push({
          index: i,
          voltage: rawVal > 0 ? rawVal : 3.33,
          rawEntityId: entityId,
        });
      }
    }

    // Inverter Controls
    const controls = this._config.controls;
    const safety = this._config.safety;
    const dailyEnergy = this._config.daily_energy;

    return html`
      <ha-card>
        <!-- 1. Header Bar with live status chips -->
        ${this._config.show_header !== false
          ? renderHeaderBar({
              config: this._config,
              operatingMode,
              temperature,
              isCharging,
              isFault,
              faultCode,
              isWarning,
              warningCode,
              onChipClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 2. Active Safety & Diagnostics Alert Banners (if any faults/warnings) -->
        ${this._config.show_alerts !== false && safety
          ? renderAlertPanel({
              safetyConfig: safety,
              isFault,
              faultCode,
              isWarning,
              warningCode,
              onAlertClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 3. Power Flow Animated Diagram -->
        ${this._config.show_flow !== false
          ? renderPowerFlow({
              hass: this._hass,
              config: this._config,
              solarWatts,
              batteryWatts,
              gridWatts,
              loadWatts,
              batterySoc,
              operatingMode: operatingMode !== 'N/A' ? operatingMode : 'Inverter',
              isFault,
              onNodeClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 4. Electrical Telemetry & Self-Sufficiency KPI -->
        ${this._config.show_params !== false
          ? renderElectricalParams({
              config: this._config,
              batteryVoltage,
              batteryCurrent,
              gridVoltage,
              gridImportEnergyToday,
              loadEnergyToday,
              historyMap: this._historyMap,
              onParamClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 5. BMS Redodo LiFePO4 Cell Telemetry & Balancing -->
        ${this._config.show_bms !== false && bms
          ? renderBmsPanel({
              bmsConfig: bms,
              soc: batterySoc,
              temperature: bms.temperature_entity ? this._getNumber(bms.temperature_entity) : null,
              temperature2: bms.temperature_2_entity ? this._getNumber(bms.temperature_2_entity) : null,
              cycleCount: bms.cycle_count_entity ? this._getNumber(bms.cycle_count_entity) : null,
              remainingCapacity: bms.remaining_capacity_entity ? this._getNumber(bms.remaining_capacity_entity) : null,
              fullCapacity: bms.full_capacity_entity ? this._getNumber(bms.full_capacity_entity) : null,
              cellDelta: bms.cell_delta_entity ? this._getNumber(bms.cell_delta_entity) : null,
              cells: bmsCells,
              onBmsClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 6. Inverter Controls & Automations Panel -->
        ${this._config.show_controls !== false && controls
          ? renderControlsPanel({
              controlsConfig: controls,
              hass: this._hass,
              expanded: this._controlsExpanded,
              onToggleExpand: () => {
                this._controlsExpanded = !this._controlsExpanded;
              },
              chargeSource: controls.charge_source_entity ? this._getState(controls.charge_source_entity) : undefined,
              chargeSourceOptions: this._getOptions(controls.charge_source_entity),
              outputPriority: controls.output_priority_entity ? this._getState(controls.output_priority_entity) : undefined,
              outputPriorityOptions: this._getOptions(controls.output_priority_entity),
              maxChargeCurrent: controls.max_charge_current_entity ? this._getNumber(controls.max_charge_current_entity) : undefined,
              bulkVoltage: controls.bulk_voltage_entity ? this._getNumber(controls.bulk_voltage_entity) : undefined,
              floatVoltage: controls.float_voltage_entity ? this._getNumber(controls.float_voltage_entity) : undefined,
              isEqualization: controls.equalization_entity ? this._getState(controls.equalization_entity) === 'on' : false,
              onSelectOption: (id, opt) => this._handleSelectOption(id, opt),
              onSetNumber: (id, val) => this._handleSetNumber(id, val),
              onToggleSwitch: (id, cur) => this._handleToggleSwitch(id, cur),
            })
          : ''}

        <!-- 7. Daily Energy Statistics (Today's Production & Consumption) -->
        ${this._config.show_energy !== false && dailyEnergy
          ? renderEnergyStats({
              dailyConfig: dailyEnergy,
              loadEnergy: loadEnergyToday,
              gridImportEnergy: gridImportEnergyToday,
              batteryChargeEnergy: batChargeEnergyToday,
              batteryDischargeEnergy: batDischargeEnergyToday,
              onEnergyClick: (id) => this._handleEntityClick(id),
            })
          : ''}
      </ha-card>
    `;
  }
}

// Global Custom Card Registration in Home Assistant Card Picker
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: 'Aninerel Power Card',
  description: 'Ультимативная карточка для инвертора Aninerel ANL 4200T + BMS Redodo',
  preview: true,
  documentationURL: 'https://github.com/custom-cards/aninerel-power-card',
});
