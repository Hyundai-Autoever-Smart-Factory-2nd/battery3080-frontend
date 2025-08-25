<template>
  <div class="performance-charts">
    <!-- 달성률 섹션 -->
    <div class="chart-section">
      <h3>오늘의 달성률</h3>
      <div class="chart-container">
        <div class="circular-chart">
          <div
            class="circle-progress achievement"
            :style="{ '--progress': achievementData.percentage }"
          >
            <div class="chart-center-text">
              <div class="percentage">{{ achievementData.percentage }}%</div>
              <div class="label">달성률</div>
            </div>
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <span class="label">목표 수량:</span>
          <span class="value">{{ achievementData.target.toLocaleString() }}</span>
        </div>
        <div class="stat-item">
          <span class="label">달성 수량:</span>
          <span class="value">{{ achievementData.achieved.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- 결함률 섹션 -->
    <div class="chart-section">
      <h3>오늘의 결함률</h3>
      <div class="chart-container">
        <div class="circular-chart">
          <div class="circle-progress defect" :style="{ '--progress': defectData.percentage }">
            <div class="chart-center-text">
              <div class="percentage">{{ defectData.percentage }}%</div>
              <div class="label">결함률</div>
            </div>
          </div>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <span class="label">생산 수량:</span>
          <span class="value">{{ defectData.production.toLocaleString() }}</span>
        </div>
        <div class="stat-item">
          <span class="label">결함 수량:</span>
          <span class="value">{{ defectData.defective.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceCharts',
  data() {
    return {
      achievementData: {
        target: 1000,
        achieved: 999,
        percentage: 99.9,
      },
      defectData: {
        production: 2000,
        defective: 1000,
        percentage: 50.0,
      },
    }
  },
}
</script>

<style scoped>
.performance-charts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 5px;
}

.chart-section {
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.chart-section h3 {
  margin: 0 0 8px 0;
  text-align: center;
  color: #2c3e50;
  font-size: 3rem;
  font-weight: 600;
  flex-shrink: 0;
}

.chart-container {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.circular-chart {
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-progress {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--color) 0deg,
    var(--color) calc(var(--progress) * 3.6deg),
    #ecf0f1 calc(var(--progress) * 3.6deg),
    #ecf0f1 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
}

.circle-progress:hover {
  transform: scale(1.05);
}

.circle-progress.achievement {
  --color: #27ae60;
}

.circle-progress.defect {
  --color: #e74c3c;
}

.circle-progress::before {
  content: '';
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: white;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chart-center-text {
  position: relative;
  z-index: 1;
  text-align: center;
}

.chart-center-text .percentage {
  font-size: 2.2rem;
  font-weight: bold;
  color: #2c3e50;
  line-height: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-center-text .label {
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 5px;
  font-weight: 500;
}

.stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  flex: 1;
  overflow: hidden;
  padding: 0 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 18px;
  background: white;
  border-radius: 8px;
  font-size: 3rem;
  flex: 1;
  min-width: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-item .label {
  color: #6c757d;
  font-weight: 600;
  margin-bottom: 6px;
  white-space: nowrap;
  font-size: 0.95rem;
}

.stat-item .value {
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.1rem;
}
</style>
