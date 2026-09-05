import { AninerelCardConfig } from './types';

export const CARD_VERSION = '1.0.1';
export const CARD_NAME = 'aninerel-power-card';

export const DEFAULT_CONFIG: Partial<AninerelCardConfig> = {
  title: 'Aninerel ANL 4200T',
  max_power: 4200,
  inverter_capacity: 4200,
  min_flow_rate: 0.75,
  max_flow_rate: 6.0,
  use_log_flow_model: true,
  show_header: true,
  show_flow: true,
  show_params: true,
  show_bms: true,
  show_controls: true,
  show_energy: true,
  show_alerts: true,
  compact_mode: false,
};

export const DEFAULT_COLORS = {
  solar: 'var(--energy-solar-color, #F59E0B)',
  battery_charge: 'var(--energy-battery-in-color, #10B981)',
  battery_discharge: 'var(--energy-battery-out-color, #FF9800)',
  grid_import: 'var(--energy-grid-consumption-color, #4285F4)',
  grid_export: 'var(--energy-grid-return-color, #2ecc71)',
  home: 'var(--primary-text-color, #E0E0E0)',
  card_bg: 'var(--ha-card-background, var(--card-background-color, #1e1e2f))',
  text: 'var(--primary-text-color, #FFFFFF)',
  text_muted: 'var(--secondary-text-color, #9CA3AF)',
  divider: 'var(--divider-color, rgba(255, 255, 255, 0.1))',
};

export const STUB_CONFIG: Record<string, any> = {
  type: 'custom:aninerel-power-card',
  title: 'Aninerel ANL 4200T',
  entities: {
    solar_power: 'sensor.aninerel_anl_4200t_24l_w_pro_pv_power',
    battery_power: 'sensor.aninerel_anl_4200t_24l_w_pro_battery_power',
    grid_power: 'sensor.aninerel_anl_4200t_24l_w_pro_grid_power',
    load_power: 'sensor.aninerel_anl_4200t_24l_w_pro_load_power',
  },
  battery_voltage_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage',
  battery_current_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_battery_current',
  grid_voltage_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage',
  operating_mode_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_operating_mode',
  charging_active_entity: 'binary_sensor.aninerel_anl_4200t_24l_w_pro_charging_active',
  inverter_temperature_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature',
  bms: {
    soc_entity: 'sensor.redodo_battery_state_of_charge',
    cell_count: 8,
    cell_voltage_prefix: 'sensor.redodo_battery_cell_voltage_',
  },
  controls: {
    charge_source_entity: 'select.aninerel_anl_4200t_24l_w_pro_charge_source_priority',
    output_priority_entity: 'select.aninerel_anl_4200t_24l_w_pro_output_source_priority',
    max_charge_current_entity: 'number.aninerel_anl_4200t_24l_w_pro_max_ac_charge_current',
    bulk_voltage_entity: 'number.aninerel_anl_4200t_24l_w_pro_battery_bulk_voltage',
    float_voltage_entity: 'number.aninerel_anl_4200t_24l_w_pro_battery_float_voltage',
    equalization_entity: 'switch.aninerel_anl_4200t_24l_w_pro_battery_equalization',
  },
  safety: {
    fault_active_entity: 'binary_sensor.aninerel_anl_4200t_24l_w_pro_fault_active',
    fault_code_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_fault_code',
    warnings_active_entity: 'binary_sensor.aninerel_anl_4200t_24l_w_pro_warnings_active',
    warning_code_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_warning_code',
  },
  daily_energy: {
    load_energy_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_estimated_load_energy_today',
    grid_import_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_estimated_grid_import_energy_today',
    battery_charge_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_charge_energy_today',
    battery_discharge_entity: 'sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_discharge_energy_today',
  },
};
