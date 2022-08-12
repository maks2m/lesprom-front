export default {
    namespaced: true,
    state: {
        roles: stub(),
    },
    getters: {
        roles(state) {
            return state.roles;
        },
    },
    mutations: {
    },
    actions: {
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