import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    // 물류 장비별 라우트
    // 동적 장비 라우트
    {
      path: '/equipment/:type',
      name: 'equipment-list',
      component: () => import('../views/EquipmentListView.vue'),
      props: true,
    },
    {
      path: '/equipment/:type/:id',
      name: 'equipment-detail',
      component: () => import('../views/EquipmentDetailView.vue'),
      props: true,
    },
  ],
})

export default router
