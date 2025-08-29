<template>
  <div class="equipment-list-container">
    <SideMenu class="sidebar" />
    <div class="main-content">
      <!-- 상단 정보 영역 -->
      <InfoTopBar
        :title="`${equipmentTypeLabel} 관리`"
        :current-date-time="currentDateTime"
        :manager-name="managerName"
        :refresh-interval="refreshInterval"
        :is-auto-refresh="isAutoRefresh"
        :show-back-button="false"
        @update-refresh-interval="handleRefreshIntervalUpdate"
      />

      <!-- 공장 선택 -->
      <FactorySelector v-model:selectedFactory="selectedFactory" :factory-list="factoryList" />

      <!-- 에러 메시지 표시 -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <!-- 상태별 장비 리스트 -->
      <div class="status-sections">
        <EquipmentStatusSection
          status="good"
          :equipment="goodEquipment"
          v-model:currentPage="goodCurrentPage"
          :items-per-page="itemsPerPage"
          :total-pages="goodTotalPages"
          :total-count="goodTotalCount"
          :is-loading="isLoading"
          :equipment-type="type"
          @equipment-select="goToDetail"
        />
        <EquipmentStatusSection
          status="warning"
          :equipment="warningEquipment"
          v-model:currentPage="warningCurrentPage"
          :items-per-page="itemsPerPage"
          :total-pages="warningTotalPages"
          :total-count="warningTotalCount"
          :is-loading="isLoading"
          :equipment-type="type"
          @equipment-select="goToDetail"
        />
        <EquipmentStatusSection
          status="danger"
          :equipment="dangerEquipment"
          v-model:currentPage="dangerCurrentPage"
          :items-per-page="itemsPerPage"
          :total-pages="dangerTotalPages"
          :total-count="dangerTotalCount"
          :is-loading="isLoading"
          :equipment-type="type"
          @equipment-select="goToDetail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import SideMenu from '@/components/dashboard/SideMenu.vue'
import InfoTopBar from '@/components/InfoTopBar.vue'
import FactorySelector from '@/components/equipmentList/FactorySelector.vue'
import EquipmentStatusSection from '@/components/equipmentList/EquipmentStatusSection.vue'
import { useAutoRefresh } from '@/composables/useAutoRefresh.js'
import { useEquipmentList } from '@/composables/useEquipmentList.js'
import { factoryList } from '@/data/equipmentData.js'

export default {
  name: 'EquipmentListView',
  components: {
    SideMenu,
    InfoTopBar,
    FactorySelector,
    EquipmentStatusSection,
  },
  props: ['type'],
  setup(props) {
    const router = useRouter()
    const selectedFactory = ref('factory1')
    const equipmentType = computed(() => props.type)

    // 자동 갱신 관련
    const {
      currentDateTime,
      refreshInterval,
      isAutoRefresh,
      startAutoRefresh,
      updateRefreshInterval,
    } = useAutoRefresh(() => {
      console.log('장비 데이터 갱신 중...')
      fetchAllEquipmentData() // API 기반 데이터 새로고침
    })

    // 장비 관리 관련
    const {
      goodCurrentPage,
      warningCurrentPage,
      dangerCurrentPage,
      itemsPerPage,
      goodEquipment,
      warningEquipment,
      dangerEquipment,
      goodTotalPages,
      warningTotalPages,
      dangerTotalPages,
      goodTotalCount,
      warningTotalCount,
      dangerTotalCount,
      isLoading,
      error,
      resetPages,
      fetchAllEquipmentData,
    } = useEquipmentList(equipmentType, selectedFactory)

    // 공장 변경 시 페이지 리셋
    watch(selectedFactory, () => {
      resetPages()
    })

    const equipmentTypeLabel = computed(() => {
      const typeMap = {
        agv: 'AGV',
        forklift: '지게차',
        conveyor: '컨베이어',
      }
      return typeMap[props.type] || props.type
    })

    const managerName = ref('홍길동')

    const handleRefreshIntervalUpdate = (value) => {
      updateRefreshInterval(parseInt(value))
    }

    const goToDetail = (id) => {
      router.push({ name: 'equipment-detail', params: { type: props.type, id } })
    }

    // 기본 자동 갱신 시작
    startAutoRefresh()

    return {
      selectedFactory,
      factoryList,
      equipmentTypeLabel,
      currentDateTime,
      managerName,
      refreshInterval,
      isAutoRefresh,
      handleRefreshIntervalUpdate,
      goodCurrentPage,
      warningCurrentPage,
      dangerCurrentPage,
      itemsPerPage,
      goodEquipment,
      warningEquipment,
      dangerEquipment,
      goodTotalPages,
      warningTotalPages,
      dangerTotalPages,
      goodTotalCount,
      warningTotalCount,
      dangerTotalCount,
      isLoading,
      error,
      goToDetail,
    }
  },
}
</script>

<style scoped>
.equipment-list-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.sidebar {
  flex-shrink: 0;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.status-sections {
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: calc(100vh - 280px);
  padding: 0 10px;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px 16px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
}
</style>
