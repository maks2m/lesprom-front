import { createStore } from 'vuex';

import baguette from "@/store/modules/baguette";
import cutter from "@/store/modules/cutter";
import employee from "@/store/modules/employee";
import order from "@/store/modules/order";
import role from "@/store/modules/role";
import user from "@/store/modules/user";
import workplace from "@/store/modules/workplace";
import authorization from "@/store/modules/authorization";
import technologicalProcess from "@/store/modules/technologicalProcess";


export default createStore({
  modules: {
    baguette, cutter, employee, order, role, user, workplace, authorization, technologicalProcess,
  },

  strict: process.env.NODE_ENV !== 'production'
})
