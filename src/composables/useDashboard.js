// 대시보드 관련 로직을 관리하는 composable
import { ref, onMounted } from 'vue'
import { productionData, performanceData } from '@/data/dashboardData.js'
// import { dashboardApi } from '@/api/dashboardApi.js' // 나중에 API 연동할 때 주석 해제

/**
 * 대시보드 데이터를 관리하는 composable
 * 현재: 임시 데이터 사용
 * 나중: API 호출로 변경 예정
 */
export function useDashboard() {
  // 반응형 데이터 - 초기값을 미리 설정해서 렌더링 에러 방지
  const dashboardData = ref({
    production: productionData,
    performance: performanceData,
  })

  // 나중에 API 연동할 때 사용할 상태들 (현재는 미사용)
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * 대시보드 데이터 로드
   * 현재: 임시 데이터 사용
   * 나중: API 호출로 변경
   */
  const fetchDashboardData = async () => {
    try {
      // isLoading.value = true // API 연동할 때 주석 해제
      // error.value = null

      // 현재: 임시 데이터 사용
      dashboardData.value = {
        production: productionData,
        performance: performanceData,
      }

      // 나중에 API 연동할 때 아래 코드로 교체
      // const response = await dashboardApi.getDashboardData()
      // dashboardData.value = response.data

      console.log('대시보드 데이터 로드 완료')
    } catch (err) {
      // error.value = '데이터를 불러오는데 실패했습니다.' // API 연동할 때 주석 해제
      console.error('대시보드 데이터 로드 실패:', err)
    } finally {
      // isLoading.value = false // API 연동할 때 주석 해제
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
    // 현재 사용 중인 데이터
    dashboardData,

    // 나중에 API 연동할 때 사용할 상태들
    isLoading,
    error,
    refreshData,
  }
}
