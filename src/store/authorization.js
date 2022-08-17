import axios from "axios";

export default {
    namespaced: true,
    state: {
        user: {
            username: '',
            token: '',
            userRole: '',
        },
        isAuthenticated: false,
    },
    getters: {
        getUser: state => state.user,
        isAuthenticated: state => state.isAuthenticated,
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