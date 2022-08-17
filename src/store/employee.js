
const URL = '/employee';
//let authUser = this.$store.getters['authorization/getUser'];

export default {
    namespaced: true,
    state: {
        employees: [],
    },
    getters: {
        getAllItems(state) {
            return state.employees;
        },
/*
        getOneItem(state){
            return function(id){
                return state.employees.some(item => item.id == id);
            }
        },
*/
        getOneItem: state => id => state.employees.find(item => item.id === id),
    },
    mutations: {
        addAll(state, items) {
            state.employees = items;
        },
        add(state, item) {
            state.employees.push(item);
        },
        remove(state, id){
            state.employees = state.employees.filter(item => item.id != id);
        },
    },
    actions: {
        add({ commit }, item){
            if (item.id == '') {
                // let item = api.save(URL, item, this.$store.getters['authorization/getUser']);

            } else {
                // api.update(URL, item.id, item, this.$store.getters['authorization/getUser']);
            }
            commit('add', item);
        },
        remove({ commit }, id){
            // api.del(URL, id, this.$store.getters['authorization/getUser']);
            commit('remove', id);
        },
        findAll({ commit }, data) {
            commit('addAll', data);

        },
    },
    modules: {
    },
}