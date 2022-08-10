import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView'
import BaguetteView from '../views/BaguetteView'
import CutterView from '../views/CutterView'
import WorkplaceView from '../views/WorkplaceView'
import EmployeeView from '../views/EmployeeView'
import UserView from '../views/UserView'
import RoleView from '../views/RoleView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/baguette',
    name: 'baguette',
    component: BaguetteView
  },
  {
    path: '/cutter',
    name: 'cutter',
    component: CutterView
  },
  {
    path: '/workplace',
    name: 'workplace',
    component: WorkplaceView
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/role',
    name: 'role',
    component: RoleView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
