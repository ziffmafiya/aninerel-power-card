import { FlowPath, ColorConfig } from '../types';
import { DEFAULT_COLORS } from '../const';

export interface NodePosition {
  x: number;
  y: number;
  radius: number;
}

// Optimized layout coordinates on a 500x360 coordinate grid
export const NODE_POSITIONS = {
  solar: { x: 250, y: 44, radius: 34 },
  inverter: { x: 250, y: 175, radius: 32 },
  battery: { x: 74, y: 175, radius: 40 },
  home: { x: 426, y: 175, radius: 36 },
  grid: { x: 250, y: 308, radius: 34 },
};

/**
 * Calculates flow animation duration in seconds using either logarithmic or linear interpolation.
 * Higher wattage results in shorter duration (faster motion).
 */
export function calcFlowDuration(
  watts: number,
  maxPower = 4200,
  minRate = 0.75,
  maxRate = 5.0,
  useLog = true
): number {
  const absWatts = Math.abs(watts);
  if (absWatts < 5) return 0; // Below deadband threshold

  const clampedWatts = Math.min(absWatts, maxPower);

  let ratio: number;
  if (useLog) {
    ratio = Math.log10(clampedWatts + 1) / Math.log10(maxPower + 1);
  } else {
    ratio = clampedWatts / maxPower;
  }

  const duration = maxRate - ratio * (maxRate - minRate);
  return Math.max(minRate, Math.min(maxRate, Number(duration.toFixed(2))));
}

/**
 * Calculates dynamic stroke width for flow lines (2.5px to 5.5px) based on power.
 */
export function calcStrokeWidth(watts: number, maxPower = 4200): number {
  const minWidth = 2.8;
  const maxWidth = 5.5;
  const ratio = Math.min(Math.abs(watts) / maxPower, 1);
  return Number((minWidth + ratio * (maxWidth - minWidth)).toFixed(1));
}

/**
 * Generates all active flow paths between nodes and central inverter hub with precise non-overlapping clearance.
 */
export function calculateFlowPaths(
  solarWatts: number,
  batteryWatts: number,
  gridWatts: number,
  loadWatts: number,
  colors?: ColorConfig
): FlowPath[] {
  const paths: FlowPath[] = [];
  const activeThreshold = 5; // Watts

  const solarColor = colors?.solar || DEFAULT_COLORS.solar;
  const batteryChargeColor = colors?.battery_charge || DEFAULT_COLORS.battery_charge;
  const batteryDischargeColor = colors?.battery_discharge || DEFAULT_COLORS.battery_discharge;
  const gridImportColor = colors?.grid_import || DEFAULT_COLORS.grid_import;
  const gridExportColor = colors?.grid_export || DEFAULT_COLORS.grid_export;
  const homeColor = colors?.home || DEFAULT_COLORS.home;

  // 1. Solar -> Inverter (vertical from bottom of Solar text to top of Inverter badge)
  const solarP = Math.max(0, solarWatts);
  if (solarP >= activeThreshold) {
    paths.push({
      id: 'flow-solar-inverter',
      d: `M 250 82 L 250 140`,
      watts: solarP,
      color: solarColor,
      reversed: false,
    });
  }

  // 2. Inverter -> Home (horizontal from right of Inverter badge to left of Home badge)
  const loadP = Math.max(0, loadWatts);
  if (loadP >= activeThreshold) {
    paths.push({
      id: 'flow-inverter-home',
      d: `M 284 175 L 388 175`,
      watts: loadP,
      color: homeColor,
      reversed: false,
    });
  }

  // 3. Battery <-> Inverter (horizontal between Battery right edge and Inverter left edge)
  const absBatP = Math.abs(batteryWatts);
  if (absBatP >= activeThreshold) {
    const isCharging = batteryWatts > 0;
    paths.push({
      id: 'flow-battery-inverter',
      d: `M 116 175 L 216 175`,
      watts: absBatP,
      color: isCharging ? batteryChargeColor : batteryDischargeColor,
      reversed: isCharging, // Charging moves from Inverter to Battery (right to left)
    });
  }

  // 4. Grid <-> Inverter (vertical from Inverter bottom to Grid top)
  const absGridP = Math.abs(gridWatts);
  if (absGridP >= activeThreshold) {
    const isImport = gridWatts > 0;
    paths.push({
      id: 'flow-grid-inverter',
      // Line connects bottom of Inverter text (210) to top of Grid badge (274)
      d: `M 250 210 L 250 274`,
      watts: absGridP,
      color: isImport ? gridImportColor : gridExportColor,
      // If importing, flow moves from Grid up to Inverter (bottom to top -> reverse)
      // If exporting, flow moves from Inverter down to Grid (top to bottom -> normal)
      reversed: isImport,
    });
  }

  return paths;
}
