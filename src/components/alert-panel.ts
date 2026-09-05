import { html, TemplateResult } from 'lit';
import { SafetyConfig } from '../types';
import { FAULT_CODES, WARNING_CODES, FaultDetail } from '../utils/fault-codes';

export interface AlertPanelProps {
  safetyConfig: SafetyConfig;
  isFault: boolean;
  faultCode: number | null;
  isWarning: boolean;
  warningCode: number | null;
  onAlertClick: (entityId?: string) => void;
}

export function renderAlertPanel(props: AlertPanelProps): TemplateResult {
  const { safetyConfig, isFault, faultCode, isWarning, warningCode, onAlertClick } = props;

  // If no faults and no warnings, hide alert panel completely
  if (!isFault && !isWarning) {
    return html``;
  }

  const fCode = faultCode ?? 0;
  const faultDetail: FaultDetail = FAULT_CODES[fCode] || {
    code: fCode,
    title: `Код сбоя F${fCode}`,
    description: 'Обнаружена аппаратная или программная ошибка инвертора.',
    recommendation: 'Проверьте сообщения на дисплее инвертора и документацию.',
    severity: 'critical',
  };

  const wCode = warningCode ?? 0;
  const warningDetail = WARNING_CODES[wCode] || {
    title: `Предупреждение W${wCode}`,
    description: 'Инвертор зафиксировал отклонение параметров от нормы.',
  };

  return html`
    <div class="alert-section-wrapper">
      <!-- Critical Inverter Fault Banner -->
      ${isFault
        ? html`
            <div
              class="alert-box alert-critical"
              @click=${() => onAlertClick(safetyConfig.fault_code_entity || safetyConfig.fault_active_entity)}
              title="Нажмите для открытия подробностей"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert-octagon"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">АВАРИЯ F${fCode}</span>
                  <span class="alert-title">${faultDetail.title}</span>
                </div>
                <p class="alert-desc">${faultDetail.description}</p>
                <div class="alert-rec">
                  <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                  <span>${faultDetail.recommendation}</span>
                </div>
              </div>
            </div>
          `
        : ''}

      <!-- Inverter Warning Banner -->
      ${isWarning && !isFault
        ? html`
            <div
              class="alert-box alert-warn"
              @click=${() =>
                onAlertClick(safetyConfig.warning_code_entity || safetyConfig.warnings_active_entity)}
              title="Нажмите для открытия подробностей"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">ПРЕДУПРЕЖДЕНИЕ W${wCode}</span>
                  <span class="alert-title">${warningDetail.title}</span>
                </div>
                <p class="alert-desc">${warningDetail.description}</p>
              </div>
            </div>
          `
        : ''}
    </div>
  `;
}
