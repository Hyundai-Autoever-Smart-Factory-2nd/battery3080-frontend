<template>
  <div class="equipment-detail-container">
    <SideMenu class="sidebar" />
    <div class="main-content">
      <!-- 상단 정보 영역 -->
      <InfoTopBar
        :title="`${equipmentData.serialNumber} 상세 모니터링`"
        :current-date-time="currentDateTime"
        :manager-name="managerName"
        :refresh-interval="refreshInterval"
        :is-auto-refresh="isAutoRefresh"
        :show-back-button="true"
        @update-refresh-interval="handleRefreshIntervalUpdate"
        @go-back="goBack"
      />

      <!-- 상단 섹션 (3개 컴포넌트) -->
      <div class="top-section">
        <EquipmentInfoCard :equipment-data="equipmentData" />
        <MovementInfoCard :equipment-data="equipmentData" @map-ready="initMap" />
        <NotificationLogCard :notification-logs="notificationLogs" />
      </div>

      <!-- 하단 섹션 (2개 차트) -->
      <div class="bottom-section">
        <OperationChart @chart-ready="createOperationChart" />
        <UtilizationCharts
          @utilization-chart-ready="createUtilizationChart"
          @efficiency-chart-ready="createEfficiencyChart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/dashboard/SideMenu.vue'
import InfoTopBar from '@/components/InfoTopBar.vue'
import EquipmentInfoCard from '@/components/equipmentDetail/EquipmentInfoCard.vue'
import MovementInfoCard from '@/components/equipmentDetail/MovementInfoCard.vue'
import NotificationLogCard from '@/components/equipmentDetail/NotificationLogCard.vue'
import OperationChart from '@/components/equipmentDetail/OperationChart.vue'
import UtilizationCharts from '@/components/equipmentDetail/UtilizationCharts.vue'

import { useCharts } from '@/composables/useCharts.js'
import { useMap } from '@/composables/useMap.js'
import { useAutoRefresh } from '@/composables/useAutoRefresh.js'

export default {
  name: 'EquipmentDetailView',
  components: {
    SideMenu,
    InfoTopBar,
    EquipmentInfoCard,
    MovementInfoCard,
    NotificationLogCard,
    OperationChart,
    UtilizationCharts,
  },
  props: ['type', 'id'],
  setup() {
    const { createOperationChart, createUtilizationChart, createEfficiencyChart } = useCharts()

    const { initMap } = useMap()

    const { refreshInterval, isAutoRefresh, updateRefreshInterval } = useAutoRefresh()

    return {
      createOperationChart,
      createUtilizationChart,
      createEfficiencyChart,
      initMap,
      refreshInterval,
      isAutoRefresh,
      updateRefreshInterval,
    }
  },
  data() {
    return {
      currentDateTime: '',
      managerName: '홍길동',
      dateTimeTimer: null,
      equipmentData: {
        model: 'AGV-1',
        serialNumber: 'AGV-001-2024',
        battery: 85,
        speed: 2.5,
        totalDistance: 1247.8,
        imageUrl: '/src/assets/logo.svg',
        currentTask: '운반 작업',
        origin: '창고 A',
        destination: '라인 2',
        eta: '3분 후 예정',
      },
      notificationLogs: [
        { time: '14:32', message: '배터리 85% - 정상', type: 'info' },
        { time: '14:28', message: '적재 완료', type: 'success' },
        { time: '14:25', message: '장애물 감지 및 회피', type: 'warning' },
        { time: '14:20', message: '운반 작업 시작', type: 'info' },
        { time: '14:15', message: '충전 완료', type: 'success' },
        { time: '14:10', message: '시스템 점검 완료', type: 'info' },
      ],
    }
  },
  mounted() {
    this.loadEquipmentData()
    this.updateDateTime()

    // 1초마다 시간 업데이트
    this.dateTimeTimer = setInterval(() => {
      this.updateDateTime()
    }, 1000)
  },
  beforeUnmount() {
    if (this.dateTimeTimer) {
      clearInterval(this.dateTimeTimer)
    }
  },
  methods: {
    loadEquipmentData() {
      // 실제로는 API 호출로 데이터를 가져올 것
      const mockData = {
        agv: {
          1: {
            model: 'AGV-1',
            battery: 85,
            speed: 2.5,
            totalDistance: 1247.8,
            imageUrl: '/src/assets/logo.svg',
            currentTask: '운반 작업',
            origin: '창고 A',
            destination: '라인 2',
            eta: '3분 후 예정',
          },
          2: {
            model: 'AGV-2',
            battery: 62,
            speed: 1.8,
            totalDistance: 945.2,
            imageUrl: '/src/assets/logo.svg',
            currentTask: '적재 대기',
            origin: '라인 1',
            destination: '창고 B',
            eta: '5분 후 예정',
          },
        },
        forklift: {
          1: {
            model: 'F-10',
            battery: null,
            speed: 8.0,
            totalDistance: 2156.4,
            imageUrl: '/src/assets/logo.svg',
            currentTask: '화물 운반',
            origin: '적재장',
            destination: '출하장',
            eta: '2분 후 예정',
          },
        },
      }

      this.equipmentData = { ...this.equipmentData, ...mockData[this.type]?.[this.id] }
    },
    updateDateTime() {
      const now = new Date()
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      this.currentDateTime = now.toLocaleString('ko-KR', options)
    },
    goBack() {
      this.$router.push({ name: 'equipment-list', params: { type: this.type } })
    },
    handleRefreshIntervalUpdate(value) {
      this.refreshInterval = parseInt(value)
      this.updateRefreshInterval(() => {
        this.fetchEquipmentData()
      })
    },
    fetchEquipmentData() {
      console.log('장비 상세 데이터 갱신 중...')

      // 데이터만 업데이트 (차트 재생성하지 않음)
      const mockData = {
        agv: {
          1: {
            battery: Math.floor(Math.random() * 40) + 60, // 60-100 사이 랜덤
            speed: (Math.random() * 2 + 1.5).toFixed(1), // 1.5-3.5 사이 랜덤
          },
        },
        forklift: {
          1: {
            speed: (Math.random() * 4 + 6).toFixed(1), // 6-10 사이 랜덤
          },
        },
      }

      // 기존 데이터에 새로운 값만 업데이트
      if (mockData[this.type]?.[this.id]) {
        Object.assign(this.equipmentData, mockData[this.type][this.id])
      }
    },
  },
}
</script>

<style scoped>
/* 레이아웃 관련 기본 스타일만 */
.equipment-detail-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
}

.top-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
  min-height: 350px;
  height: auto;
}

.bottom-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 320px;
  max-height: 320px;
  margin-top: 20px;
  overflow: hidden;
}
</style>
