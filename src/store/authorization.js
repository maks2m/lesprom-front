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
        async login({ commit }, user) {
            let rs = await axios
                .post('http://localhost:8080/api/auth/login', {
                    "username": user.username,
                    "password": user.password
                });
            if (rs.status === 200) {
                commit('setUser', rs.data);
                commit('setAuthenticated', true);
            }
        },
        async logout({ commit, getters }) {
            let rs = await axios
                .post('http://localhost:8080/api/auth/logout', {}, {
                    headers: {
                        Authorization: getters.getUser.token,
                    }
                });
            console.log('logout code ' + rs);
            let user = {username: '', token: '', userRole: ''};
            commit('setUser',  user);
            commit('setAuthenticated', false);

        }
    },
    modules: {
    },
}