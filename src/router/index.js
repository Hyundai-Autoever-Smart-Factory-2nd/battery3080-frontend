import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import EquipmentListView from '../views/EquipmentListView.vue'
import EquipmentDetailView from '../views/EquipmentDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/equipment/:type',
      name: 'equipment-list',
      component: EquipmentListView,
      props: true,
    },
    {
      path: '/equipment/:type/:id',
      name: 'equipment-detail',
      component: EquipmentDetailView,
      props: true,
    },
  ],
})

export default router
