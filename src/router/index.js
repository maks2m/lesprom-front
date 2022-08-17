import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView'
import BaguetteView from '../views/BaguetteView'
import CutterView from '../views/CutterView'
import WorkplaceView from '../views/WorkplaceView'
import EmployeeView from '../views/EmployeeView'
import UserView from '../views/UserView'
import RoleView from '../views/RoleView'
import PageNotFoundView from '../views/PageNotFoundView'

import EditView from "@/views/EditView";

import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
  },
  {
    path: '/baguette',
    name: 'baguette',
    component: BaguetteView,
    meta: {
      requiresAuth: true
    }
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
    path: '/user/:id',
    name: 'edit-user',
    component: EditView
  },
  {
    path: '/role',
    name: 'role',
    component: RoleView
  },
  //  всегда в конце
  {
    path: '/:any(.*)',
    component: PageNotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
