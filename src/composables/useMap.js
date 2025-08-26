import { ref, onUnmounted } from 'vue'
import L from 'leaflet'

export function useMap() {
  const map = ref(null)

  const initMap = (containerId) => {
    // 기존 지도가 있다면 먼저 파괴
    if (map.value) {
      map.value.remove()
      map.value = null
    }

    const mapContainer = document.getElementById(containerId)
    if (mapContainer && !map.value) {
      // 서울 시청 좌표를 기본으로 설정
      map.value = L.map(containerId).setView([37.5665, 126.978], 15)

      // OpenStreetMap 타일 레이어 추가
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map.value)

      // AGV 위치 마커 추가
      const agvIcon = L.divIcon({
        className: 'agv-marker',
        html: '<div style="background: #e74c3c; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })

      L.marker([37.5665, 126.978], { icon: agvIcon })
        .addTo(map.value)
        .bindPopup('AGV-001 현재 위치')
        .openPopup()
    }
  }

  const destroyMap = () => {
    if (map.value) {
      map.value.remove()
      map.value = null
    }
  }

  onUnmounted(() => {
    destroyMap()
  })

  return {
    map,
    initMap,
    destroyMap,
  }
}
