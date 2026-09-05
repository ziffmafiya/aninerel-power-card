// Home Assistant & Lovelace Types

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    unit_of_measurement?: string;
    friendly_name?: string;
    icon?: string;
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
    [key: string]: any;
  };
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  services: Record<string, Record<string, any>>;
  language?: string;
  locale?: {
    language: string;
    [key: string]: any;
  };
  themes?: {
    darkMode?: boolean;
    theme?: string;
    [key: string]: any;
  };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, any>,
    target?: { entity_id?: string | string[]; [key: string]: any }
  ): Promise<any>;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number;
}

export interface LovelaceGridOptions {
  columns?: number;
  rows?: number;
  min_columns?: number;
  min_rows?: number;
}

// Card Specific Configurations

export interface EntitiesConfig {
  solar_power: string;    // sensor...pv_power (W)
  battery_power: string;  // sensor...battery_power (W, + charge / - discharge)
  grid_power: string;     // sensor...grid_power (W)
  load_power: string;     // sensor...load_power (W)
}

export interface BmsConfig {
  soc_entity: string;                 // sensor.battery_state_of_charge (%)
  voltage_entity?: string;            // sensor.battery_total_voltage (V)
  current_entity?: string;            // sensor.battery_current (A)
  temperature_entity?: string;        // sensor.battery_temperature_probe_1 (°C)
  temperature_2_entity?: string;      // sensor.battery_temperature_probe_2 (°C)
  cell_count?: number;                // default: 8
  cell_voltage_prefix?: string;       // default: 'sensor.redodo_battery_cell_voltage_'
  cycle_count_entity?: string;        // sensor.battery_discharge_cycles
  remaining_capacity_entity?: string; // sensor.battery_remaining_capacity (Ah)
  full_capacity_entity?: string;      // sensor.battery_full_charge_capacity (Ah)
  cell_delta_entity?: string;         // sensor.battery_cell_delta (mV)
}

export interface ControlsConfig {
  charge_source_entity?: string;      // select...charge_source_priority
  output_priority_entity?: string;    // select...output_source_priority
  max_charge_current_entity?: string; // number...max_ac_charge_current
  bulk_voltage_entity?: string;       // number...battery_bulk_voltage
  float_voltage_entity?: string;      // number...battery_float_voltage
  equalization_entity?: string;       // switch...battery_equalization
}

export interface SafetyConfig {
  fault_active_entity?: string;       // binary_sensor...fault_active
  fault_code_entity?: string;         // sensor...fault_code
  warnings_active_entity?: string;    // binary_sensor...warnings_active
  warning_code_entity?: string;       // sensor...warning_code
}

export interface DailyEnergyConfig {
  load_energy_entity?: string;        // sensor...load_energy_today (kWh)
  grid_import_entity?: string;        // sensor...grid_import_energy_today (kWh)
  battery_charge_entity?: string;     // sensor...battery_charge_energy_today (kWh)
  battery_discharge_entity?: string;  // sensor...battery_discharge_energy_today (kWh)
}

export interface ColorConfig {
  solar?: string;
  battery_charge?: string;
  battery_discharge?: string;
  grid_import?: string;
  grid_export?: string;
  home?: string;
  card_bg?: string;
}

export interface AninerelCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;

  entities: EntitiesConfig;

  // Electrical parameters
  battery_voltage_entity?: string;
  battery_current_entity?: string;
  grid_voltage_entity?: string;
  operating_mode_entity?: string;
  charging_active_entity?: string;
  inverter_temperature_entity?: string;

  // Subsections
  bms?: BmsConfig;
  controls?: ControlsConfig;
  safety?: SafetyConfig;
  daily_energy?: DailyEnergyConfig;

  // Power & Capacity limits
  max_power?: number;         // default: 4200
  inverter_capacity?: number; // default: 4200

  // Flow & Colors
  colors?: ColorConfig;
  min_flow_rate?: number;      // default: 0.75
  max_flow_rate?: number;      // default: 6.0
  use_log_flow_model?: boolean;// default: true

  // Section visibility toggles
  show_header?: boolean;
  show_flow?: boolean;
  show_params?: boolean;
  show_bms?: boolean;
  show_controls?: boolean;
  show_energy?: boolean;
  show_alerts?: boolean;

  // View settings
  compact_mode?: boolean;
  language?: string;
}

export interface FlowPath {
  id: string;
  d: string;
  watts: number;
  color: string;
  reversed: boolean;
}
