import api from "@/api";

const ENTITY_NAME = 'authorization'

const ERROR_REMOVE = 'error (store/' + ENTITY_NAME + '/deleteUser): ';
const ERROR_ADD = 'error (store/' + ENTITY_NAME + '/setUser): ';

export default {
    namespaced: true,
    state: {
        isAppPlay: false,
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
        getAppPlay: state => state.isAppPlay,

    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAuthenticated(state, status) {
            state.isAuthenticated = status;
        },
        setTrueAppPlay(state) {
            state.isAppPlay = true;
        }
    },
    actions: {
        setTrueAppPlay({ commit }) {
            commit('setTrueAppPlay', true);
        },
        setUser({ commit }, user) {
            commit('setUser', user);
            commit('setAuthenticated', true);
            localStorage.setItem('user', JSON.stringify(user));
        },
        async login({ commit }, user) {
            try {
                const response = await api.auth.signIn(user);
                this.dispatch('authorization/setUser', response.data);
            } catch (e) {
                console.log(ERROR_ADD + e);
            }
        },
        async logout({ commit }) {
            try {
                await api.auth.logout();
                const user = { username: '', token: '', roles: '' };
                commit('setUser',  user);
                commit('setAuthenticated', false);
                localStorage.removeItem('user');
            } catch (e) {
                console.log(ERROR_REMOVE + e);
            }

        },
    },
    modules: {
    },
}