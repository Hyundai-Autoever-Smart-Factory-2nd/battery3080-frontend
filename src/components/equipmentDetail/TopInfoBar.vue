<template>
  <div class="top-info-bar">
    <div class="left-section">
      <button @click="$emit('go-back')" class="back-btn">← 목록으로</button>
      <h1>{{ equipmentData.serialNumber }} 상세 모니터링</h1>
    </div>
    <div class="right-section">
      <div class="datetime-display">
        <div class="current-time">{{ currentDateTime }}</div>
        <div class="manager-info">관리자 : {{ managerName }}</div>
        <div class="api-refresh-control">
          <label for="refresh-interval">자동 갱신 주기:</label>
          <select
            id="refresh-interval"
            :value="refreshInterval"
            @change="$emit('update-refresh-interval', $event.target.value)"
            class="refresh-select"
          >
            <option value="0">수동</option>
            <option value="1000">1초</option>
            <option value="5000">5초</option>
            <option value="30000">30초</option>
            <option value="60000">1분</option>
            <option value="300000">5분</option>
          </select>
          <span class="status-indicator" :class="{ active: isAutoRefresh }">
            {{ isAutoRefresh ? '자동 갱신 중' : '수동 모드' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopInfoBar',
  props: {
    currentDateTime: {
      type: String,
      required: true,
    },
    managerName: {
      type: String,
      required: true,
    },
    refreshInterval: {
      type: Number,
      required: true,
    },
    isAutoRefresh: {
      type: Boolean,
      required: true,
    },
    equipmentData: {
      type: Object,
      required: true,
    },
  },
  emits: ['go-back', 'update-refresh-interval'],
}
</script>

<style scoped>
.top-info-bar {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.back-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background: #2980b9;
}

.left-section h1 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
}

.right-section {
  text-align: right;
}

.datetime-display {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.current-time {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.manager-info {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.api-refresh-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.api-refresh-control label {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.refresh-select {
  padding: 5px 10px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  background: white;
  color: #2c3e50;
  font-size: 0.9rem;
}

.status-indicator {
  color: #95a5a6;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 12px;
  background: #ecf0f1;
}

.status-indicator.active {
  color: #27ae60;
  background: #d5f4e6;
}
</style>
