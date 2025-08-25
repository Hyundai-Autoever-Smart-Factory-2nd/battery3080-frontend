<template>
  <div class="dashboard-container">
    <!-- 좌측 메뉴바 -->
    <SideMenu class="sidebar" />

    <!-- 중앙 성과/결함률 섹션 -->
    <div class="center-section">
      <PerformanceCharts />
    </div>

    <!-- 우측 테이블 섹션 -->
    <div class="right-section">
      <DataTable />
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import PerformanceCharts from '@/components/PerformanceCharts.vue'
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'DashboardView',
  components: {
    SideMenu,
    PerformanceCharts,
    DataTable,
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
  flex: 0 0 700px;
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
</style>
