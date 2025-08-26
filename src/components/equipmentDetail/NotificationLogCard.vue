<template>
  <div class="notification-log-card">
    <h3>알림 로그</h3>
    <div class="log-container">
      <div v-for="(log, index) in notificationLogs" :key="index" class="log-item" :class="log.type">
        <div class="log-time">{{ log.time }}</div>
        <div class="log-message">{{ log.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationLogCard',
  props: {
    notificationLogs: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.notification-log-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #e67e22;
  display: flex;
  flex-direction: column;
}

.notification-log-card h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #ecf0f1;
  flex-shrink: 0;
}

.log-container {
  flex: 1;
  overflow-y: auto;
  max-height: 250px;
  padding-right: 8px;
}

.log-container::-webkit-scrollbar {
  width: 6px;
}

.log-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.log-container::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 3px;
}

.log-container::-webkit-scrollbar-thumb:hover {
  background: #95a5a6;
}

.log-item {
  background: #f8f9fa;
  padding: 10px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  border-left: 3px solid #bdc3c7;
  transition: all 0.2s ease;
}

.log-item:hover {
  transform: translateX(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.log-item.info {
  border-left-color: #3498db;
}

.log-item.success {
  border-left-color: #27ae60;
}

.log-item.warning {
  border-left-color: #f39c12;
}

.log-item.error {
  border-left-color: #e74c3c;
}

.log-time {
  color: #7f8c8d;
  font-size: 0.8rem;
  font-weight: 500;
}

.log-message {
  color: #2c3e50;
  font-size: 0.9rem;
  margin-top: 2px;
}
</style>
