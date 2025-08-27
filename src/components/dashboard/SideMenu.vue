<template>
  <div class="side-menu" :style="{ width: menuWidth + 'px' }">
    <div class="logo-section">
      <h2>Battery3080</h2>
    </div>

    <nav class="menu-nav">
      <ul>
        <li
          class="menu-item"
          :class="{ active: activeMenu === 'dashboard' }"
          @click="selectMenu('dashboard')"
        >
          <span class="menu-text">대시보드</span>
        </li>

        <!-- 물류 장비 섹션 -->
        <li class="menu-section">
          <span class="section-title">물류 장비</span>
        </li>

        <li
          v-for="equipment in equipmentList"
          :key="equipment.id"
          class="menu-item equipment-item"
          :class="{ active: activeMenu === equipment.id }"
          @click="selectEquipment(equipment.id)"
        >
          <span class="menu-text">{{ equipment.name }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { menuData } from '@/data/dashboardData.js'

export default {
  name: 'SideMenu',
  data() {
    return {
      activeMenu: 'dashboard',
      activeFactory: 'factory1', // 기본값: 공장1
      equipmentList: menuData.equipmentList,
      factoryList: menuData.factoryList,
    }
  },
  computed: {
    menuWidth() {
      // 가장 긴 텍스트를 기준으로 동적 너비 계산
      const allTexts = [...this.equipmentList.map((item) => item.name), '물류 장비']
      const maxLength = Math.max(...allTexts.map((text) => text.length))
      return Math.max(180, maxLength * 15 + 80) // 최소 180px, 문자당 15px + 여백 80px
    },
  },
  mounted() {
    // 페이지 로드 시 현재 라우트에 따라 activeMenu 설정
    this.updateActiveMenuFromRoute()
  },
  watch: {
    // 라우트 변경 감지
    $route() {
      this.updateActiveMenuFromRoute()
    },
  },
  methods: {
    updateActiveMenuFromRoute() {
      const currentPath = this.$route.path

      if (currentPath === '/') {
        this.activeMenu = 'dashboard'
      } else if (currentPath.startsWith('/equipment/agv')) {
        this.activeMenu = 'agv'
      } else if (currentPath.startsWith('/equipment/forklift')) {
        this.activeMenu = 'forklift'
      } else if (currentPath.startsWith('/equipment/conveyor')) {
        this.activeMenu = 'conveyor'
      }
    },
    selectMenu(menuId) {
      this.activeMenu = menuId
      if (menuId === 'dashboard') {
        this.$router.push('/')
        // 대시보드 선택 시 공장 선택을 기본값으로 리셋
        this.activeFactory = 'factory1'
      }
      this.$emit('menu-selected', {
        menu: menuId,
        factory: menuId === 'dashboard' ? null : this.activeFactory,
      })
    },
    selectEquipment(equipmentId) {
      this.activeMenu = equipmentId

      // 공장이 선택되지 않은 경우 기본값으로 설정
      if (!this.activeFactory) {
        this.activeFactory = 'factory1'
      }

      // 장비 선택 시 해당 장비 리스트 페이지로 이동 (동적 라우팅 사용)
      this.$router.push({ name: 'equipment-list', params: { type: equipmentId } })

      // 백엔드에 요청할 데이터 구조
      const requestData = {
        equipment: equipmentId,
        factory: this.activeFactory,
      }

      this.$emit('equipment-selected', requestData)
    },
    selectFactory(factoryId) {
      this.activeFactory = factoryId

      // 공장 변경 시 현재 선택된 장비와 함께 백엔드에 요청
      if (this.activeMenu !== 'dashboard') {
        const requestData = {
          equipment: this.activeMenu,
          factory: factoryId,
        }

        this.$emit('factory-changed', requestData)

        // 같은 페이지에서 데이터만 업데이트 (라우터는 변경하지 않음)
        this.$emit('data-refresh', requestData)
      }
    },
  },
}
</script>

<style scoped>
.side-menu {
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 0;
  transition: width 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  flex-shrink: 0;
  height: 100vh;
  box-sizing: border-box;
}

.logo-section {
  padding: 20px;
  border-bottom: 1px solid #34495e;
  text-align: center;
}

.logo-section h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.menu-nav {
  padding: 20px 0;
}

.menu-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  display: flex;
  align-items: center;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-left-color: #3498db;
}

.menu-item.active {
  background-color: rgba(52, 152, 219, 0.2);
  border-left-color: #3498db;
}

.menu-text {
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
}

/* 새로운 스타일 추가 */
.menu-section {
  padding: 10px 20px 5px 20px;
  margin-top: 20px;
}

.equipment-header {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.equipment-header:hover {
  background-color: #34495e;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #bdc3c7;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #34495e;
  padding-bottom: 8px;
}

.equipment-item {
  padding-left: 30px;
}
</style>
