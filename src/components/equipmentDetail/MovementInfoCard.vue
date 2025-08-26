<template>
  <div class="movement-info-card">
    <h3>현재 작업 상태</h3>
    <div class="current-task">
      <div class="task-status">{{ equipmentData.currentTask }}</div>
      <div class="route-info">
        <div class="route">{{ equipmentData.origin }} → {{ equipmentData.destination }}</div>
        <div class="eta">ETA: {{ equipmentData.eta }}</div>
      </div>
      <div class="map-container">
        <div id="equipment-map" class="map-element"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovementInfoCard',
  props: {
    equipmentData: {
      type: Object,
      required: true,
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

.task-status {
  background: #d5f4e6;
  color: #27ae60;
  padding: 10px 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.route-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.route {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
}

.eta {
  color: #7f8c8d;
  text-align: center;
  font-size: 0.9rem;
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
