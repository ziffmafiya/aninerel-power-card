import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    container-type: inline-size;
    --card-bg: var(--ha-card-background, var(--card-background-color, #1a1a2e));
    --primary-text: var(--primary-text-color, #ffffff);
    --secondary-text: var(--secondary-text-color, #9ca3af);
    --divider: var(--divider-color, rgba(255, 255, 255, 0.08));
    --solar-color: var(--energy-solar-color, #f59e0b);
    --battery-charge-color: var(--energy-battery-in-color, #10b981);
    --battery-discharge-color: var(--energy-battery-out-color, #ff9800);
    --grid-import-color: var(--energy-grid-consumption-color, #4285f4);
    --grid-export-color: var(--energy-grid-return-color, #2ecc71);
    --home-color: var(--primary-text-color, #ffffff);
    --inverter-color: #3b82f6;
  }

  ha-card {
    background: var(--card-bg);
    color: var(--primary-text);
    border-radius: var(--ha-card-border-radius, 16px);
    padding: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: var(--ha-card-box-shadow, 0 6px 24px rgba(0, 0, 0, 0.3));
    border: 1px solid var(--divider);
    position: relative;
  }

  /* ============================================================
     HEADER BAR SECTION
     ============================================================ */
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--divider);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-icon-box ha-icon {
    --mdc-icon-size: 24px;
    color: var(--solar-color);
  }

  .header-title-box {
    display: flex;
    flex-direction: column;
  }

  .header-title {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    line-height: 1.2;
  }

  .header-subtitle {
    font-size: 0.72rem;
    color: var(--secondary-text);
  }

  .header-chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    border-radius: 9999px;
    font-size: 0.73rem;
    font-weight: 600;
    color: var(--chip-color, #10b981);
    background: color-mix(in srgb, var(--chip-color, #10b981) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--chip-color, #10b981) 35%, transparent);
    cursor: pointer;
    border-style: solid;
    outline: none;
    font-family: inherit;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .status-chip:hover {
    transform: scale(1.04);
    filter: brightness(1.15);
  }

  .status-chip ha-icon {
    --mdc-icon-size: 14px;
  }

  .pulse-chip {
    animation: pulse-glow 2s infinite ease-in-out;
  }

  .pulse-chip-danger {
    animation: pulse-danger 1.2s infinite ease-in-out;
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 4px rgba(16, 185, 129, 0.4);
    }
    50% {
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.9);
    }
  }

  @keyframes pulse-danger {
    0%, 100% {
      box-shadow: 0 0 4px rgba(239, 68, 68, 0.4);
    }
    50% {
      box-shadow: 0 0 14px rgba(239, 68, 68, 0.9);
    }
  }

  .chip-ok {
    color: #10b981;
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.25);
    cursor: default;
  }

  /* ============================================================
     POWER FLOW VISUALIZATION SECTION
     ============================================================ */
  .power-flow-container {
    position: relative;
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    aspect-ratio: 500 / 360;
    user-select: none;
  }

  svg.flow-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: visible;
  }

  .pipe-track {
    fill: none;
    stroke: rgba(255, 255, 255, 0.07);
    stroke-width: 2.5;
    stroke-linecap: round;
  }

  .flow-line {
    fill: none;
    stroke-dasharray: 4 10;
    stroke-linecap: round;
    animation: flow-dash var(--flow-duration, 2.5s) linear infinite;
    will-change: stroke-dashoffset;
    filter: drop-shadow(0 0 4px currentColor);
  }

  .flow-line.reverse {
    animation-direction: reverse;
  }

  @keyframes flow-dash {
    from {
      stroke-dashoffset: 28;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .flow-nodes-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .flow-node {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  .flow-node:hover {
    transform: translate(-50%, -50%) scale(1.05);
    filter: brightness(1.1);
  }

  .node-badge {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(20, 24, 38, 0.88);
    border: 2px solid var(--node-border, rgba(255, 255, 255, 0.15));
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .node-value {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    margin-top: 4px;
    white-space: nowrap;
  }

  .node-label {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .node-solar { --node-border: var(--solar-color); }
  .node-solar .node-badge { width: 66px; height: 66px; }
  .node-solar ha-icon { --mdc-icon-size: 30px; color: var(--solar-color); }
  .node-solar .node-value { color: var(--solar-color); }

  .node-inverter { --node-border: var(--inverter-color); }
  .node-inverter .node-badge {
    width: 64px;
    height: 64px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(20, 24, 38, 0.95) 80%);
    border: 2px solid rgba(59, 130, 246, 0.5);
  }
  .node-inverter ha-icon { --mdc-icon-size: 30px; color: var(--inverter-color); }
  .inverter-status-dot {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #10b981;
    border: 2px solid #1a1a2e;
    box-shadow: 0 0 6px #10b981;
  }

  .node-battery { --node-border: transparent; }
  .node-battery .node-badge {
    width: 78px;
    height: 78px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .battery-gauge-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .battery-gauge-bg {
    fill: rgba(20, 24, 38, 0.85);
    stroke: rgba(255, 255, 255, 0.08);
    stroke-width: 5;
  }
  .battery-gauge-fill {
    fill: none;
    stroke-width: 5.5;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease, stroke 0.3s ease;
  }
  .battery-gauge-center {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .battery-gauge-center ha-icon { --mdc-icon-size: 20px; }
  .battery-soc-text {
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1;
    margin-top: 2px;
  }

  .node-home { --node-border: rgba(255, 255, 255, 0.3); }
  .node-home .node-badge { width: 70px; height: 70px; }
  .node-home ha-icon { --mdc-icon-size: 32px; color: var(--home-color); }
  .node-home .node-value { color: var(--home-color); }

  .node-grid { --node-border: var(--grid-import-color); }
  .node-grid .node-badge { width: 66px; height: 66px; }
  .node-grid ha-icon { --mdc-icon-size: 30px; color: var(--grid-import-color); }
  .node-grid .node-value { color: var(--grid-import-color); }

  /* ============================================================
     ELECTRICAL PARAMETERS SECTION
     ============================================================ */
  .params-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .param-tile {
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  .param-tile:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }

  .param-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .param-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .param-title {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    flex-grow: 1;
  }

  .param-badge {
    font-size: 0.62rem;
    padding: 1px 5px;
    border-radius: 4px;
    font-weight: 600;
  }

  .param-main-value {
    font-size: 1.08rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .param-slash {
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.9rem;
  }

  .param-chart-box {
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .sparkline-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .sparkline-placeholder {
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1px;
  }

  .param-kpi-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .kpi-val {
    font-size: 1.3rem;
  }

  .arc-gauge-wrapper {
    width: 44px;
    height: 26px;
  }

  .arc-gauge-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  /* ============================================================
     BMS REDODO SECTION (SINGLE & DUAL BATTERY)
     ============================================================ */
  .bms-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .bms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .bms-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .bms-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: #10b981;
  }

  .bms-soc-badge {
    font-size: 0.72rem;
    font-weight: 700;
    color: #10b981;
    background: rgba(16, 185, 129, 0.15);
    padding: 2px 7px;
    border-radius: 9999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .bms-header-status {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .bms-delta-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--delta-color, #10b981);
    background: color-mix(in srgb, var(--delta-color, #10b981) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--delta-color, #10b981) 30%, transparent);
    padding: 2px 8px;
    border-radius: 9999px;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .bms-delta-pill:hover {
    transform: scale(1.05);
  }

  .bms-delta-pill ha-icon {
    --mdc-icon-size: 14px;
  }

  .series-drift-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.35);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.72rem;
    color: #fbbf24;
    line-height: 1.3;
  }

  .series-drift-alert ha-icon {
    --mdc-icon-size: 18px;
    color: #f59e0b;
    flex-shrink: 0;
  }

  /* Dual Battery Layout */
  .dual-battery-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pack-column {
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pack-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--divider);
  }

  .pack-name-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pack-name {
    font-size: 0.78rem;
    font-weight: 700;
  }

  .pack-soc-badge {
    font-size: 0.68rem;
    font-weight: 700;
    color: #10b981;
    background: rgba(16, 185, 129, 0.15);
    padding: 1px 6px;
    border-radius: 9999px;
  }

  .pack-telemetry-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .pack-voltage {
    font-size: 0.85rem;
    font-weight: 700;
    color: #38bdf8;
  }

  .pack-temp {
    font-size: 0.7rem;
    color: var(--secondary-text);
  }

  .series-bridge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    user-select: none;
    flex-shrink: 0;
  }

  .bridge-line {
    width: 2px;
    height: 16px;
    background: rgba(255, 255, 255, 0.1);
  }

  .bridge-badge {
    font-size: 0.62rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--solar-color);
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.3);
    padding: 3px 6px;
    border-radius: 6px;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  .pack-cells {
    height: 72px;
  }

  .bms-body {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .cells-grid {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    flex-grow: 1;
    height: 76px;
    padding-bottom: 2px;
  }

  .cell-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    height: 100%;
    transition: transform 0.15s ease;
  }

  .cell-col:hover {
    transform: translateY(-2px);
  }

  .cell-bar-track {
    width: 100%;
    flex-grow: 1;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }

  .cell-bar-fill {
    width: 100%;
    border-radius: 3px;
    transition: height 0.4s ease, background-color 0.3s ease;
  }

  .cell-max {
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
  }

  .cell-min {
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
  }

  .cell-voltage {
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.1;
    white-space: nowrap;
  }

  .cell-id {
    font-size: 0.64rem;
    color: var(--secondary-text);
    line-height: 1;
  }

  .bms-telemetry-panel {
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-left: 1px solid var(--divider);
    padding-left: 12px;
    min-width: 85px;
  }

  .bms-stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .bms-stat-item:hover {
    transform: translateX(2px);
  }

  .bms-stat-item ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .bms-stat-text {
    display: flex;
    flex-direction: column;
  }

  .bms-stat-val {
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .bms-stat-lbl {
    font-size: 0.6rem;
    color: var(--secondary-text);
    text-transform: uppercase;
  }

  /* ============================================================
     CONTROLS SECTION
     ============================================================ */
  .controls-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .controls-card-section.expanded {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }

  .controls-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease;
  }

  .controls-header:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .controls-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .controls-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: var(--inverter-color);
  }

  .controls-header-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .controls-quick-summary {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 500;
  }

  .chevron-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text);
    transition: transform 0.25s ease;
  }

  .chevron-icon.open {
    transform: rotate(180deg);
  }

  .controls-body {
    padding: 4px 14px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid var(--divider);
  }

  .controls-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .control-box {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .control-box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .control-box-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .control-box-header label {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    flex-grow: 1;
  }

  .control-label-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .control-live-val {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--inverter-color);
  }

  /* Pill Buttons Selector */
  .pill-selector {
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    padding: 3px;
    border-radius: 8px;
    gap: 4px;
  }

  .pill-btn {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--secondary-text);
    font-size: 0.72rem;
    font-weight: 600;
    padding: 6px 4px;
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-align: center;
    font-family: inherit;
  }

  .pill-btn:hover {
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.05);
  }

  .pill-btn.active {
    background: var(--inverter-color);
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  }

  /* Slider Styling */
  .slider-box {
    padding: 10px 14px;
  }

  .slider-input-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .slider-boundary {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
  }

  .control-range {
    flex-grow: 1;
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.12);
    outline: none;
  }

  .control-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--inverter-color);
    cursor: pointer;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
    transition: transform 0.15s ease;
  }

  .control-range::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  /* Mini Voltage Steppers */
  .voltage-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 2px 4px;
  }

  .stepper-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(255, 255, 255, 0.06);
    color: var(--primary-text);
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: background 0.15s ease;
  }

  .stepper-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .stepper-btn:active {
    transform: scale(0.92);
  }

  .stepper-val {
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  /* Danger Zone: Equalization */
  .danger-switch-row {
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .danger-switch-row.danger-active {
    background: rgba(239, 68, 68, 0.2);
    border-color: #ef4444;
    animation: pulse-danger 1.5s infinite ease-in-out;
  }

  .danger-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .danger-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    color: #ef4444;
  }

  .danger-title ha-icon {
    --mdc-icon-size: 16px;
  }

  .danger-desc {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.2;
  }

  .toggle-switch-btn {
    min-width: 52px;
    padding: 6px 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .switch-off {
    background: rgba(255, 255, 255, 0.1);
    color: var(--secondary-text);
  }

  .switch-on {
    background: #ef4444;
    color: #ffffff;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
  }

  /* ============================================================
     DAILY ENERGY SECTION
     ============================================================ */
  .energy-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .energy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .energy-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .energy-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: #f59e0b;
  }

  .energy-total-pill {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 8px;
    border-radius: 9999px;
  }

  .energy-bars-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .energy-row {
    display: grid;
    grid-template-columns: 140px 1fr 85px;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 6px;
    transition: background 0.15s ease;
  }

  .energy-row:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .energy-row-info {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .energy-row-info ha-icon {
    --mdc-icon-size: 18px;
  }

  .energy-row-label {
    font-size: 0.73rem;
    font-weight: 500;
    color: var(--secondary-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .energy-track-wrapper {
    width: 100%;
    height: 8px;
    display: flex;
    align-items: center;
  }

  .energy-track {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 3px;
    overflow: hidden;
  }

  .energy-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .energy-row-val {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 4px;
    font-size: 0.8rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .energy-kwh small {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--secondary-text);
  }

  .energy-pct {
    font-size: 0.65rem;
    color: var(--secondary-text);
    font-weight: 500;
  }

  /* ============================================================
     ALERT & DIAGNOSTICS SECTION
     ============================================================ */
  .alert-section-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .alert-box {
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .alert-box:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }

  .alert-critical {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid #ef4444;
    box-shadow: 0 0 16px rgba(239, 68, 68, 0.3);
    animation: pulse-danger 1.8s infinite ease-in-out;
  }

  .alert-critical .alert-icon-col ha-icon {
    --mdc-icon-size: 26px;
    color: #ef4444;
  }

  .alert-critical .alert-badge {
    background: #ef4444;
    color: #ffffff;
  }

  .alert-warn {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.4);
  }

  .alert-warn .alert-icon-col ha-icon {
    --mdc-icon-size: 24px;
    color: #f59e0b;
  }

  .alert-warn .alert-badge {
    background: #f59e0b;
    color: #000000;
  }

  .alert-content-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-grow: 1;
  }

  .alert-headline {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .alert-badge {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.3px;
  }

  .alert-title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .alert-desc {
    margin: 0;
    font-size: 0.74rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.3;
  }

  .alert-rec {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
    font-size: 0.7rem;
    font-weight: 600;
    color: #fcd34d;
  }

  .alert-rec ha-icon {
    --mdc-icon-size: 14px;
  }

  /* ============================================================
     RESPONSIVE BREAKPOINTS
     ============================================================ */
  @container (max-width: 440px) {
    .header-bar {
      flex-direction: column;
      align-items: flex-start;
    }
    .params-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .controls-grid-2 {
      grid-template-columns: 1fr;
    }
    .energy-row {
      grid-template-columns: 100px 1fr 70px;
    }
    .bms-body {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .bms-telemetry-panel {
      border-left: none;
      border-top: 1px solid var(--divider);
      padding-left: 0;
      padding-top: 8px;
      flex-direction: row;
      justify-content: space-around;
    }
    .node-solar .node-badge,
    .node-grid .node-badge {
      width: 56px;
      height: 56px;
    }
    .node-battery .node-badge {
      width: 68px;
      height: 68px;
    }
    .node-home .node-badge {
      width: 60px;
      height: 60px;
    }
    .node-inverter .node-badge {
      width: 54px;
      height: 54px;
    }
    .node-value {
      font-size: 0.82rem;
    }
    .node-label {
      font-size: 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow-line {
      animation: none !important;
      stroke-dashoffset: 0 !important;
      opacity: 0.8;
    }
    .flow-node, .status-chip, .cell-col, .bms-stat-item, .pill-btn, .stepper-btn, .alert-box {
      transition: none !important;
      animation: none !important;
    }
  }
`;
