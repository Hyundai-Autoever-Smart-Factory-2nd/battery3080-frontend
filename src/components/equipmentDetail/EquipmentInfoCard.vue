<template>
  <div class="equipment-info-card">
    <h3>장비 정보</h3>
    <div class="equipment-details">
      <div class="detail-row">
        <span class="label">모델 번호:</span>
        <span class="value">{{ equipmentData.serialNumber }}</span>
      </div>
      <div class="detail-row">
        <span class="label">배터리:</span>
        <span class="value battery" :class="getBatteryClass(equipmentData.battery)">
          {{ equipmentData.battery }}%
        </span>
      </div>
      <div class="detail-row">
        <span class="label">속도:</span>
        <span class="value">{{ equipmentData.speed }} km/h</span>
      </div>
      <div class="detail-row">
        <span class="label">누적거리:</span>
        <span class="value">{{ equipmentData.totalDistance }} km</span>
      </div>
      <div class="equipment-image">
        <img :src="equipmentData.imageUrl" :alt="equipmentData.model" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentInfoCard',
  props: {
    equipmentData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getBatteryClass(battery) {
      if (!battery) return ''
      if (battery > 60) return 'battery-high'
      if (battery > 30) return 'battery-medium'
      return 'battery-low'
    },
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
  gap: 15px;
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

.battery.battery-high {
  color: #27ae60;
}

.battery.battery-medium {
  color: #f39c12;
}

.battery.battery-low {
  color: #e74c3c;
}

.equipment-image {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.equipment-image img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
  border: 2px solid #ecf0f1;
}
</style>
