// 대시보드 관련 데이터

// 생산 현황 데이터
export const productionData = {
  // 총 생산량 (배터리 경고 셀에 표시)
  totalProduction: 15800,

  // 라인별 생산량 (2번째 행)
  lineProduction: [
    {
      id: 1,
      title: '라인 A',
      number: 4200,
    },
    {
      id: 2,
      title: '라인 B',
      number: 3950,
    },
    {
      id: 3,
      title: '라인 C',
      number: 4100,
    },
    {
      id: 4,
      title: '라인 D',
      number: 3550,
    },
  ],

  // 품질 관련 데이터 (3번째 행)
  qualityData: [
    {
      id: 1,
      title: '불량품',
      koreanText: '총 불량 수량',
      number: 235,
    },
    {
      id: 2,
      title: '재작업',
      koreanText: '재작업 수량',
      number: 89,
    },
    {
      id: 3,
      title: '폐기품',
      koreanText: '폐기 수량',
      number: 12,
    },
  ],

  // 운영 관련 데이터 (4번째 행)
  operationData: [
    {
      id: 1,
      title: '작업자',
      koreanText: '투입 인원',
      number: 24,
    },
    {
      id: 2,
      title: '장비',
      koreanText: '가동 장비',
      number: 18,
    },
    {
      id: 3,
      title: '대기시간',
      koreanText: '총 대기시간',
      number: 45,
    },
  ],

  // 자원 관련 데이터 (5번째 행)
  resourceData: [
    {
      id: 1,
      title: '원자재',
      koreanText: '소모량',
      number: 1580,
    },
    {
      id: 2,
      title: '에너지',
      koreanText: '사용량',
      number: 2340,
    },
    {
      id: 3,
      title: '효율성',
      koreanText: '전체 효율',
      number: 94,
    },
  ],
}

// 성과 차트 데이터
export const performanceData = {
  // 달성률 데이터
  achievement: {
    target: 1000, // 목표 수량
    achieved: 999, // 달성 수량
  },

  // 결함률 데이터
  defect: {
    production: 2000, // 생산 수량
    defective: 50, // 결함 수량 (50/2000 = 2.5%)
  },
}

// 사이드 메뉴 데이터
export const menuData = {
  // 장비 목록
  equipmentList: [
    { id: 'agv', name: 'AGV' },
    { id: 'forklift', name: '지게차' },
    { id: 'conveyor', name: '컨베이어' },
  ],

  // 공장 목록
  factoryList: [
    { id: 'factory1', name: '공장1' },
    { id: 'factory2', name: '공장2' },
    { id: 'factory3', name: '공장3' },
  ],
}

// 대시보드 설정 데이터
export const dashboardConfig = {
  // 자동 갱신 간격 옵션 (초)
  refreshIntervals: [10, 30, 60, 300], // 10초, 30초, 1분, 5분

  // 기본 자동 갱신 간격
  defaultRefreshInterval: 30,

  // 차트 색상 설정
  chartColors: {
    achievement: '#27ae60', // 달성률 - 녹색
    defect: '#e74c3c', // 결함률 - 빨간색
    lineA: '#27ae60', // 라인 A - 녹색
    lineB: '#27ae60', // 라인 B - 녹색
    lineC: '#27ae60', // 라인 C - 녹색
    lineD: '#27ae60', // 라인 D - 녹색
    quality: '#f39c12', // 품질 - 주황색
    operation: '#9b59b6', // 운영 - 보라색
    resource: '#1abc9c', // 자원 - 청록색
    warning: '#e74c3c', // 경고 - 빨간색
  },

  // 페이지 타이틀
  pageTitle: 'Battery3080 스마트 팩토리 대시보드',
}

// 통합 대시보드 데이터 (백엔드 API 응답 형태)
export const dashboardApiResponse = {
  production: productionData,
  performance: performanceData,
  timestamp: new Date().toISOString(),
  status: 'success',
}
