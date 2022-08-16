export default {
    namespaced: true,
    state: {
        workplaces: stub(),
    },
    getters: {
        getAllItems(state) {
            return state.workplaces;
        },
        getOneItem(state){
            return function(id){
                return state.workplaces.some(item => item.id == id);
            }
        },
    },
    mutations: {
        add(state, item) {
            state.workplaces.push(item);
        },
        remove(state, id){
            state.workplaces = state.workplaces.filter(item => item.id != id);
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
            nameWorkplace: 'Столярный участок',
        },
        {
            id: 2,
            nameWorkplace: 'Участок шлифовки',
        },
        {
            id: 3,
            nameWorkplace: 'Малярный участок',
        },
        {
            id: 4,
            nameWorkplace: 'Корпусной участок',
        },
        {
            id: 5,
            nameWorkplace: 'Участок сборки',
        },
        {
            id: 6,
            nameWorkplace: 'Участок упаковки',
        },
        {
            id: 7,
            nameWorkplace: 'Участок отгрузки',
        },
    ];
}