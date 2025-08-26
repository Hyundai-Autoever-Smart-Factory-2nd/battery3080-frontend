import { ref, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

export function useCharts() {
  const operationChart = ref(null)
  const utilizationChart = ref(null)
  const efficiencyChart = ref(null)

  const operationTimeData = ref({
    labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    data: [8.5, 9.2, 8.8, 7.5, 9.1, 8.9, 9.3, 8.7, 9.0],
  })

  const utilizationData = ref({
    active: 78,
    idle: 15,
    maintenance: 7,
  })

  const efficiencyData = ref({
    optimal: 85,
    suboptimal: 15,
  })

  const createOperationChart = (canvas) => {
    if (!canvas) return

    if (operationChart.value) {
      operationChart.value.destroy()
    }

    operationChart.value = new Chart(canvas, {
      type: 'line',
      data: {
        labels: operationTimeData.value.labels,
        datasets: [
          {
            label: '운영 시간 (시간)',
            data: operationTimeData.value.data,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            title: { display: true, text: '시간' },
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
          },
          y: {
            title: { display: true, text: '운영 시간 (시간)' },
            min: 0,
            max: 10,
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
          },
        },
      },
    })
  }

  const createUtilizationChart = (canvas) => {
    if (!canvas) return

    if (utilizationChart.value) {
      utilizationChart.value.destroy()
    }

    utilizationChart.value = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['가동 중', '대기', '점검'],
        datasets: [
          {
            data: [
              utilizationData.value.active,
              utilizationData.value.idle,
              utilizationData.value.maintenance,
            ],
            backgroundColor: ['#27ae60', '#f39c12', '#e74c3c'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
            },
          },
        },
      },
    })
  }

  const createEfficiencyChart = (canvas) => {
    if (!canvas) return

    if (efficiencyChart.value) {
      efficiencyChart.value.destroy()
    }

    efficiencyChart.value = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['최적 효율', '개선 필요'],
        datasets: [
          {
            data: [efficiencyData.value.optimal, efficiencyData.value.suboptimal],
            backgroundColor: ['#9b59b6', '#95a5a6'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
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
    operationTimeData,
    utilizationData,
    efficiencyData,
    createOperationChart,
    createUtilizationChart,
    createEfficiencyChart,
    destroyCharts,
  }
}
