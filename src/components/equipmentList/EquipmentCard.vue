<template>
  <div class="equipment-card" :class="equipment.status" @click="$emit('select', equipment.id)">
    <div class="equipment-header">
      <h4>{{ equipment.model }}</h4>
      <span class="status" :class="equipment.status">{{ statusLabel }}</span>
    </div>
    <div class="equipment-info">
      <div class="info-item">
        <span class="label">모델 번호:</span>
        <span class="value">{{ equipment.serialNumber }}</span>
      </div>
      <div class="info-item">
        <span class="label">위치:</span>
        <span class="value">{{ equipment.location }}</span>
      </div>
      <div class="info-item" v-if="equipment.battery !== undefined">
        <span class="label">배터리:</span>
        <span class="value">{{ equipment.battery }}%</span>
      </div>
      <div class="info-item">
        <span class="label">작업 상태:</span>
        <span class="value">{{ equipment.taskStatus }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentCard',
  props: {
    equipment: {
      type: Object,
      required: true,
    },
  },
  emits: ['select'],
  computed: {
    statusLabel() {
      const statusMap = {
        good: '양호',
        warning: '주의',
        danger: '경고',
      }
      return statusMap[this.equipment.status] || this.equipment.status
    },
  },
}
</script>

<style scoped>
.equipment-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.equipment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.equipment-card.good {
  border-left-color: #27ae60;
}

.equipment-card.warning {
  border-left-color: #f39c12;
}

.equipment-card.danger {
  border-left-color: #e74c3c;
}

.equipment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #dee2e6;
  flex-shrink: 0;
}

.equipment-header h4 {
  color: #2c3e50;
  font-size: 0.9rem;
  margin: 0;
  font-weight: 600;
}

.status {
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
}

.status.good {
  background-color: #d5f4e6;
  color: #27ae60;
}

.status.warning {
  background-color: #fef9e7;
  color: #f39c12;
}

.status.danger {
  background-color: #fadbd8;
  color: #e74c3c;
}

.equipment-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow: hidden;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.info-item .label {
  color: #6c757d;
  font-weight: 500;
}

.info-item .value {
  color: #2c3e50;
  font-weight: 600;
}
</style>
