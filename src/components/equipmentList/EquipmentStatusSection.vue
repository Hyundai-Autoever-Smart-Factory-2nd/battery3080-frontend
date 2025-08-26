<template>
  <div class="status-section" :class="status">
    <div class="status-header">
      <h3>{{ statusLabel }} : {{ equipment.length }}개</h3>
    </div>
    <div class="equipment-grid">
      <EquipmentCard
        v-for="item in paginatedEquipment"
        :key="`${status}-${item.id}`"
        :equipment="item"
        @select="$emit('equipment-select', $event)"
      />
    </div>
    <Pagination v-model:currentPage="currentPageInternal" :totalPages="totalPages" />
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
    paginatedEquipment() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.equipment.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.equipment.length / this.itemsPerPage)
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

.status-section.warning {
  border-left: 5px solid #f39c12;
}

.status-section.danger {
  border-left: 5px solid #e74c3c;
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
  font-size: 1.4rem;
  margin: 0;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0;
  flex: 1;
  overflow-y: auto;
}
</style>
