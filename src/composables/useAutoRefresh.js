import { ref, onMounted, onUnmounted } from 'vue'

export function useAutoRefresh(callback) {
  const refreshInterval = ref(30000) // 기본값 30초 (드롭다운으로 변경 가능)
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
      refreshTimer.value = setInterval(() => {
        callback && callback()
      }, refreshInterval.value)
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

  const updateRefreshInterval = (interval) => {
    refreshInterval.value = interval
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
