export default {
    namespaced: true,
    state: {
        baguettes: stub(),
    },
    getters: {
        getAllItems(state) {
            return state.baguettes;
        },
        getOneItem(state){
            return function(id){
                return state.baguettes.some(item => item.id == id);
            }
        },
    },
    mutations: {
        add(state, item) {
            state.baguettes.push(item);
        },
        remove(state, id){
            state.baguettes = state.baguettes.filter(item => item.id != id);
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
            baguetteName: 'фигурный',
        },
        {
            id: 2,
            baguetteName: 'прямой',
        },
    ];
}