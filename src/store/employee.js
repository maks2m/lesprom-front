import axios from "axios";
import store from "@/store/index";
import api from "@/api";

const URL = '/employee';
//let authUser = this.$store.getters['authorization/getUser'];

export default {
    namespaced: true,
    state: {
        employees: [
            {
                id: 1,
                fullName: "test"
            }
        ],
    },
    getters: {
        getAllItems(state) {
            return state.employees;
        },
        // параметризированный геттер
        getOneItem(state){
            return function(id){
                return state.employees.find(item => item.id === id);
            }
        },
    },
    mutations: {
        addAll(state, items) {
            state.employees = items;
        },
        addNew(state, item) {
            state.employees.push(item);
        },
        remove(state, id){
            state.employees = state.employees.filter(item => item.id != id);
        },
        replace(state, item) {
            state.employees = state.employees.map(o => {
                if (o.id === item.id) {
                    return item;
                }
                return o;
            });

        }
    },
    actions: {
        async add({ commit, getters }, item){
            if (item.id == '') {
                console.log('id=0 item.id: ' + item.id);
                const newItem  = await api.crud.save('/employee', item);
                commit('addNew', newItem)
            } else {
                console.log('id!=0 item.id: ' + item.id);
                const updateItem = await api.crud.update('/employee', item);
                console.log(updateItem.data);
                commit('replace', updateItem)
            }
        },
        async remove({ commit }, id){
            try {
                const status = (await api.crud.del('/employee', id)).status;
                commit('remove', id);
            } catch (e) {
                console.log('error (store/employee/remove): ' + e);
            }
        },
        async findAll({ commit }) {
            try {
                const data = (await api.crud.getAll('/employee')).data;
                commit('addAll', data);
            } catch (e) {
                console.log('error (store/employee/findAll): ' + e);
            }

        },
    },
    modules: {
    },
}