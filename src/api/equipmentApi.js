// 장비 관련 API 호출 함수들
import api from './config.js'

/**
 * 장비 관련 API 호출 함수들
 */
export const equipmentApi = {
  /**
   * 상태별 장비 리스트 조회
   * @param {number} equipmentId - 장비 타입 ID (AGV: 1, 지게차: 2, 컨베이어: 3)
   * @param {number} factoryId - 공장 ID (공장1: 1, 공장2: 2, 공장3: 3)
   * @param {string} status - 상태 (good, warning, danger)
   * @param {number} page - 페이지 번호 (0부터 시작)
   * @param {number} size - 페이지 크기
   * @returns {Promise} 장비 리스트 데이터
   */
  getEquipmentList(equipmentId, factoryId, status, page = 0, size = 6) {
    return api.get(`/equipments/${equipmentId}/factories/${factoryId}`, {
      params: {
        status,
        page,
        size,
      },
    })
  },

  /**
   * 장비 상세 정보 조회
   * @param {number} equipmentId - 장비 ID
   * @returns {Promise} 장비 상세 데이터
   */
  getEquipmentDetail(equipmentId) {
    return api.get(`/equipments/${equipmentId}`)
  },
}

/**
 * 장비 타입을 ID로 변환
 */
export const getEquipmentTypeId = (type) => {
  const typeMap = {
    agv: 1,
    forklift: 2,
    conveyor: 3,
  }
  return typeMap[type] || 1
}

/**
 * 공장을 ID로 변환
 */
export const getFactoryId = (factory) => {
  const factoryMap = {
    factory1: 1,
    factory2: 2,
    factory3: 3,
  }
  return factoryMap[factory] || 1
}
