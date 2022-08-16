
const URL = '/employee';
//let authUser = this.$store.getters['authorization/getUser'];

export default {
    namespaced: true,
    state: {
        employees: [],
    },
    getters: {
        getAllItems(state) {
            return state.employees;
        },
        getOneItem(state){
            return function(id){
                return state.employees.some(item => item.id == id);
            }
        },
    },
    mutations: {
        addAll(state, items) {
            state.employees = items;
        },
        add(state, item) {
            state.employees.push(item);
        },
        remove(state, id){
            state.employees = state.employees.filter(item => item.id != id);
        },
    },
    actions: {
        add({ commit }, item){
            if (item.id == '') {
                // let item = api.save(URL, item, this.$store.getters['authorization/getUser']);

            } else {
                // api.update(URL, item.id, item, this.$store.getters['authorization/getUser']);
            }
            commit('add', item);
        },
        remove({ commit }, id){
            // api.del(URL, id, this.$store.getters['authorization/getUser']);
            commit('remove', id);
        },
        findAll({ commit }) {
            let data;
            // data = api.findAll(URL, this.$store.getters['authorization/getUser']);

            commit('addAll', data);

        },
    },
    modules: {
    },
}

function stub() {
    return [
        {
            id: 1,
            fullName: 'Алексеев',
        },
        {
            id: 2,
            fullName: 'Иванов',
        },
        {
            id: 3,
            fullName: 'Петров',
        },
        {
            id: 4,
            fullName: 'Сидоров',
        },
        {
            id: 5,
            fullName: 'Михайлов',
        },
        {
            id: 6,
            fullName: 'Выбегалло',
        },
        {
            id: 7,
            fullName: 'Ойра-ойра',
        },
        {
            id: 8,
            fullName: 'Амперян',
        },
        {
            id: 9,
            fullName: 'Корнеев',
        },
        {
            id: 10,
            fullName: 'Привалов',
        },
        {
            id: 11,
            fullName: 'Кокоберидзе',
        },
        {
            id: 12,
            fullName: 'Катцман',
        },
        {
            id: 13,
            fullName: 'Воронин',
        },
        {
            id: 14,
            fullName: 'Горчаков',
        },
    ];
}