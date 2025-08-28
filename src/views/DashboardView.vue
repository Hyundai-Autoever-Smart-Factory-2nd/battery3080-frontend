<template>
  <div class="dashboard-container">
    <!-- 좌측 메뉴바 -->
    <SideMenu class="sidebar" />

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">백엔드 서버에서 데이터를 불러오는 중...</div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="error-container">
      <div class="error-message">{{ error }}</div>
      <button @click="refreshData" class="retry-button">다시 시도</button>
    </div>

    <!-- 대시보드 콘텐츠 -->
    <template v-else>
      <!-- 중앙 성과/결함률 섹션 -->
      <div class="center-section">
        <PerformanceCharts
          :achievement-data="dashboardData?.performance?.achievement || {}"
          :defect-data="dashboardData?.performance?.defect || {}"
        />
      </div>

      <!-- 우측 테이블 섹션 -->
      <div class="right-section">
        <DataTable
          :total-production="dashboardData?.production?.totalProduction || 0"
          :row2-data="dashboardData?.production?.lineProduction || []"
          :row3-data="dashboardData?.production?.qualityData || []"
          :row4-data="dashboardData?.production?.operationData || []"
          :row5-data="dashboardData?.production?.resourceData || []"
        />
      </div>
    </template>
  </div>
</template>

<script>
import SideMenu from '@/components/dashboard/SideMenu.vue'
import PerformanceCharts from '@/components/dashboard/PerformanceCharts.vue'
import DataTable from '@/components/dashboard/DataTable.vue'
import { useDashboard } from '@/composables/useDashboard.js'

export default {
  name: 'DashboardView',
  components: {
    SideMenu,
    PerformanceCharts,
    DataTable,
  },
  setup() {
    // API 연동으로 대시보드 데이터 관리
    const { dashboardData, isLoading, error, refreshData } = useDashboard()
    return { dashboardData, isLoading, error, refreshData }
  },
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.sidebar {
  flex: 0 0 auto;
  background-color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}

.center-section {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100vh;
  box-sizing: border-box;
}

.right-section {
  flex: 1;
  padding: 15px;
  background-color: #ffffff;
  border-left: 1px solid #ddd;
  height: 100vh;
  box-sizing: border-box;
  min-width: 0;
}

/* 로딩/에러 상태 스타일 */
.loading-container,
.error-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.loading-spinner {
  font-size: 1.2rem;
  color: #3498db;
  text-align: center;
}

.error-message {
  font-size: 1.1rem;
  color: #e74c3c;
  text-align: center;
  margin-bottom: 20px;
}

.retry-button {
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #2980b9;
}
</style>
