import { ref, computed, watch, onMounted } from 'vue'
import { equipmentApi, getEquipmentTypeId, getFactoryId } from '@/api/equipmentApi.js'
import { equipmentMockData } from '@/data/equipmentData.js'

export function useEquipmentList(type, selectedFactory) {
  const goodCurrentPage = ref(1)
  const warningCurrentPage = ref(1)
  const dangerCurrentPage = ref(1)
  const itemsPerPage = ref(6)

  // API 응답 데이터
  const goodEquipment = ref([])
  const warningEquipment = ref([])
  const dangerEquipment = ref([])

  // 총 개수 (페이징용)
  const goodTotalCount = ref(0)
  const warningTotalCount = ref(0)
  const dangerTotalCount = ref(0)

  // 로딩 상태
  const isLoading = ref(false)
  const error = ref(null)

  // 총 페이지 수 계산
  const goodTotalPages = computed(() => Math.ceil(goodTotalCount.value / itemsPerPage.value))
  const warningTotalPages = computed(() => Math.ceil(warningTotalCount.value / itemsPerPage.value))
  const dangerTotalPages = computed(() => Math.ceil(dangerTotalCount.value / itemsPerPage.value))

  /**
   * API 응답 데이터를 화면용 데이터로 변환
   */
  function transformEquipmentData(equipmentList) {
    return equipmentList.map((equipment) => ({
      id: equipment.modelInfosId,
      modelNum: equipment.modelNum,
      crate: equipment.crate,
      status: equipment.status,
      temp: equipment.temp ? parseFloat(equipment.temp).toFixed(2) : null,
      equipmentId: equipment.equipmentId,
    }))
  }

  /**
   * 상태별 장비 데이터 조회
   */
  async function fetchEquipmentByStatus(status, page) {
    try {
      const equipmentId = getEquipmentTypeId(type.value)
      const factoryId = getFactoryId(selectedFactory.value)

      console.log(
        `API 호출: ${status} - 장비ID: ${equipmentId}, 공장ID: ${factoryId}, 페이지: ${page}`,
      )

      const response = await equipmentApi.getEquipmentList(
        equipmentId,
        factoryId,
        status,
        page - 1, // 백엔드는 0부터 시작
        itemsPerPage.value,
      )

      if (response.data.success) {
        const { totalCount, equipmentList } = response.data.data

        // 상태에 따라 데이터 업데이트
        if (status === 'good') {
          goodEquipment.value = transformEquipmentData(equipmentList)
          goodTotalCount.value = totalCount
        } else if (status === 'warning') {
          warningEquipment.value = transformEquipmentData(equipmentList)
          warningTotalCount.value = totalCount
        } else if (status === 'danger') {
          dangerEquipment.value = transformEquipmentData(equipmentList)
          dangerTotalCount.value = totalCount
        }
      }
    } catch (err) {
      console.warn(`${status} 장비 데이터 API 호출 실패, Mock 데이터 사용:`, err)

      // API 실패 시 Mock 데이터 사용
      const mockData = getEquipmentByStatusMock(status, page)
      if (status === 'good') {
        goodEquipment.value = mockData.data
        goodTotalCount.value = mockData.totalCount
      } else if (status === 'warning') {
        warningEquipment.value = mockData.data
        warningTotalCount.value = mockData.totalCount
      } else if (status === 'danger') {
        dangerEquipment.value = mockData.data
        dangerTotalCount.value = mockData.totalCount
      }
    }
  }

  /**
   * Mock 데이터 조회 (API 실패 시 사용)
   */
  function getEquipmentByStatusMock(status, page = 1) {
    const data = equipmentMockData[type.value]
    const rawData = data ? data[status] || [] : []

    // 페이징 처리
    const startIndex = (page - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    const paginatedData = rawData.slice(startIndex, endIndex)

    return {
      data: transformEquipmentData(paginatedData),
      totalCount: rawData.length,
    }
  }

  /**
   * 모든 상태의 장비 데이터 조회
   */
  async function fetchAllEquipmentData() {
    isLoading.value = true
    error.value = null

    try {
      // 3개 API 동시 호출
      await Promise.all([
        fetchEquipmentByStatus('good', goodCurrentPage.value),
        fetchEquipmentByStatus('warning', warningCurrentPage.value),
        fetchEquipmentByStatus('danger', dangerCurrentPage.value),
      ])
    } catch (err) {
      error.value = '장비 데이터를 불러오는데 실패했습니다.'
      console.error('장비 데이터 조회 실패:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 페이지 리셋
   */
  function resetPages() {
    goodCurrentPage.value = 1
    warningCurrentPage.value = 1
    dangerCurrentPage.value = 1
  }

  // 장비 타입이나 공장이 변경될 때 데이터 새로고침
  watch([type, selectedFactory], () => {
    resetPages()
    fetchAllEquipmentData()
  })

  // 페이지 변경 시 해당 상태의 데이터만 새로고침
  watch(goodCurrentPage, (newPage) => {
    fetchEquipmentByStatus('good', newPage)
  })

  watch(warningCurrentPage, (newPage) => {
    fetchEquipmentByStatus('warning', newPage)
  })

  watch(dangerCurrentPage, (newPage) => {
    fetchEquipmentByStatus('danger', newPage)
  })

  // 컴포넌트 마운트 시 초기 데이터 로드
  onMounted(() => {
    fetchAllEquipmentData()
  })

  return {
    // 페이지 상태
    goodCurrentPage,
    warningCurrentPage,
    dangerCurrentPage,
    itemsPerPage,

    // 장비 데이터
    goodEquipment,
    warningEquipment,
    dangerEquipment,

    // 페이징 정보
    goodTotalPages,
    warningTotalPages,
    dangerTotalPages,
    goodTotalCount,
    warningTotalCount,
    dangerTotalCount,

    // 상태
    isLoading,
    error,

    // 함수
    resetPages,
    fetchAllEquipmentData,
  }
}
