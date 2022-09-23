import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

import HomeView from '@/views/HomeView.vue'
import OrderManagerView from '@/views/order/manager/OrderManagerView'
import OrderTechnologistView from "@/views/order/technolog/OrderTechnologistView";
import OrderWorkplaceView from "@/views/order/workplace/OrderWorkplaceView";
import BaguetteView from '@/views/baguette/BaguetteView'
import CutterView from '@/views/cutter/CutterView'
import WorkplaceView from '@/views/workplace/WorkplaceView'
import EmployeeView from '@/views/employee/EmployeeView'
import UserView from '@/views/user/UserView'
import RoleView from '@/views/role/RoleView'
import PageNotFoundView from '@/views/PageNotFoundView'
import TestView from "@/views/TestView";

import EmployeeEditView from "@/views/employee/EmployeeEditView";
import UserEditView from "@/views/user/UserEditView";
import WorkplaceEditView from "@/views/workplace/WorkplaceEditView";
import BaguetteEditView from "@/views/baguette/BaguetteEditView";
import CutterEditView from "@/views/cutter/CutterEditView";
import RoleEditView from "@/views/role/RoleEditView";
import OrderEditView from "@/views/order/OrderEditView";
import OrderWatchView from "@/views/order/OrderWatchView";
import TechnologicalProcessEditView from "@/views/technological-process/TechnologicalProcessEditView";

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
    component: OrderManagerView,
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
