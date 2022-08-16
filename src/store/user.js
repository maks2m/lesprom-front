export default {
    namespaced: true,
    state: {
        users: stub(),
    },
    getters: {
        getAllItems(state) {
            return state.users;
        },
        getOneItem(state){
            return function(id){
                return state.users.some(item => item.id == id);
            }
        },
    },
    mutations: {
        add(state, item) {
            state.users.push(item);
        },
        remove(state, id){
            state.users = state.users.filter(item => item.id != id);
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
            username: 'elkin',
            password: 'elkin',
            roles: [
                {
                    id: 1,
                    role: 'USER',
                },
                {
                    id: 2,
                    role: 'ADMIN',
                },
            ]
        },
        {
            id: 2,
            username: 'ivanov',
            password: 'ivanov',
            roles: [
                {
                    id: 1,
                    role: 'USER',
                },
            ]
        },
        {
            id: 3,
            username: 'petrov',
            password: 'petrov',
            roles: [
                {
                    id: 1,
                    role: 'USER',
                },
            ]
        },
        {
            id: 4,
            username: 'sidorov',
            password: 'sidorov',
            roles: [
                {
                    id: 1,
                    role: 'USER',
                },
            ]
        },
    ];
}

