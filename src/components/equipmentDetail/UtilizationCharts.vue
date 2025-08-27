<template>
  <div class="chart-card">
    <h3>작업 가동률</h3>
    <div class="utilization-charts">
      <div class="chart-item">
        <h4>전체 가동률</h4>
        <div class="chart-container">
          <canvas ref="utilizationChart" id="utilizationChart"></canvas>
        </div>
      </div>
      <div class="chart-item">
        <h4>작업 효율성</h4>
        <div class="chart-container">
          <canvas ref="efficiencyChart" id="efficiencyChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UtilizationCharts',
  mounted() {
    this.$emit('utilization-chart-ready', this.$refs.utilizationChart)
    this.$emit('efficiency-chart-ready', this.$refs.efficiencyChart)
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

.utilization-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 100%;
}

.chart-item {
  display: flex;
  flex-direction: column;
}

.chart-item h4 {
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 15px 0;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #ecf0f1;
}

.chart-item .chart-container {
  flex: 1;
  width: 100%;
  height: 180px;
  min-height: 180px;
  max-height: 180px;
}

.chart-item .chart-container canvas {
  width: 100% !important;
  height: 180px !important;
}
</style>
