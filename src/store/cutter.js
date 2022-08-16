export default {
    namespaced: true,
    state: {
        cutters: stub(),
    },
    getters: {
        getAllItems(state) {
            return state.cutters;
        },
        getOneItem(state){
            return function(id){
                return state.cutters.some(item => item.id == id);
            }
        },
    },
    mutations: {
        add(state, item) {
            state.cutters.push(item);
        },
        remove(state, id){
            state.cutters = state.cutters.filter(item => item.id != id);
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
            cutterName: 'пазовая',
        },
        {
            id: 2,
            cutterName: 'фигурная',
        },
    ];
}