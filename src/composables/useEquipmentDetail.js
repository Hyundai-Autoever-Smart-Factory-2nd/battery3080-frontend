import { ref, onMounted } from 'vue'
import { equipmentApi } from '@/api/equipmentApi.js'
import { equipmentDetailMockData } from '@/data/equipmentData.js'

export function useEquipmentDetail(modelInfoId) {
  const equipmentData = ref({})
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * 장비 상세 정보 조회
   */
  async function fetchEquipmentDetail() {
    if (!modelInfoId.value) return

    isLoading.value = true
    error.value = null

    try {
      console.log(`장비 상세 정보 API 호출: equipmentId=${modelInfoId.value}`)

      const response = await equipmentApi.getEquipmentDetail(modelInfoId.value)

      if (response.data.success) {
        const data = response.data.data

        // 백엔드 응답을 프론트엔드 형식으로 변환
        equipmentData.value = {
          model_num: data.modelNum,
          battery: data.crate,
          cycle: data.cycle,
          distance: data.distance,
          from_location: data.fromLoc,
          to_location: data.toLoc,
          status: data.status,
          temp: data.tempLogs.map(([temp, time]) => [parseFloat(temp).toFixed(2), time]),
          run_count: data.runCount,
          wait_count: data.waitCount,
          load_count: data.loadCount,
          charge_count: data.chargeCount,
          cooling_count: data.coolingCount,
          total_count: data.totalCount,
          modelInfosId: data.modelInfosId,
        }

        console.log('장비 상세 정보 API 성공:', equipmentData.value)
      }
    } catch (err) {
      console.warn('장비 상세 정보 API 호출 실패, Mock 데이터 사용:', err)

      // API 실패 시 Mock 데이터 사용
      const mockData = equipmentDetailMockData[modelInfoId.value]
      if (mockData) {
        // Mock 데이터를 복사하여 실시간 변화 시뮬레이션
        equipmentData.value = {
          ...mockData,
          battery: Math.floor(Math.random() * 30) + 70, // 70-100 사이 랜덤 (자동 갱신 확인용)
          temp: mockData.temp.map(([temp, time]) => [
            temp + (Math.random() - 0.5) * 2, // 온도 ±1도 변화
            time,
          ]),
        }
        console.log('Mock 데이터 사용 (자동 갱신 시뮬레이션):', equipmentData.value)
      } else {
        // 기본 Mock 데이터
        equipmentData.value = {
          model_num: `AGV-${String(modelInfoId.value).padStart(3, '0')}`,
          battery: 75,
          cycle: 1000,
          distance: 10000,
          from_location: '창고 A구역',
          to_location: '창고 B구역',
          status: '운행중',
          temp: [
            [22.0, '2024-08-28 09:00'],
            [23.0, '2024-08-28 10:00'],
            [24.0, '2024-08-28 11:00'],
            [23.5, '2024-08-28 12:00'],
            [22.8, '2024-08-28 13:00'],
          ],
          run_count: 100,
          wait_count: 50,
          load_count: 25,
          charge_count: 10,
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  // 컴포넌트 마운트 시 데이터 로드
  onMounted(() => {
    fetchEquipmentDetail()
  })

  return {
    equipmentData,
    isLoading,
    error,
    fetchEquipmentDetail,
  }
}
