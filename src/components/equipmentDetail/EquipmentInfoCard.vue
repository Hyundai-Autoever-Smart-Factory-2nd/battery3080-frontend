<template>
  <div class="equipment-info-card">
    <h3>{{ LABELS.equipment_info }}</h3>
    <div class="equipment-details">
      <div class="info-grid">
        <div class="detail-row">
          <span class="label">{{ LABELS.model_num }}:</span>
          <span class="value">{{ equipmentData.model_num || equipmentData.serialNumber }}</span>
        </div>
        <div class="detail-row">
          <span class="label">{{ LABELS.cycle }}:</span>
          <span class="value">{{ formatCycle(equipmentData.cycle) }}</span>
        </div>
        <div class="detail-row">
          <span class="label">{{ LABELS.distance }}:</span>
          <span class="value">{{ formatDistance(equipmentData.distance) }}</span>
        </div>
      </div>

      <!-- 배터리 잔량 원형 차트 -->
      <div class="battery-section">
        <div class="battery-circle">
          <div class="circle-progress" :style="{ '--progress': batteryPercentage }">
            <div class="circle-inner">
              <span class="battery-value">{{ formatBattery(batteryLevel) }}</span>
              <span class="battery-label">{{ LABELS.battery }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  EQUIPMENT_DETAIL_LABELS as LABELS,
  formatDistance,
  formatCycle,
  formatBattery,
} from '@/constants/equipmentDetailLabels.js'

export default {
  name: 'EquipmentInfoCard',
  props: {
    equipmentData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      LABELS,
    }
  },
  computed: {
    batteryLevel() {
      return this.equipmentData.battery || 0
    },
    batteryPercentage() {
      return this.batteryLevel
    },
  },
  methods: {
    formatDistance,
    formatCycle,
    formatBattery,
  },
}
</script>

<style scoped>
.equipment-info-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #3498db;
}

.equipment-info-card h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #ecf0f1;
}

.equipment-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.detail-row .label {
  color: #7f8c8d;
  font-weight: 500;
  flex: 1;
}

.detail-row .value {
  color: #2c3e50;
  font-weight: 600;
  flex: 1;
  text-align: right;
}

.battery-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.battery-circle {
  position: relative;
  width: 120px;
  height: 120px;
}

.circle-progress {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #27ae60 0deg,
    #27ae60 calc(var(--progress) * 3.6deg),
    #ecf0f1 calc(var(--progress) * 3.6deg),
    #ecf0f1 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.circle-inner {
  width: 90px;
  height: 90px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.battery-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2px;
}

.battery-label {
  font-size: 0.7rem;
  color: #7f8c8d;
  font-weight: 500;
}
</style>
