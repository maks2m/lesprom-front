import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView'
import BaguetteView from '../views/BaguetteView'
import CutterView from '../views/CutterView'
import WorkplaceView from '../views/WorkplaceView'
import EmployeeView from '../views/EmployeeView'
import UserView from '../views/UserView'
import RoleView from '../views/RoleView'
import PageNotFoundView from '../views/PageNotFoundView'

import EmployeeEditView from "@/components/EmployeeEditView";
import UserEditView from "@/components/UserEditView";
import WorkplaceEditView from "@/components/WorkplaceEditView";
import BaguetteEditView from "@/components/BaguetteEditView";
import CutterEditView from "@/components/CutterEditView";
import RoleEditView from "@/components/RoleEditView";
import OrderEditView from "@/components/OrderEditView";

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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/order/:id',
    name: 'order-edit',
    component: OrderEditView,
    meta: {
      requiresAuth: true
    }
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
    path: '/baguette/:id',
    name: 'baguette-edit',
    component: BaguetteEditView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cutter',
    name: 'cutter',
    component: CutterView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cutter/:id',
    name: 'cutter-edit',
    component: CutterEditView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workplace',
    name: 'workplace',
    component: WorkplaceView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workplace/:id',
    name: 'workplace-edit',
    component: WorkplaceEditView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/employee/:id',
    name: 'employee-edit',
    component: EmployeeEditView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:id',
    name: 'user-edit',
    component: UserEditView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/role',
    name: 'role',
    component: RoleView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/role/:id',
    name: 'role-edit',
    component: RoleEditView,
    meta: {
      requiresAuth: true
    }
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
    if (store.getters["authorization/isAuthenticated"]) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});
