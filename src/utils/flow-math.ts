import { FlowPath, ColorConfig } from '../types';
import { DEFAULT_COLORS } from '../const';

export interface NodePosition {
  x: number;
  y: number;
  radius: number;
}

export const NODE_POSITIONS = {
  solar: { x: 250, y: 46, radius: 36 },
  inverter: { x: 250, y: 170, radius: 34 },
  battery: { x: 74, y: 170, radius: 42 },
  home: { x: 426, y: 170, radius: 38 },
  grid: { x: 250, y: 294, radius: 36 },
};

/**
 * Calculates flow animation duration in seconds using either logarithmic or linear interpolation.
 * Higher wattage results in shorter duration (faster motion).
 */
export function calcFlowDuration(
  watts: number,
  maxPower = 4200,
  minRate = 0.75,
  maxRate = 6.0,
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
  const minWidth = 2.5;
  const maxWidth = 5.5;
  const ratio = Math.min(Math.abs(watts) / maxPower, 1);
  return Number((minWidth + ratio * (maxWidth - minWidth)).toFixed(1));
}

/**
 * Generates all active flow paths between nodes and central inverter hub.
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

  const { solar, inverter, battery, home, grid } = NODE_POSITIONS;

  // 1. Solar -> Inverter (always down towards inverter)
  const solarP = Math.max(0, solarWatts);
  if (solarP >= activeThreshold) {
    paths.push({
      id: 'flow-solar-inverter',
      d: `M ${solar.x} ${solar.y + solar.radius} L ${inverter.x} ${inverter.y - inverter.radius}`,
      watts: solarP,
      color: solarColor,
      reversed: false, // flow flows down towards inverter
    });
  }

  // 2. Inverter -> Home (always right towards home load)
  const loadP = Math.max(0, loadWatts);
  if (loadP >= activeThreshold) {
    paths.push({
      id: 'flow-inverter-home',
      d: `M ${inverter.x + inverter.radius} ${inverter.y} L ${home.x - home.radius} ${home.y}`,
      watts: loadP,
      color: homeColor,
      reversed: false, // flow flows right towards home
    });
  }

  // 3. Battery <-> Inverter
  // batteryWatts > 0 : charging (Inverter -> Battery, flows left)
  // batteryWatts < 0 : discharging (Battery -> Inverter, flows right)
  const absBatP = Math.abs(batteryWatts);
  if (absBatP >= activeThreshold) {
    const isCharging = batteryWatts > 0;
    paths.push({
      id: 'flow-battery-inverter',
      // Path drawn from Battery (left) to Inverter (right)
      d: `M ${battery.x + battery.radius} ${battery.y} L ${inverter.x - inverter.radius} ${inverter.y}`,
      watts: absBatP,
      color: isCharging ? batteryChargeColor : batteryDischargeColor,
      // If charging, flow must move from Inverter to Battery (right to left -> reverse)
      // If discharging, flow moves from Battery to Inverter (left to right -> normal)
      reversed: isCharging,
    });
  }

  // 4. Grid <-> Inverter
  // gridWatts > 0 : import from grid (Grid -> Inverter, flows up)
  // gridWatts < 0 : export to grid (Inverter -> Grid, flows down)
  const absGridP = Math.abs(gridWatts);
  if (absGridP >= activeThreshold) {
    const isImport = gridWatts > 0;
    paths.push({
      id: 'flow-grid-inverter',
      // Path drawn from Inverter (top) to Grid (bottom)
      d: `M ${inverter.x} ${inverter.y + inverter.radius} L ${grid.x} ${grid.y - grid.radius}`,
      watts: absGridP,
      color: isImport ? gridImportColor : gridExportColor,
      // If importing, flow moves from Grid up to Inverter (bottom to top -> reverse)
      // If exporting, flow moves from Inverter down to Grid (top to bottom -> normal)
      reversed: isImport,
    });
  }

  return paths;
}
