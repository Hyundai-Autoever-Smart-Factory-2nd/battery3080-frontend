import { ref, onMounted, onUnmounted } from 'vue'

export function useAutoRefresh(callback) {
  const refreshInterval = ref(30) // 기본값 30초 (화면 표시용 - 초 단위)
  const isAutoRefresh = ref(true)
  const refreshTimer = ref(null)

  // 현재 시간 관리
  const currentDateTime = ref('')
  let dateTimeTimer = null

  // 시간 갱신 함수
  const updateDateTime = () => {
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
    currentDateTime.value = now.toLocaleString('ko-KR', options)
  }

  // 자동 갱신 타이머 관리
  const startAutoRefresh = () => {
    stopAutoRefresh()
    if (refreshInterval.value > 0) {
      isAutoRefresh.value = true
      const intervalMs = refreshInterval.value * 1000 // 초를 밀리초로 변환
      refreshTimer.value = setInterval(() => {
        callback && callback()
      }, intervalMs)
      console.log(`자동 갱신 시작: ${refreshInterval.value}초 간격`)
    } else {
      isAutoRefresh.value = false
    }
  }

  const stopAutoRefresh = () => {
    if (refreshTimer.value) {
      clearInterval(refreshTimer.value)
      refreshTimer.value = null
    }
    isAutoRefresh.value = false
  }

  const updateRefreshInterval = (interval, newCallback = null) => {
    console.log('updateRefreshInterval 호출:', interval, typeof interval)

    // 숫자로 변환
    const numInterval = typeof interval === 'number' ? interval : parseInt(interval)

    if (isNaN(numInterval)) {
      console.error('유효하지 않은 간격:', interval)
      return
    }

    refreshInterval.value = numInterval // 초 단위로 저장

    // 새로운 콜백이 제공되면 업데이트
    if (newCallback) {
      callback = newCallback
    }

    startAutoRefresh()
  }

  // 라이프사이클 관리
  onMounted(() => {
    updateDateTime()
    dateTimeTimer = setInterval(updateDateTime, 1000)
    startAutoRefresh()
  })

  onUnmounted(() => {
    if (dateTimeTimer) clearInterval(dateTimeTimer)
    stopAutoRefresh()
  })

  return {
    currentDateTime,
    refreshInterval,
    isAutoRefresh,
    startAutoRefresh,
    updateRefreshInterval,
  }
}
