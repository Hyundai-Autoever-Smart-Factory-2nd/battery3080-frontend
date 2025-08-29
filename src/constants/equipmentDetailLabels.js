// 장비 상세 뷰 API key → 한글 라벨 매핑
export const EQUIPMENT_DETAIL_LABELS = {
  // 장비 정보 관련
  model_num: '모델 번호',
  battery: '배터리 잔량',
  cycle: '배터리 사이클',
  distance: '누적거리',

  // 현재 작업 상태 관련
  status: '현재 작업 상태',
  from_location: '출발지',
  to_location: '도착지',

  // 온도 변화량 관련
  temp: '온도 변화량',
  temperature: '온도',
  time: '시간',

  // 금일 가동률 관련
  run_count: '운행 횟수',
  wait_count: '대기 횟수',
  load_count: '적재 횟수',
  charge_count: '충전 횟수',
  cooling_count: '냉각 횟수',
  total_count: '총 작업 횟수',

  // 가동률 계산용 라벨
  operation_rate: '전체 가동률',
  battery_usage_rate: '배터리 사용 비중',
  battery_charge_rate: '배터리 충전 비중',

  // 작업 상태별 라벨
  운행중: '가동',
  대기중: '대기',
  적재중: '적재',
  충전중: '충전',
  점검필요: '점검 필요',
  긴급정지: '긴급 정지',

  // 카드 제목
  equipment_info: '장비 정보',
  current_status: '현재 작업 상태',
  temperature_trend: '온도 변화량',
  daily_utilization: '금일 가동률',
  notification_log: '알림 로그',
}

// 온도 단위 포맷팅
export const formatTemperature = (temp) => `${temp}°C`

// 거리 단위 포맷팅
export const formatDistance = (distance) => {
  if (!distance) return '0 km'
  const distanceNum = parseFloat(distance)
  return distanceNum >= 1000
    ? `${(distanceNum / 1000).toFixed(1)} km`
    : `${Math.round(distanceNum)} m`
}

// 사이클 단위 포맷팅
export const formatCycle = (cycle) => `${cycle || 0}회`

// 배터리 퍼센트 포맷팅
export const formatBattery = (battery) => `${battery || 0}%`
