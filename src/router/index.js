import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView'
import OrderTechnologistView from "@/views/OrderTechnologistView";
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
import TimeOfEmployeeOnOrdersEditView from "@/components/TimeOfEmployeeOnOrdersEditView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order-manager',
    name: 'order-manager',
    component: OrderView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/order/:id',
    name: 'order-edit',
    component: OrderEditView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/order-manager/:id/add-employees',
    name: 'order-manager-edit-add-employees',
    component: TimeOfEmployeeOnOrdersEditView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/order-technologist',
    name: 'order-technologist',
    component: OrderTechnologistView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/baguette',
    name: 'baguette',
    component: BaguetteView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/baguette/:id',
    name: 'baguette-edit',
    component: BaguetteEditView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/cutter',
    name: 'cutter',
    component: CutterView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/cutter/:id',
    name: 'cutter-edit',
    component: CutterEditView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/workplace',
    name: 'workplace',
    component: WorkplaceView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/workplace/:id',
    name: 'workplace-edit',
    component: WorkplaceEditView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/employee/:id',
    name: 'employee-edit',
    component: EmployeeEditView,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      requiresAdmin: true,
    }
  },
  {
    path: '/user/:id',
    name: 'user-edit',
    component: UserEditView,
    meta: {
      requiresAdmin: true,
    }
  },
  {
    path: '/role',
    name: 'role',
    component: RoleView,
    meta: {
      requiresAdmin: true,
    },
  },
  {
    path: '/role/:id',
    name: 'role-edit',
    component: RoleEditView,
    meta: {
      requiresAdmin: true,
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
  // to - откуда переходишь
  // from - куда переходишь
  // next - функция перехода
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters["authorization/isAuthenticated"] && store.getters["authorization/isAdminRole"]) {
      next();
    }
    //next("/");
  } else if (to.matched.some(record => record.meta.requiresUser)) {
    if (store.getters["authorization/isAuthenticated"] && store.getters["authorization/isUserRole"]) {
      next();
    }
    //next("/");
  } else {
    next();
  }
});
