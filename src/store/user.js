export default {
    namespaced: true,
    state: {
        users: stub(),
    },
    getters: {
        users(state) {
            return state.users;
        },
        getUser(state){
            return function(id){
                return state.users.some(item => item.id == id);
            }
        },
    },
    mutations: {
        addUser(state, user) {
            state.users.push(user);
        },
        removeUser(state, id){
            state.users = state.users.filter(item => item.id != id);
        },
    },
    actions: {
        add({ commit, getters }, user){
            commit('addUser', user);
        },
        remove({ commit, getters }, id){
            commit('removeUser', id);
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

/*
        axios
            .get('http://localhost:8080/api/user')
            .then(response => (this.users = response.data));
        axios
            .get('http://localhost:8080/api/role')
            .then(response => (this.roles = response.data));
    */