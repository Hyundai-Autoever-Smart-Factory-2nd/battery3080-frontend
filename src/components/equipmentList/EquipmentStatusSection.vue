<template>
  <div class="status-section" :class="status">
    <div class="status-header">
      <h3>
        {{ statusLabel }} : <span class="count">{{ totalCount || equipment.length }}</span
        >개
      </h3>
    </div>
    <div class="equipment-grid">
      <div v-if="isLoading" class="loading-message">데이터를 불러오는 중...</div>
      <div v-else-if="equipment.length === 0" class="empty-message">장비가 없습니다</div>
      <EquipmentCard
        v-else
        v-for="item in equipment"
        :key="`${status}-${item.id}`"
        :equipment="item"
        :equipment-type="equipmentType"
        @select="$emit('equipment-select', $event)"
      />
    </div>
    <Pagination
      v-if="!isLoading && equipment.length > 0"
      v-model:currentPage="currentPageInternal"
      :totalPages="totalPages"
    />
  </div>
</template>

<script>
import EquipmentCard from './EquipmentCard.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'EquipmentStatusSection',
  components: {
    EquipmentCard,
    Pagination,
  },
  props: {
    status: {
      type: String,
      required: true,
    },
    equipment: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 6,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    equipmentType: {
      type: String,
      default: 'agv',
    },
  },
  emits: ['equipment-select', 'update:currentPage'],
  computed: {
    statusLabel() {
      const statusMap = {
        good: '양호',
        warning: '주의',
        danger: '경고',
      }
      return statusMap[this.status] || this.status
    },
    currentPageInternal: {
      get() {
        return this.currentPage
      },
      set(value) {
        this.$emit('update:currentPage', value)
      },
    },
  },
}
</script>

<style scoped>
.status-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.status-section.good {
  border-left: 5px solid #27ae60;
}

.status-section.good .status-header h3 {
  color: #27ae60;
}

.status-section.warning {
  border-left: 5px solid #f39c12;
}

.status-section.warning .status-header h3 {
  color: #f39c12;
}

.status-section.danger {
  border-left: 5px solid #e74c3c;
}

.status-section.danger .status-header h3 {
  color: #e74c3c;
}

.status-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ecf0f1;
  flex-shrink: 0;
}

.status-header h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.status-header h3 .count {
  font-size: 1.7rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 4px;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0;
  flex: 1;
  overflow-y: auto;
}

.loading-message,
.empty-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
  font-size: 1.1rem;
}

.loading-message {
  color: #3498db;
}
</style>
