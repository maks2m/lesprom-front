import axios from "axios";

export default {
    namespaced: true,
    state: {
        user: {
            username: '',
            token: '',
            roles: '',
        },
        isAuthenticated: false,
    },
    getters: {
        getUser: state => state.user,
        isAuthenticated: state => state.isAuthenticated,
        isUserRole: state => state.user.roles.includes('USER'),
        isAdminRole: state => state.user.roles.includes('ADMIN'),

    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAuthenticated(state, status) {
            state.isAuthenticated = status;
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user);
            commit('setAuthenticated', true);
            localStorage.setItem('user', JSON.stringify(user));
        },
        deleteUser({ commit }) {
            let user = {username: '', token: '', userRole: ''};
            commit('setUser',  user);
            commit('setAuthenticated', false);
            localStorage.removeItem('user');
        },
    },
    modules: {
    },
}