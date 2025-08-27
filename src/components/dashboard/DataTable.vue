<template>
  <div class="data-table">
    <h2>생산 현황</h2>

    <div class="table-row row-1">
      <div class="cell full-width">
        <div class="cell-header">배터리 경고</div>
        <div class="cell-content">
          <span class="number">{{ totalProduction.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <div class="table-row row-2">
      <div class="cell" v-for="item in row2Data" :key="item.id">
        <div class="cell-header">{{ item.title }}</div>
        <div class="cell-content">
          <span class="korean-text">{{ item.koreanText }}</span>
          <span class="number">{{ item.number.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <div class="table-row row-3">
      <div class="cell" v-for="item in row3Data" :key="item.id">
        <div class="cell-header">{{ item.title }}</div>
        <div class="cell-content">
          <span class="number">{{ item.number.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <div class="table-row row-4">
      <div class="cell" v-for="item in row4Data" :key="item.id">
        <div class="cell-header">{{ item.title }}</div>
        <div class="cell-content">
          <span class="korean-text">{{ item.koreanText }}</span>
          <span class="number">{{ item.number.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <div class="table-row row-5">
      <div class="cell" v-for="item in row5Data" :key="item.id">
        <div class="cell-header">{{ item.title }}</div>
        <div class="cell-content">
          <span class="korean-text">{{ item.koreanText }}</span>
          <span class="number">{{ item.number.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    totalProduction: {
      type: Number,
      required: true,
    },
    row2Data: {
      type: Array,
      required: true,
    },
    row3Data: {
      type: Array,
      required: true,
    },
    row4Data: {
      type: Array,
      required: true,
    },
    row5Data: {
      type: Array,
      required: true,
    },
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
