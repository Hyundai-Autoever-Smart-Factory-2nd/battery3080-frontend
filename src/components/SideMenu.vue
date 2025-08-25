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

      <!-- 공장 선택 섹션 (물류 장비가 선택된 경우에만 표시) -->
      <div v-if="activeMenu !== 'dashboard'" class="factory-section">
        <div class="section-title">공장 선택</div>
        <div class="factory-buttons">
          <button
            v-for="factory in factoryList"
            :key="factory.id"
            class="factory-btn"
            :class="{ active: activeFactory === factory.id }"
            @click="selectFactory(factory.id)"
          >
            {{ factory.name }}
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      activeMenu: 'dashboard',
      activeFactory: 'factory1', // 기본값: 공장1
      equipmentList: [
        { id: 'agv', name: 'AGV' },
        { id: 'forklift', name: '지게차' },
        { id: 'conveyor', name: '컨베이어' },
      ],
      factoryList: [
        { id: 'factory1', name: '공장1' },
        { id: 'factory2', name: '공장2' },
        { id: 'factory3', name: '공장3' },
      ],
    }
  },
  computed: {
    menuWidth() {
      // 가장 긴 텍스트를 기준으로 동적 너비 계산
      const allTexts = [
        ...this.equipmentList.map((item) => item.name),
        ...this.factoryList.map((item) => item.name),
        '물류 장비',
        '공장 선택',
      ]
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
      } else if (currentPath.startsWith('/agv')) {
        this.activeMenu = 'agv'
      } else if (currentPath.startsWith('/forklift')) {
        this.activeMenu = 'forklift'
      } else if (currentPath.startsWith('/conveyor')) {
        this.activeMenu = 'conveyor'
      } else if (currentPath.startsWith('/crane')) {
        this.activeMenu = 'crane'
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

      // 장비 선택 시 해당 장비 리스트 페이지로 이동
      this.$router.push(`/${equipmentId}`)

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

.factory-section {
  margin-top: 20px;
  padding: 20px;
  border-top: 1px solid #34495e;
}

.factory-section .section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #bdc3c7;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
  border-bottom: 1px solid #34495e;
  padding-bottom: 8px;
}

.factory-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.factory-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.factory-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #3498db;
}

.factory-btn.active {
  background: #3498db;
  border-color: #3498db;
  color: white;
}
</style>
