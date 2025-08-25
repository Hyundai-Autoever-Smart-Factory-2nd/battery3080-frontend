<template>
  <div class="data-table">
    <h2>생산 현황</h2>

    <!-- 첫 번째 행 - 1개 컬럼 -->
    <div class="table-row row-1">
      <div class="cell full-width">
        <div class="cell-header">전체 생산 현황</div>
        <div class="cell-content">
          <span class="korean-text">총 생산량</span>
          <span class="number">{{ totalProduction.toLocaleString() }}</span>
          <span class="percentage">({{ totalProductionPercentage }}%)</span>
        </div>
      </div>
    </div>

    <!-- 두 번째 행 - 4개 컬럼 -->
    <div class="table-row row-2">
      <div class="cell" v-for="item in row2Data" :key="item.id">
        <div class="cell-header">{{ item.title }}</div>
        <div class="cell-content">
          <span class="korean-text">{{ item.koreanText }}</span>
          <span class="number">{{ item.number.toLocaleString() }}</span>
          <span class="percentage">({{ item.percentage }}%)</span>
        </div>
      </div>
    </div>

    <!-- 세 번째 행 - 3개 컬럼 -->
    <div class="table-row row-3">
      <div class="cell" v-for="item in row3Data" :key="item.id">
        <div class="cell-header">{{ item.title }}</div>
        <div class="cell-content">
          <span class="korean-text">{{ item.koreanText }}</span>
          <span class="number">{{ item.number.toLocaleString() }}</span>
          <span class="percentage">({{ item.percentage }}%)</span>
        </div>
      </div>
    </div>

    <!-- 네 번째 행 - 3개 컬럼 -->
    <div class="table-row row-4">
      <div class="cell" v-for="item in row4Data" :key="item.id">
        <div class="cell-header">{{ item.title }}</div>
        <div class="cell-content">
          <span class="korean-text">{{ item.koreanText }}</span>
          <span class="number">{{ item.number.toLocaleString() }}</span>
          <span class="percentage">({{ item.percentage }}%)</span>
        </div>
      </div>
    </div>

    <!-- 다섯 번째 행 - 3개 컬럼 -->
    <div class="table-row row-5">
      <div class="cell" v-for="item in row5Data" :key="item.id">
        <div class="cell-header">{{ item.title }}</div>
        <div class="cell-content">
          <span class="korean-text">{{ item.koreanText }}</span>
          <span class="number">{{ item.number.toLocaleString() }}</span>
          <span class="percentage">({{ item.percentage }}%)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  data() {
    return {
      totalProduction: 15800,
      totalProductionPercentage: 105.3,
      row2Data: [
        {
          id: 1,
          title: '라인 A',
          koreanText: '완료 수량',
          number: 4200,
          percentage: 98.5,
        },
        {
          id: 2,
          title: '라인 B',
          koreanText: '완료 수량',
          number: 3950,
          percentage: 92.8,
        },
        {
          id: 3,
          title: '라인 C',
          koreanText: '완료 수량',
          number: 4100,
          percentage: 96.2,
        },
        {
          id: 4,
          title: '라인 D',
          koreanText: '완료 수량',
          number: 3550,
          percentage: 88.7,
        },
      ],
      row3Data: [
        {
          id: 1,
          title: '불량품',
          koreanText: '총 불량 수량',
          number: 235,
          percentage: 1.5,
        },
        {
          id: 2,
          title: '재작업',
          koreanText: '재작업 수량',
          number: 89,
          percentage: 0.6,
        },
        {
          id: 3,
          title: '폐기품',
          koreanText: '폐기 수량',
          number: 12,
          percentage: 0.1,
        },
      ],
      row4Data: [
        {
          id: 1,
          title: '작업자',
          koreanText: '투입 인원',
          number: 24,
          percentage: 100.0,
        },
        {
          id: 2,
          title: '장비',
          koreanText: '가동 장비',
          number: 18,
          percentage: 94.7,
        },
        {
          id: 3,
          title: '대기시간',
          koreanText: '총 대기시간',
          number: 45,
          percentage: 2.3,
        },
      ],
      row5Data: [
        {
          id: 1,
          title: '원자재',
          koreanText: '소모량',
          number: 1580,
          percentage: 99.2,
        },
        {
          id: 2,
          title: '에너지',
          koreanText: '사용량',
          number: 2340,
          percentage: 87.5,
        },
        {
          id: 3,
          title: '효율성',
          koreanText: '전체 효율',
          number: 94,
          percentage: 94.0,
        },
      ],
    }
  },
}
</script>

<style scoped>
.data-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.data-table h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
  flex-shrink: 0;
}

.table-row {
  display: flex;
  gap: 10px;
  min-height: fit-content;
  flex-wrap: nowrap;
  flex: 1;
  max-height: calc((100% - 60px) / 5);
}

.cell {
  background: white;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3498db;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  flex: 1;
  min-width: 100px;
}

.cell:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.full-width {
  flex: 1;
  border-left-color: #e74c3c;
}

.row-2 .cell {
  border-left-color: #27ae60;
}

.row-3 .cell {
  border-left-color: #f39c12;
}

.row-4 .cell {
  border-left-color: #9b59b6;
}

.row-5 .cell {
  border-left-color: #1abc9c;
}

.cell-header {
  font-size: 0.9rem;
  font-weight: 600;
  color: #7f8c8d;
  margin-bottom: 10px;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 1px solid #ecf0f1;
}

.cell-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.korean-text {
  font-size: 0.85rem;
  color: #5d6d7e;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}

.number {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
}

.percentage {
  font-size: 0.9rem;
  color: #27ae60;
  font-weight: 600;
  text-align: center;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
  .table-row {
    flex-wrap: wrap;
  }

  .row-2 .cell {
    flex: 1 1 calc(50% - 7.5px);
  }
}

@media (max-width: 768px) {
  .cell {
    flex: 1 1 100%;
  }

  .row-2 .cell,
  .row-3 .cell,
  .row-4 .cell,
  .row-5 .cell {
    flex: 1 1 100%;
  }
}
</style>
