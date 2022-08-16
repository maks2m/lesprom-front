import axios from "axios";

export default {
    namespaced: true,
    state: {
        user: {
            username: 'elkin',
            password: 'elkin',
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
            console.log(user.username);
            let rs = await axios
                .get('http://localhost:8080/api/order',
                    { auth: { username: user.username, password: user.password } });
            if (rs.status === 200) {
                commit('setUser', user);
                commit('setAuthenticated', true);
            }
        },
        logout({ getters }) {
            getters.getUser.user = null;
            getters.isAuthenticated = false;
        }
    },
    modules: {
    },
}