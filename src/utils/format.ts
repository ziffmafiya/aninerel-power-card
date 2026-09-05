/**
 * Utility functions for formatting sensor values, wattages, voltages, and percentages
 */

export function formatPower(watts: number, decimals = 1): string {
  const absWatts = Math.abs(watts);
  if (absWatts >= 1000) {
    return `${(watts / 1000).toFixed(decimals)} kW`;
  }
  return `${Math.round(watts)} W`;
}

export function formatVoltage(volts: number | null | undefined, decimals = 1): string {
  if (volts === null || volts === undefined || isNaN(volts)) return 'N/A';
  return `${volts.toFixed(decimals)} V`;
}

export function formatCurrent(amps: number | null | undefined, decimals = 1): string {
  if (amps === null || amps === undefined || isNaN(amps)) return 'N/A';
  return `${amps.toFixed(decimals)} A`;
}

export function formatEnergy(kwh: number | null | undefined, decimals = 1): string {
  if (kwh === null || kwh === undefined || isNaN(kwh)) return '0.0 kWh';
  return `${kwh.toFixed(decimals)} kWh`;
}

export function formatTemperature(celsius: number | null | undefined, decimals = 0): string {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return 'N/A';
  return `${celsius.toFixed(decimals)} °C`;
}
