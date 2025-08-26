<template>
  <div class="chart-card">
    <h3>운영 시간 추세</h3>
    <div class="chart-container">
      <canvas ref="operationChart" id="operationChart"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationChart',
  mounted() {
    this.$emit('chart-ready', this.$refs.operationChart)
  },
}
</script>

<style scoped>
.chart-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #9b59b6;
}

.chart-card h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #ecf0f1;
}

.chart-container {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.chart-container canvas {
  width: 100% !important;
  height: 200px !important;
  max-width: 100%;
  max-height: 100%;
}
</style>
