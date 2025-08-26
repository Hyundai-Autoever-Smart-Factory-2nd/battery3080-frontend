import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { equipmentMockData } from '@/data/equipmentData.js'

export function useEquipmentList(type, selectedFactory) {
  const goodCurrentPage = ref(1)
  const warningCurrentPage = ref(1)
  const dangerCurrentPage = ref(1)
  const itemsPerPage = ref(6)

  // 상태별 장비 데이터
  const goodEquipment = computed(() => getEquipmentByStatus('good'))
  const warningEquipment = computed(() => getEquipmentByStatus('warning'))
  const dangerEquipment = computed(() => getEquipmentByStatus('danger'))

  // 페이징 처리된 데이터
  const paginatedGoodEquipment = computed(() =>
    getPaginatedData(goodEquipment.value, goodCurrentPage.value),
  )
  const paginatedWarningEquipment = computed(() =>
    getPaginatedData(warningEquipment.value, warningCurrentPage.value),
  )
  const paginatedDangerEquipment = computed(() =>
    getPaginatedData(dangerEquipment.value, dangerCurrentPage.value),
  )

  // 총 페이지 수
  const goodTotalPages = computed(() => Math.ceil(goodEquipment.value.length / itemsPerPage.value))
  const warningTotalPages = computed(() =>
    Math.ceil(warningEquipment.value.length / itemsPerPage.value),
  )
  const dangerTotalPages = computed(() =>
    Math.ceil(dangerEquipment.value.length / itemsPerPage.value),
  )

  function getEquipmentByStatus(status) {
    const data = equipmentMockData[type.value]
    return data ? data[status] || [] : []
  }

  function getPaginatedData(data, currentPage) {
    const start = (currentPage - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return data.slice(start, end)
  }

  function resetPages() {
    goodCurrentPage.value = 1
    warningCurrentPage.value = 1
    dangerCurrentPage.value = 1
  }

  return {
    goodCurrentPage,
    warningCurrentPage,
    dangerCurrentPage,
    itemsPerPage,
    goodEquipment,
    warningEquipment,
    dangerEquipment,
    paginatedGoodEquipment,
    paginatedWarningEquipment,
    paginatedDangerEquipment,
    goodTotalPages,
    warningTotalPages,
    dangerTotalPages,
    resetPages,
  }
}
