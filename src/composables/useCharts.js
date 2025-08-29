import { ref, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

export function useCharts() {
  const operationChart = ref(null)
  const utilizationChart = ref(null)
  const efficiencyChart = ref(null)

  // 온도 변화량 데이터 (백엔드에서 받아온 tempLogs 사용)
  const temperatureDa
  a = ref({
    labels: [],
    data: [],
  })

  // 가동률 데이터 (백엔드의 각종 count 데이터 사용)
  const utilizationData = ref({
    run: 0, // 운행
    wait: 0, // 대기
    charge: 0, // 충전
    cooling: 0, // 냉각
  })

  const batteryData = ref({
    charge: 90, // 충전된 비율
    used: 10, // 사용된 비율
  })

  const createOperationChart = (canvas, tempLogs = []) => {
    if (!canvas) return

    if (operationChart.value) {
      operationChart.value.destroy()
    }

    // 온도 로그 데이터 처리
    const labels = []
    const temperatures = []

    console.log('온도 데이터 처리:', tempLogs)

    if (tempLogs && tempLogs.length > 0) {
      // 데이터를 시간순으로 정렬 (오래된 것부터)
      const sortedLogs = [...tempLogs].sort((a, b) => new Date(a[1]) - new Date(b[1]))

      sortedLogs.forEach(([temp, time]) => {
        // 시간만 추출 (HH:MM 형식)
        const timeStr = new Date(time).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        labels.push(timeStr)
        temperatures.push(parseFloat(temp))
      })

      console.log('처리된 라벨:', labels)
      console.log('처리된 온도:', temperatures)
    } else {
      // 기본 데이터
      labels.push(...['10:18', '10:19', '10:20', '10:21', '10:22'])
      temperatures.push(...[29.5, 29.8, 30.1, 30.4, 30.2])
      console.log('기본 데이터 사용')
    }

    operationChart.value = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels, // 정렬된 순서대로 표시
        datasets: [
          {
            label: '온도 (°C)',
            data: temperatures,
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#e74c3c',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: '시간',
              font: { size: 12 },
            },
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            ticks: { font: { size: 10 } },
          },
          y: {
            title: {
              display: true,
              text: '온도 (°C)',
              font: { size: 12 },
            },
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            ticks: {
              font: { size: 10 },
              callback: function (value) {
                return value.toFixed(1) + '°C'
              },
            },
          },
        },
      },
    })
  }

  const createUtilizationChart = (canvas, equipmentData = {}) => {
    if (!canvas) return

    if (utilizationChart.value) {
      utilizationChart.value.destroy()
    }

    // 백엔드 데이터에서 각 작업 횟수 추출
    const runCount = equipmentData.run_count || 420
    const waitCount = equipmentData.wait_count || 150
    const chargeCount = equipmentData.charge_count || 210
    const coolingCount = equipmentData.cooling_count || 207

    console.log('가동률 데이터:', { runCount, waitCount, chargeCount, coolingCount })

    // 전체 횟수 계산
    const totalCount = runCount + waitCount + chargeCount + coolingCount

    // 각 작업의 퍼센티지 계산
    const runPercent = totalCount > 0 ? ((runCount / totalCount) * 100).toFixed(1) : 0
    const waitPercent = totalCount > 0 ? ((waitCount / totalCount) * 100).toFixed(1) : 0
    const chargePercent = totalCount > 0 ? ((chargeCount / totalCount) * 100).toFixed(1) : 0
    const coolingPercent = totalCount > 0 ? ((coolingCount / totalCount) * 100).toFixed(1) : 0

    console.log('가동률 퍼센티지:', { runPercent, waitPercent, chargePercent, coolingPercent })

    utilizationChart.value = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['운행', '대기', '충전', '냉각'],
        datasets: [
          {
            data: [runPercent, waitPercent, chargePercent, coolingPercent],
            backgroundColor: ['#27ae60', '#f39c12', '#3498db', '#9b59b6'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 12,
              font: {
                size: 14,
                weight: 'bold',
              },
              generateLabels: function (chart) {
                const data = chart.data
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const dataset = data.datasets[0]
                    const value = dataset.data[i]
                    return {
                      text: `${label}: ${value}%`,
                      fillStyle: dataset.backgroundColor[i],
                      strokeStyle: dataset.backgroundColor[i],
                      pointStyle: 'circle',
                      hidden: false,
                      index: i,
                    }
                  })
                }
                return []
              },
            },
          },
        },
      },
    })
  }

  const createEfficiencyChart = (canvas, equipmentData = {}) => {
    if (!canvas) return

    if (efficiencyChart.value) {
      efficiencyChart.value.destroy()
    }

    // 충전 점유율 계산 (chargeCount / totalCount)
    const totalCount = equipmentData.total_count || 1000
    const chargeCount = equipmentData.charge_count || 200
    const chargeRatio = totalCount > 0 ? ((chargeCount / totalCount) * 100).toFixed(1) : 0
    const otherRatio = (100 - parseFloat(chargeRatio)).toFixed(1)

    console.log('충전 점유율 데이터:', { totalCount, chargeCount, chargeRatio, otherRatio })

    efficiencyChart.value = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['충전율', '가동율'],
        datasets: [
          {
            data: [chargeRatio, otherRatio],
            backgroundColor: ['#3498db', '#95a5a6'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 12,
              font: {
                size: 14,
                weight: 'bold',
              },
              generateLabels: function (chart) {
                const data = chart.data
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const dataset = data.datasets[0]
                    const value = dataset.data[i]
                    return {
                      text: `${label}: ${value}%`,
                      fillStyle: dataset.backgroundColor[i],
                      strokeStyle: dataset.backgroundColor[i],
                      pointStyle: 'circle',
                      hidden: false,
                      index: i,
                    }
                  })
                }
                return []
              },
            },
          },
        },
      },
    })
  }

  const destroyCharts = () => {
    if (operationChart.value) operationChart.value.destroy()
    if (utilizationChart.value) utilizationChart.value.destroy()
    if (efficiencyChart.value) efficiencyChart.value.destroy()
  }

  onUnmounted(() => {
    destroyCharts()
  })

  return {
    operationChart,
    utilizationChart,
    efficiencyChart,
    temperatureData,
    utilizationData,
    batteryData,
    createOperationChart,
    createUtilizationChart,
    createEfficiencyChart,
    destroyCharts,
  }
}
