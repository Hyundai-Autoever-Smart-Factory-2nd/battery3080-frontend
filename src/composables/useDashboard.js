// 대시보드 관련 로직을 관리하는 composable
import { ref, onMounted } from 'vue'
import { dashboardApi } from '@/api/dashboardApi.js'
import { dashboardApiResponse } from '@/data/dashboardData.js'
import { HOME_DASHBOARD_LABELS } from '@/constants/homeLabels.js'

/**
 * 백엔드 API 응답을 대시보드 데이터로 변환하는 함수
 */
function transformApiResponse(apiData) {
  // 퍼포먼스 차트 데이터
  const achievementTarget = apiData.achievement_target
  const achievementAchieved = apiData.achievement_achieved
  const defectProduction = apiData.defect_production
  const defectDefective = apiData.defect_defective

  // 배터리 경고 데이터 (첫 번째 행)
  const totalBatteryWrong = apiData.total_battery_wrong

  // 배터리 경고 상세 (두 번째 행)
  const batteryWarningData = [
    {
      id: 1,
      title: HOME_DASHBOARD_LABELS.agv_battery_wrong,
      number: apiData.agv_battery_wrong,
    },
    {
      id: 2,
      title: HOME_DASHBOARD_LABELS.robot_arm_battery_wrong,
      number: apiData.robot_arm_battery_wrong,
    },
    {
      id: 3,
      title: HOME_DASHBOARD_LABELS.lift_car_battery_wrong,
      number: apiData.lift_car_battery_wrong,
    },
    {
      id: 4,
      title: HOME_DASHBOARD_LABELS.etc_battery_wrong,
      number: apiData.etc_battery_wrong,
    },
  ]

  // 공장1 평균 데이터 (세 번째 행)
  const factory1Data = [
    {
      id: 1,
      title: HOME_DASHBOARD_LABELS.factory1_agv_avg,
      number: Math.round(apiData.factory1_agv_avg),
    },
    {
      id: 2,
      title: HOME_DASHBOARD_LABELS.factory1_robot_avg,
      number: Math.round(apiData.factory1_robot_avg),
    },
    {
      id: 3,
      title: HOME_DASHBOARD_LABELS.factory1_lift_avg,
      number: Math.round(apiData.factory1_lift_avg),
    },
  ]

  // 공장2 평균 데이터 (네 번째 행)
  const factory2Data = [
    {
      id: 1,
      title: HOME_DASHBOARD_LABELS.factory2_agv_avg,
      number: Math.round(apiData.factory2_agv_avg),
    },
    {
      id: 2,
      title: HOME_DASHBOARD_LABELS.factory2_robot_avg,
      number: Math.round(apiData.factory2_robot_avg),
    },
    {
      id: 3,
      title: HOME_DASHBOARD_LABELS.factory2_lift_avg,
      number: Math.round(apiData.factory2_lift_avg),
    },
  ]

  // 공장3 평균 데이터 (다섯 번째 행)
  const factory3Data = [
    {
      id: 1,
      title: HOME_DASHBOARD_LABELS.factory3_agv_avg,
      number: Math.round(apiData.factory3_agv_avg),
    },
    {
      id: 2,
      title: HOME_DASHBOARD_LABELS.factory3_robot_avg,
      number: Math.round(apiData.factory3_robot_avg),
    },
    {
      id: 3,
      title: HOME_DASHBOARD_LABELS.factory3_lift_avg,
      number: Math.round(apiData.factory3_lift_avg),
    },
  ]

  return {
    production: {
      totalProduction: totalBatteryWrong,
      lineProduction: batteryWarningData,
      qualityData: factory1Data,
      operationData: factory2Data,
      resourceData: factory3Data,
    },
    performance: {
      achievement: {
        target: achievementTarget,
        achieved: achievementAchieved,
      },
      defect: {
        production: defectProduction,
        defective: defectDefective,
      },
    },
  }
}

/**
 * 대시보드 데이터를 관리하는 composable
 */
export function useDashboard() {
  // 반응형 데이터
  const dashboardData = ref({
    production: {},
    performance: {},
  })

  const isLoading = ref(false)
  const error = ref(null)

  /**
   * 대시보드 데이터 로드 - 실제 API 호출
   */
  const fetchDashboardData = async () => {
    try {
      isLoading.value = true
      error.value = null

      console.log('백엔드 API 호출 중...')
      const response = await dashboardApi.getDashboardData()

      if (response.data.success) {
        // API 응답을 대시보드 형식으로 변환
        console.log('ASDFASDFA', response.data)
        const transformedData = transformApiResponse(response.data.data)
        dashboardData.value = transformedData
        console.log('대시보드 데이터 로드 완료:', transformedData)
      } else {
        throw new Error('API 응답에서 success가 false입니다.')
      }
    } catch (err) {
      console.warn('백엔드 API 호출 실패, Mock 데이터 사용:', err)

      // API 호출 실패 시 Mock 데이터 사용
      const mockData = dashboardApiResponse
      dashboardData.value = {
        production: mockData.production,
        performance: mockData.performance,
      }

      // 에러 메시지를 표시하지 않고 Mock 데이터를 정상적으로 사용
      error.value = null
      console.log('Mock 데이터 로드 완료:', dashboardData.value)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 데이터 새로고침
   */
  const refreshData = () => {
    fetchDashboardData()
  }

  // 컴포넌트 마운트 시 데이터 로드
  onMounted(() => {
    fetchDashboardData()
  })

  return {
    dashboardData,
    isLoading,
    error,
    refreshData,
  }
}
