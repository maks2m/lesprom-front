import api from "@/api";

const ENTITY_NAME = 'order'

const URL = '/' + ENTITY_NAME;
const ERROR_REMOVE = 'error (store/' + ENTITY_NAME + '/remove): ';
const ERROR_REPLACE = 'error (store/' + ENTITY_NAME + '/replace): ';
const ERROR_FIND_ALL = 'error (store/' + ENTITY_NAME + '/findAll): ';
const ERROR_ADD_NEW = 'error (store/' + ENTITY_NAME + '/addNew): ';

export default {
    namespaced: true,
    state: {
        items: [],
        downloadFlag: false,
    },
    getters: {
        getAllItems(state) {
            return state.items;
        },
        // параметризированный геттер
        getOneItem(state){
            return function(id){
                return state.items.find(item => item.id === id);
            }
        },
        getDownloadFlag(state) {
            return state.downloadFlag;
        },
    },
    mutations: {
        setItemsSorted(state, paramSort) {
            if (paramSort.separated === 'asc') {
                state.items.sort((a, b) => a[paramSort.column] > b[paramSort.column] ? 1 : -1);
            } else if (paramSort.separated === 'desc') {
                state.items.sort((a, b) => a[paramSort.column] < b[paramSort.column] ? 1 : -1);
            }
        },
        addAll(state, items) {
            state.items = items;
        },
        addNew(state, item) {
            state.items.push(item);
        },
        remove(state, id){
            state.items = state.items.filter(item => item.id !== id);
        },
        replace(state, item) {
            state.items = state.items.map(o => {
                if (o.id === item.id) {
                    return item;
                }
                return o;
            });
        },
        changeDownloadFlag(state) {
            state.downloadFlag = true;
        },
    },
    actions: {
        setItemsSorted({commit}, paramSort) {
            commit('setItemsSorted', paramSort);
        },
        addNew({commit}, item) {
            commit('addNew', item);
        },
        replace({commit}, item) {
            commit('replace', item);
        },
        async add({ commit }, item){
            if (item.id === '') {
                try {
                    const response  = await api.crud.save(URL, item);
                    this.dispatch('order/addNew', response.data);
                } catch (e) {
                    console.log(ERROR_ADD_NEW + e);
                }
            } else {
                try {
                    const response = await api.crud.update(URL, item);
                    this.dispatch('order/replace', response.data);
                } catch (e) {
                    console.log(ERROR_REPLACE + e);
                }
            }
        },
        async remove({ commit }, id){
            try {
                const response = (await api.crud.del(URL, id));
                commit('remove', id);
            } catch (e) {
                console.log(ERROR_REMOVE + e);
            }
        },
        async findAll({ commit }) {
            try {
                const response = (await api.crud.getAll(URL));
                commit('addAll', response.data);
                commit('changeDownloadFlag');
            } catch (e) {
                console.log(ERROR_FIND_ALL + e);
            }

        },
    },
    modules: {
    },
}