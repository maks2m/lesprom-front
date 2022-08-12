import { createStore } from 'vuex'
import baguette from "@/store/baguette";
import cutter from "@/store/cutter";
import employee from "@/store/employee";
import order from "@/store/order";
import role from "@/store/role";
import user from "@/store/user";
import workplace from "@/store/workplace";


export default createStore({
  modules: {
    baguette, cutter, employee, order, role, user, workplace,
  },

  strict: process.env.NODE_ENV !== 'production'
})
