export default {
    namespaced: true,
    state: {
        roles: stub(),
    },
    getters: {
        getAllItems(state) {
            return state.roles;
        },
        getOneItem(state){
            return function(id){
                return state.roles.some(item => item.id == id);
            }
        },
    },
    mutations: {
        add(state, item) {
            state.roles.push(item);
        },
        remove(state, id){
            state.roles = state.roles.filter(item => item.id != id);
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
            role: 'USER',
        },
        {
            id: 2,
            role: 'ADMIN',
        },
    ];
}