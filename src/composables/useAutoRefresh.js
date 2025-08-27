import { ref, onUnmounted } from 'vue'

export function useAutoRefresh() {
  const refreshInterval = ref(30000)
  const refreshTimer = ref(null)
  const isAutoRefresh = ref(false)

  const startAutoRefresh = (callback) => {
    isAutoRefresh.value = true
    refreshTimer.value = setInterval(() => {
      callback()
      console.log(`데이터 갱신 - ${new Date().toLocaleTimeString()}`)
    }, refreshInterval.value)
  }

  const stopAutoRefresh = () => {
    if (refreshTimer.value) {
      clearInterval(refreshTimer.value)
      refreshTimer.value = null
    }
    isAutoRefresh.value = false
  }

  const updateRefreshInterval = (callback) => {
    stopAutoRefresh()
    if (refreshInterval.value > 0) {
      startAutoRefresh(callback)
    }
  }

  onUnmounted(() => {
    stopAutoRefresh()
  })

  return {
    refreshInterval,
    isAutoRefresh,
    startAutoRefresh,
    stopAutoRefresh,
    updateRefreshInterval,
  }
}
