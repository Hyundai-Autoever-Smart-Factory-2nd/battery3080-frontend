## 🏗️ 프로젝트 구조

```
src/
├── main.js                 # 앱 엔트리 포인트
├── App.vue                 # 루트 컴포넌트
├── router/                 # 라우팅 설정
│   └── index.js
├── views/                  # 페이지 컴포넌트
│   ├── DashboardView.vue   # 대시보드 메인 페이지
│   ├── EquipmentListView.vue     # 장비 리스트 페이지
│   └── EquipmentDetailView.vue   # 장비 상세 페이지
├── components/             # 컴포넌트
│   ├── InfoTopBar.vue      # 공통 상단바
│   ├── dashboard/          # 대시보드 컴포넌트
│   │   ├── SideMenu.vue
│   │   ├── PerformanceCharts.vue
│   │   └── DataTable.vue
│   ├── equipmentList/      # 장비 리스트 컴포넌트
│   │   ├── FactorySelector.vue
│   │   ├── EquipmentStatusSection.vue
│   │   ├── EquipmentCard.vue
│   │   └── Pagination.vue
│   └── equipmentDetail/    # 장비 상세 컴포넌트
│       ├── EquipmentInfoCard.vue
│       ├── MovementInfoCard.vue
│       ├── NotificationLogCard.vue
│       ├── OperationChart.vue
│       └── UtilizationCharts.vue
├── composables/            # 재사용 로직 (Vue 3 Composition API)
│   ├── useDashboard.js     # 대시보드 상태 관리 & 비즈니스 로직
│   ├── useAutoRefresh.js   # 자동 갱신 로직
│   ├── useCharts.js        # 차트 관련 로직
│   ├── useEquipmentList.js # 장비 리스트 관리 로직
│   └── useMap.js          # 지도 관련 로직
├── data/                   # Mock 데이터 (임시, 나중에 API로 대체)
│   ├── dashboardData.js    # 대시보드 목업 데이터
│   └── equipmentData.js    # 장비 목업 데이터
├── api/                    # API 통신 관련 (백엔드 연동용)
│   ├── config.js          # axios 설정 및 인터셉터
│   └── dashboardApi.js    # 대시보드 API 호출 함수들
├── assets/                 # 정적 자원
│   ├── base.css
│   ├── main.css
│   └── logo.svg
└── stores/                 # 전역 상태 관리 (Pinia)
    └── counter.js
```

## 🎯 각 폴더의 역할

### 📁 **views/** - 페이지 컴포넌트

- 라우터와 직접 연결되는 페이지 단위 컴포넌트
- 여러 컴포넌트를 조합해서 화면 구성
- 비즈니스 로직은 최소화, composables 활용

### 🧩 **components/** - 재사용 컴포넌트

- 기능별로 폴더 분리 (`dashboard/`, `equipmentList/`, `equipmentDetail/`)
- 단일 책임 원칙: 하나의 명확한 역할만 수행
- props로 데이터 받아서 UI만 렌더링

### ⚡ **composables/** - 로직 분리 (Vue 3 핵심)

```javascript
// 🎯 목적: 비즈니스 로직을 컴포넌트에서 분리
// 🔄 재사용: 여러 컴포넌트에서 같은 로직 사용 가능
// 🧪 테스트: 로직을 독립적으로 테스트 가능

// 예시: useDashboard.js
export function useDashboard() {
  const data = ref({}) // 상태 관리
  const fetchData = async () => {} // 비즈니스 로직
  return { data, fetchData } // 컴포넌트에 제공
}
```

### 📊 **data/** - Mock 데이터

- 현재: 화면 개발용 임시 데이터
- 나중: 백엔드 API로 완전 대체 예정
- 실제 API 응답 구조와 동일하게 설계

### 🌐 **api/** - API 통신 (준비 완료)

- 현재: 주석 처리 (임시 데이터 사용 중)
- 나중: 백엔드(localhost:8080) 연동용
- axios 기반 HTTP 클라이언트 설정

## 🚀 개발 흐름

### 현재 상황 (Mock 데이터)

```
View → Composable → Data 폴더의 Mock 데이터
```

### 나중 상황 (API 연동)

```
View → Composable → API → 백엔드 서버
```

## 🔄 데이터 흐름

### 1. 대시보드 예시

```
DashboardView.vue (UI만)
    ↓ composable 사용
useDashboard.js (로직)
    ↓ 현재: mock 데이터
dashboardData.js
    ↓ 나중: API 호출
백엔드 서버 (localhost:8080)
```

### 2. 컴포넌트 간 데이터 전달

```
부모 컴포넌트 (View)
    ↓ props 전달
자식 컴포넌트 (Component)
    ↓ emit 이벤트
부모에서 이벤트 처리
```

## 📋 개발 단계

### ✅ 완료된 작업

- [x] Vue 3 + Vite 프로젝트 셋업
- [x] 라우터 설정 (대시보드, 장비 리스트, 장비 상세)
- [x] 컴포넌트 분리 및 구조화
- [x] Mock 데이터 기반 화면 구현
- [x] Composition API 기반 로직 분리

### 🚧 준비 완료 (사용 대기)

- [] API 통신 구조 (axios 설정)
- [] 백엔드 연동 준비 (주석 처리)

### 📝 향후 계획

- [ ] 백엔드 API 연동
  <!-- - [ ] 실시간 데이터 업데이트 (WebSocket) -->
  <!-- - [ ] 인증/권한 관리 -->
- [ ] 에러 처리 및 로딩 상태
- [ ] 성능 최적화

## 🛠️ 기술 스택

- **Vue 3**: Composition API
- **Vite**: 빌드 도구
- **Vue Router**: 라우팅
- **Axios**: HTTP 클라이언트 (준비됨)
- **Chart.js**: 차트 라이브러리
- **Leaflet**: 지도 라이브러리

## 💡 핵심 설계 원칙

1. **관심사 분리**: UI, 로직, 데이터를 명확히 분리
2. **재사용성**: 컴포넌트와 composables 재사용 극대화
3. **확장성**: 새로운 기능 추가가 쉬운 구조
4. **유지보수성**: 코드 변경 영향 범위 최소화
5. **API 준비**: 백엔드 연동을 위한 구조 미리 준비

---

📌 **이 아키텍처는 확장 가능하고 유지보수하기 쉬운 코드베이스를 목표로 설계되었습니다.**
