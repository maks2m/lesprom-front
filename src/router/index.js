import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView'
import OrderTechnologistView from "@/views/OrderTechnologistView";
import OrderWorkplaceView from "@/views/OrderWorkplaceView";
import BaguetteView from '../views/BaguetteView'
import CutterView from '../views/CutterView'
import WorkplaceView from '../views/WorkplaceView'
import EmployeeView from '../views/EmployeeView'
import UserView from '../views/UserView'
import RoleView from '../views/RoleView'
import PageNotFoundView from '../views/PageNotFoundView'
import TestView from "@/views/TestView";

import EmployeeEditView from "@/components/EmployeeEditView";
import UserEditView from "@/components/UserEditView";
import WorkplaceEditView from "@/components/WorkplaceEditView";
import BaguetteEditView from "@/components/BaguetteEditView";
import CutterEditView from "@/components/CutterEditView";
import RoleEditView from "@/components/RoleEditView";
import OrderEditView from "@/components/OrderEditView";
import OrderWatchView from "@/components/OrderWatchView";
import TechnologicalProcessEditView from "@/components/TechnologicalProcessEditView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      notRequires: true,
    }
  },
  {
    path: '/order-manager',
    name: 'order-manager',
    component: OrderView,
    meta: {
      requiresManager: true,
    }
  },
  {
    path: '/order/:id/order-edit',
    name: 'order-edit',
    component: OrderEditView,
    meta: {
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/order/:id/add-employees',
    name: 'order-add-employees', //order-manager-edit-add-employees
    component: TechnologicalProcessEditView,
    meta: {
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/order-technologist',
    name: 'order-technologist',
    component: OrderTechnologistView,
    meta: {
      requiresTechnolog: true,
    }
  },
  {
    path: '/order-workplace',
    name: 'order-workplace',
    component: OrderWorkplaceView,
    meta: {
      requiresUser: true,
    }
  },
  {
    path: '/order-workplace/:id',
    name: 'order-view',
    component: OrderWatchView,
    meta: {
      requiresUser: true,
    }
  },
  {
    path: '/baguette',
    name: 'baguette',
    component: BaguetteView,
    meta: {
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/baguette/:id',
    name: 'baguette-edit',
    component: BaguetteEditView,
    meta: {
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/cutter',
    name: 'cutter',
    component: CutterView,
    meta: {
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/cutter/:id',
    name: 'cutter-edit',
    component: CutterEditView,
    meta: {
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/workplace',
    name: 'workplace',
    component: WorkplaceView,
    meta: {
      requiresUser: true,
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/workplace/:id',
    name: 'workplace-edit',
    component: WorkplaceEditView,
    meta: {
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView,
    meta: {
      requiresUser: true,
      requiresManager: true,
      requiresTechnolog: true,
    }
  },
  {
    path: '/employee/:id',
    name: 'employee-edit',
    component: EmployeeEditView,
    meta: {
      requiresManager: true,
      requiresTechnolog: true,
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
  {
    path: '/test',
    name: 'test',
    component: TestView,
    meta: {
      requiresAdmin: true,
    }
  },
  //  всегда в конце
  {
    path: '/:any(.*)',
    component: PageNotFoundView,
    meta: {
      notRequires: true,
    }
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
  if (to.matched.some(record => record.meta.requiresAdmin) && store.getters["authorization/isAuthenticated"] && store.getters["authorization/isAdminRole"]) {
    // console.log('requiresAdmin')
    next();
  } else if (to.matched.some(record => record.meta.requiresManager) && store.getters["authorization/isAuthenticated"] && store.getters["authorization/isManagerRole"]) {
    // console.log('requiresManager')
    next();
  } else if (to.matched.some(record => record.meta.requiresTechnolog) && store.getters["authorization/isAuthenticated"] && store.getters["authorization/isTechnologRole"]) {
    // console.log('requiresTechnolog')
    next();
  } else if (to.matched.some(record => record.meta.requiresUser) && store.getters["authorization/isAuthenticated"] && store.getters["authorization/isUserRole"]) {
    // console.log('requiresUser')
    next();
  } else if (to.matched.some(record => record.meta.notRequires)) {
    // console.log('notRequires')
    next();
  }
});
