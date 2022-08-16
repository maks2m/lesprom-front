export default {
    namespaced: true,
    state: {
        orders: stub(),
    },
    getters: {
        getAllItems(state) {
            return state.orders;
        },
        getOneItem(state){
            return function(id){
                return state.orders.some(item => item.id == id);
            }
        },
    },
    mutations: {
        add(state, item) {
            state.orders.push(item);
        },
        remove(state, id){
            state.orders = state.orders.filter(item => item.id != id);
        },
    },
    actions: {
        add({ commit, getters }, item){
            commit('add', item);
        },
        remove({ commit, getters }, id){
            commit('remove', id);
        },
    },
    modules: {
    },
}

function stub() {
    return [
        {
            id: 1,
            numberOrder: '112254',
        },
        {
            id: 2,
            numberOrder: '112542',
        },
    ];
}