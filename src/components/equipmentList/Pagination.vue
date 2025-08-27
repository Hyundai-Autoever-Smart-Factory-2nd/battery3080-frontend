<template>
  <div class="pagination" v-if="totalPages > 1">
    <button
      v-for="page in totalPages"
      :key="page"
      :class="['page-btn', { active: currentPage === page }]"
      @click="$emit('update:currentPage', page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:currentPage'],
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 15px;
  flex-shrink: 0;
}

.page-btn {
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  background: white;
  color: #6c757d;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.page-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

.page-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}
</style>
