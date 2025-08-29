<template>
  <div class="movement-info-card">
    <h3>{{ LABELS.current_status }}</h3>
    <div class="current-task">
      <div class="status-info">
        <div class="status-row">
          <span class="label">{{ LABELS.status }}:</span>
          <span class="value status-badge" :class="getStatusClass(equipmentData.status)">
            {{ equipmentData.status || equipmentData.currentTask }}
          </span>
        </div>
        <div class="status-row">
          <span class="label">{{ LABELS.from_location }}:</span>
          <span class="value">{{ equipmentData.from_location || equipmentData.origin }}</span>
        </div>
        <div class="status-row">
          <span class="label">{{ LABELS.to_location }}:</span>
          <span class="value">{{ equipmentData.to_location || equipmentData.destination }}</span>
        </div>
      </div>

      <div class="map-container">
        <div id="equipment-map" class="map-element"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { EQUIPMENT_DETAIL_LABELS as LABELS } from '@/constants/equipmentDetailLabels.js'

export default {
  name: 'MovementInfoCard',
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
  methods: {
    getStatusClass(status) {
      const statusMap = {
        Driving: 'status-running',
        운행중: 'status-running',
        대기중: 'status-waiting',
        충전중: 'status-charging',
        점검필요: 'status-warning',
        긴급정지: 'status-danger',
        Waiting: 'status-waiting',
        Charging: 'status-charging',
        Loading: 'status-warning',
        Cooling: 'status-waiting',
      }
      return statusMap[status] || 'status-default'
    },
  },
  mounted() {
    this.$emit('map-ready', 'equipment-map')
  },
}
</script>

<style scoped>
.movement-info-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #27ae60;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.movement-info-card h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #ecf0f1;
  flex-shrink: 0;
}

.current-task {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  overflow-y: auto;
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.status-row .label {
  color: #7f8c8d;
  font-weight: 500;
  flex: 1;
}

.status-row .value {
  color: #2c3e50;
  font-weight: 600;
  flex: 1;
  text-align: right;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  line-height: 1.2;
}

.status-running {
  background: #d5f4e6;
  color: #27ae60;
}

.status-waiting {
  background: #fff3cd;
  color: #856404;
}

.status-charging {
  background: #cce5ff;
  color: #0066cc;
}

.status-warning {
  background: #fef9e7;
  color: #f39c12;
}

.status-danger {
  background: #fadbd8;
  color: #e74c3c;
}

.status-default {
  background: #e9ecef;
  color: #6c757d;
}

.map-container {
  flex: 1;
  background: #ecf0f1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  max-height: 180px;
  overflow: hidden;
  position: relative;
}

.map-element {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

/* Leaflet 지도 스타일 오버라이드 */
:global(.leaflet-container) {
  font-family: inherit;
}

:global(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
}

:global(.agv-marker) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
