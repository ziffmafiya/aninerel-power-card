# 🔋⚡ Aninerel Power Card for Home Assistant

Ультимативная карточка для гибридного солнечного инвертора **Aninerel ANL-4200T-24L-W-Pro** (4.2 кВт, 24В) и литий-железо-фосфатных аккумуляторов **Redodo LiFePO4** (8S).

Разработана на **Lit 3** и **TypeScript**, полностью автономна (работает локально без интернета и внешних CDN), оптимизирована для **Panel Mode** и мобильных устройств, полностью совместима с **HACS**.

---

## ✨ Ключевые возможности

1. **⚡ Живая анимация потоков энергии (Power Flow)**:
   - Векторные SVG-линии с аппаратным GPU-ускорением (`will-change: stroke-dashoffset`).
   - **Логарифмическая модель скорости**: наглядно отображает как микро-токи (от 10 Вт), так и пиковую мощность (4.2 кВт).
   - Динамическая толщина линий и автоматический реверс направления (заряд ↔ разряд, импорт ↔ экспорт).
   - Радиальный индикатор уровня заряда АКБ (**Battery SOC %**) с цветовой индикацией порогов.

2. **📊 Интерактивная шапка и электрическая телеметрия**:
   - Статус-чипы: режим работы (**Battery**, **Mains**, **Bypass**), температура силового блока, флаг активности зарядного устройства `CHG`.
   - Напряжение и ток АКБ (`26.8V / +15A`), сетевое напряжение с детектором просадок и всплесков.
   - Встроенные микро-графики (**Sparklines**) динамики напряжений без тяжелых библиотек.
   - **KPI «Автономность»**: процент покрытия потребления за сутки с радиальной шкалой.

3. **🔋 Мониторинг BMS Redodo LiFePO4 (8 ячеек)**:
   - Индивидуальные напряжения всех 8 ячеек с подсветкой лучшей (MAX) и худшей (MIN) ячейки.
   - Мгновенный расчет разбалансировки **Δ mV** с цветовым предупреждением.
   - Температура ячеек, счетчик полных циклов и емкость в Ah.

4. **🎛️ Интерактивное управление инвертором**:
   - Сворачиваемый аккордеон для экономии места.
   - Переключение приоритетов питания дома (**SUB / SBU / USB**) и источников заряда (**Solar First / Only Solar / SNU**).
   - Слайдер ограничения сетевого тока заряда (от 2 до 30 А).
   - Регуляторы пороговых напряжений **Bulk (28.2В)** и **Float (27.0В)**.
   - **Защита LiFePO4**: тумблер режима Equalization снабжен подтверждением и предупреждением об опасности для литиевых аккумуляторов.

5. **📈 Суточный учет электроэнергии**:
   - Пропорциональные цветные шкалы расхода дома, импорта из сети, заряда и разряда АКБ в кВт·ч.

6. **🛡️ Диагностика и коды ошибок**:
   - Встроенная база знаний кодов ошибок **Voltronic / Axpert / Aninerel** (F01..F58, W01..W15) с пояснениями на русском языке и рекомендациями по устранению.

7. **🎨 Нативный GUI-редактор**:
   - Полноценная настройка прямо в интерфейсе Lovelace с выпадающими списками сущностей Home Assistant.

---

## 🚀 Установка

### Вариант 1: Через HACS (Рекомендуется)
1. Откройте **HACS** → **Интерфейс** (Frontend) → три точки в правом верхнем углу → **Пользовательские репозитории**.
2. Добавьте URL вашего репозитория, категория: **Lovelace (Панель)**.
3. Нажмите **Загрузить** (Download).
4. Перезагрузите страницу в браузере.

### Вариант 2: Вручную
1. Скопируйте файл `dist/aninerel-power-card.js` в папку Home Assistant: `/config/www/aninerel-power-card.js`.
2. Перейдите в **Настройки** → **Панели управления** → три точки в правом верхнем углу → **Ресурсы**.
3. Добавьте новый ресурс:
   - URL: `/local/aninerel-power-card.js?v=1.0.0`
   - Тип: `Модуль JavaScript`
4. Обновите кэш браузера (Ctrl + F5).

---

## 📋 Пример конфигурации карточки (YAML)

Создайте в панели управления карточку типа **Вручную** (Manual) и вставьте конфигурацию:

```yaml
type: custom:aninerel-power-card
title: "⚡ Инвертор Aninerel 4200T"

# 1. Основные потоки мощности (Вт) - Обязательно
entities:
  solar_power: sensor.aninerel_anl_4200t_24l_w_pro_pv_power
  battery_power: sensor.aninerel_anl_4200t_24l_w_pro_battery_power
  grid_power: sensor.aninerel_anl_4200t_24l_w_pro_grid_power
  load_power: sensor.aninerel_anl_4200t_24l_w_pro_load_power

# 2. Электрические параметры и статусы
battery_voltage_entity: sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage
battery_current_entity: sensor.aninerel_anl_4200t_24l_w_pro_battery_current
grid_voltage_entity: sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage
operating_mode_entity: sensor.aninerel_anl_4200t_24l_w_pro_operating_mode
charging_active_entity: binary_sensor.aninerel_anl_4200t_24l_w_pro_charging_active
inverter_temperature_entity: sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature

# 3. BMS Redodo LiFePO4 (Вариант: 2x 12В аккумулятора последовательно = 24В)
bms:
  dual_battery: true
  battery_1:
    name: "АКБ #1 (12V)"
    soc_entity: sensor.redodo_1_state_of_charge
    voltage_entity: sensor.redodo_1_total_voltage
    temperature_entity: sensor.redodo_1_temperature
    cell_count: 4
    cell_voltage_prefix: "sensor.redodo_1_cell_voltage_"
  battery_2:
    name: "АКБ #2 (12V)"
    soc_entity: sensor.redodo_2_state_of_charge
    voltage_entity: sensor.redodo_2_total_voltage
    temperature_entity: sensor.redodo_2_temperature
    cell_count: 4
    cell_voltage_prefix: "sensor.redodo_2_cell_voltage_"

# ИЛИ Вариант для единого 24В блока:
# bms:
#   soc_entity: sensor.redodo_battery_state_of_charge
#   voltage_entity: sensor.redodo_battery_total_voltage
#   temperature_entity: sensor.redodo_battery_temperature_probe_1
#   cell_count: 8
#   cell_voltage_prefix: "sensor.redodo_battery_cell_voltage_"
#   cell_delta_entity: sensor.redodo_battery_cell_delta

# 4. Управление и автоматизации
controls:
  charge_source_entity: select.aninerel_anl_4200t_24l_w_pro_charge_source_priority
  output_priority_entity: select.aninerel_anl_4200t_24l_w_pro_output_source_priority
  max_charge_current_entity: number.aninerel_anl_4200t_24l_w_pro_max_ac_charge_current
  bulk_voltage_entity: number.aninerel_anl_4200t_24l_w_pro_battery_bulk_voltage
  float_voltage_entity: number.aninerel_anl_4200t_24l_w_pro_battery_float_voltage
  equalization_entity: switch.aninerel_anl_4200t_24l_w_pro_battery_equalization

# 5. Безопасность и алерты
safety:
  fault_active_entity: binary_sensor.aninerel_anl_4200t_24l_w_pro_fault_active
  fault_code_entity: sensor.aninerel_anl_4200t_24l_w_pro_fault_code
  warnings_active_entity: binary_sensor.aninerel_anl_4200t_24l_w_pro_warnings_active
  warning_code_entity: sensor.aninerel_anl_4200t_24l_w_pro_warning_code

# 6. Суточный учет энергии (кВт·ч)
daily_energy:
  load_energy_entity: sensor.aninerel_anl_4200t_24l_w_pro_estimated_load_energy_today
  grid_import_entity: sensor.aninerel_anl_4200t_24l_w_pro_estimated_grid_import_energy_today
  battery_charge_entity: sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_charge_energy_today
  battery_discharge_entity: sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_discharge_energy_today

# 7. Настройки отображения
max_power: 4200
use_log_flow_model: true
show_header: true
show_flow: true
show_params: true
show_bms: true
show_controls: true
show_energy: true
show_alerts: true
```

---

## 🛠️ Вспомогательные файлы (ha-extras)

- `ha-extras/template_sensors.yaml`: template-сенсоры для расчета автономности за день, направления потока АКБ и словесного описания кодов сбоев.
- `ha-extras/automations.yaml`: автоматизации для мгновенного оповещения об авариях, контроле температуры радиатора и автоматическом отключении режима Equalization.

---

## 📦 Сборка для разработчиков

```bash
# Установка зависимостей
npm install

# Сборка продакшен бандла
npm run build

# Разработка с авто-пересборкой
npm run watch
```
