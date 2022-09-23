import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

export default {
    namespaced: true,
    state: {
        items: [],
        downloadFlag: false,
        URL: 'workplace',
        pageNo: -1,
        pageSize: '',
        sortBy: 'id',
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {
    },
}