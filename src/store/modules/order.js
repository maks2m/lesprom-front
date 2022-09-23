import getters from "@/store/getters";
import orderGetters from "@/store/modules/order/orderGetters";
import mutations from "@/store/mutations";
import orderMutations from "@/store/modules/order/orderMutations";
import actions from "@/store/actions";
import orderActions from "@/store/modules/order/orderActions";

export default {
    namespaced: true,
    state: {
        items: [],
        ordersOnWorkplace: [],
        downloadOrdersOnWorkplaceFlag: false,
        downloadFlag: false,
        downloadPageableFlag: false,
        itemsPageable: {
            content: null,
        },
        URL: 'order',
        pageNo: -1,
        pageSize: 10,
        sortBy: 'id',
    },
    getters: Object.assign(getters, orderGetters),
    mutations: Object.assign(mutations, orderMutations),
    actions: Object.assign(actions, orderActions),
    modules: {
    },
}