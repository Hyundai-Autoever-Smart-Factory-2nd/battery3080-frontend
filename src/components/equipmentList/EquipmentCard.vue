<template>
  <div class="equipment-card" :class="statusClass" @click="$emit('select', equipment.id)">
    <div class="equipment-header">
      <h3 class="model-name">{{ equipment.modelNum }}</h3>
    </div>
    <div class="equipment-info">
      <div class="info-item" v-if="showBattery">
        <span class="label">배터리 상태:</span>
        <span class="value">{{ equipment.crate }}%</span>
      </div>
      <div class="info-item" v-if="equipment.temp">
        <span class="label">온도:</span>
        <span class="value">{{ equipment.temp }}°C</span>
      </div>
      <div class="info-item">
        <span class="label">작업 상태:</span>
        <span class="value">{{ equipment.status }}</span>
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
    equipmentType: {
      type: String,
      default: 'agv',
    },
  },
  emits: ['select'],
  computed: {
    statusClass() {
      // 상태에 따른 CSS 클래스 결정
      const workingStates = ['운행중', '대기중', '충전중', '정상운행']
      const warningStates = ['점검필요', '배터리부족']
      const dangerStates = ['긴급정지', '정지']

      if (workingStates.includes(this.equipment.status)) {
        return 'good'
      } else if (warningStates.includes(this.equipment.status)) {
        return 'warning'
      } else if (dangerStates.includes(this.equipment.status)) {
        return 'danger'
      }
      return 'good' // 기본값
    },
    statusLabel() {
      const statusMap = {
        good: '양호',
        warning: '주의',
        danger: '경고',
      }
      return statusMap[this.statusClass] || '양호'
    },
    showBattery() {
      // AGV만 배터리 정보 표시
      return this.equipmentType === 'agv' && this.equipment.crate > 0
    },
  },
}
</script>

<style scoped>
.equipment-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  height: 8rem;
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
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dee2e6;
  flex-shrink: 0;
}

.model-name {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.equipment-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow: hidden;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
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
