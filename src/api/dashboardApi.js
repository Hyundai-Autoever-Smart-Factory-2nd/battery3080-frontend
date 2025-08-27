// 대시보드 API 호출 함수들
// 현재는 사용하지 않음, 나중에 백엔드 연동할 때 사용
import api from './config.js'

/**
 * 대시보드 관련 API 호출 함수들
 */
export const dashboardApi = {
  /**
   * 대시보드 전체 데이터 조회
   * @returns {Promise} 대시보드 데이터
   */
  getDashboardData() {
    return api.get('/dashboard')
  },

  /**
   * 생산 현황 데이터만 조회
   * @returns {Promise} 생산 데이터
   */
  getProductionData() {
    return api.get('/dashboard/production')
  },

  /**
   * 성과 데이터만 조회
   * @returns {Promise} 성과 데이터
   */
  getPerformanceData() {
    return api.get('/dashboard/performance')
  },

  /**
   * 실시간 데이터 업데이트 요청
   * @returns {Promise} 최신 데이터
   */
  getRealTimeData() {
    return api.get('/dashboard/realtime')
  },
}

// 사용 예시:
// const response = await dashboardApi.getDashboardData()
// const data = response.data
