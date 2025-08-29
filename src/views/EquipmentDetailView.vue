<template>
  <div class="equipment-detail-container">
    <SideMenu class="sidebar" />
    <div class="main-content">
      <!-- 상단 정보 영역 -->
      <InfoTopBar
        :title="`${equipmentData.model_num || 'AGV-001'} 상세 모니터링`"
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
      <div class="bottom-section" v-if="!isLoading && equipmentData.model_num">
        <OperationChart @chart-ready="handleOperationChartReady" />
        <UtilizationCharts
          @utilization-chart-ready="handleUtilizationChartReady"
          @efficiency-chart-ready="handleEfficiencyChartReady"
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
import { useEquipmentDetail } from '@/composables/useEquipmentDetail.js'
import { computed } from 'vue'

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
  setup(props) {
    const { createOperationChart, createUtilizationChart, createEfficiencyChart } = useCharts()
    const { initMap } = useMap()
    const { refreshInterval, isAutoRefresh, updateRefreshInterval } = useAutoRefresh()

    // 장비 ID를 computed로 변환
    const modelInfoId = computed(() => parseInt(props.id))

    // 장비 상세 정보 로드
    const { equipmentData, isLoading, error, fetchEquipmentDetail } =
      useEquipmentDetail(modelInfoId)

    return {
      createOperationChart,
      createUtilizationChart,
      createEfficiencyChart,
      initMap,
      refreshInterval,
      isAutoRefresh,
      updateRefreshInterval,
      equipmentData,
      isLoading,
      error,
      fetchEquipmentDetail,
    }
  },
  data() {
    return {
      currentDateTime: '',
      managerName: '홍길동',
      dateTimeTimer: null,
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
    methods: {
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
        console.log('갱신 간격 변경:', value)
        this.updateRefreshInterval(value, () => {
          // 장비 상세 데이터 새로고침
          console.log('장비 상세 데이터 갱신 중...')
        })
      },
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
    handleOperationChartReady(canvas) {
      // 데이터가 로드된 후에 차트 생성
      if (this.equipmentData.temp && this.equipmentData.temp.length > 0) {
        console.log('온도 차트 생성:', this.equipmentData.temp)
        this.createOperationChart(canvas, this.equipmentData.temp)
      }
    },
    handleUtilizationChartReady(canvas) {
      // 데이터가 로드된 후에 차트 생성
      if (this.equipmentData.run_count !== undefined) {
        console.log('가동률 차트 생성:', {
          run: this.equipmentData.run_count,
          wait: this.equipmentData.wait_count,
          charge: this.equipmentData.charge_count,
          cooling: this.equipmentData.cooling_count,
        })
        this.createUtilizationChart(canvas, this.equipmentData)
      }
    },
    handleEfficiencyChartReady(canvas) {
      // 데이터가 로드된 후에 차트 생성
      if (this.equipmentData.battery !== undefined) {
        console.log('배터리 차트 생성:', this.equipmentData.battery)
        this.createEfficiencyChart(canvas, this.equipmentData)
      }
    },
    handleRefreshIntervalUpdate(value) {
      console.log('갱신 간격 변경:', value)
      this.updateRefreshInterval(value, () => {
        console.log('장비 상세 데이터 자동 갱신 실행')
        this.fetchEquipmentDetail()

        // 데이터 갱신 후 차트 업데이트
        this.$nextTick(() => {
          this.updateChartsWithNewData()
        })
      })
    },
    updateChartsWithNewData() {
      // 온도 차트 업데이트
      const operationCanvas = document.getElementById('operationChart')
      if (operationCanvas && this.equipmentData.temp) {
        console.log('온도 차트 업데이트:', this.equipmentData.temp)
        this.createOperationChart(operationCanvas, this.equipmentData.temp)
      }

      // 가동률 차트 업데이트
      const utilizationCanvas = document.getElementById('utilizationChart')
      if (utilizationCanvas && this.equipmentData.run_count !== undefined) {
        console.log('가동률 차트 업데이트:', this.equipmentData)
        this.createUtilizationChart(utilizationCanvas, this.equipmentData)
      }

      // 배터리 차트 업데이트
      const efficiencyCanvas = document.getElementById('efficiencyChart')
      if (efficiencyCanvas && this.equipmentData.battery !== undefined) {
        console.log('배터리 차트 업데이트:', this.equipmentData.battery)
        this.createEfficiencyChart(efficiencyCanvas, this.equipmentData)
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
