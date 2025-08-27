<template>
  <div class="factory-selector">
    <div class="factory-tabs">
      <button
        v-for="factory in factoryList"
        :key="factory.id"
        :class="['factory-tab', { active: selectedFactory === factory.id }]"
        @click="selectFactory(factory.id)"
      >
        {{ factory.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FactorySelector',
  props: {
    selectedFactory: {
      type: String,
      required: true,
    },
    factoryList: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:selectedFactory'],
  methods: {
    selectFactory(factoryId) {
      this.$emit('update:selectedFactory', factoryId)
    },
  },
}
</script>

<style scoped>
.factory-selector {
  background: white;
  border-radius: 12px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.factory-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.factory-tab {
  padding: 10px 20px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.factory-tab:hover {
  background: #3498db;
  color: white;
}

.factory-tab.active {
  background: #3498db;
  color: white;
}
</style>
