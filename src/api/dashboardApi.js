import api from './config.js'

/**
 * 대시보드 API 호출 함수들
 */
export const dashboardApi = {
  /**
   * 대시보드 전체 데이터 조회
   * @returns {Promise} 대시보드 데이터
   */
  async getDashboardData() {
    const response = await api.get('/home')
    return response // 원본 응답 반환
  },
}
