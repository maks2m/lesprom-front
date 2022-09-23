export default {
    addAllPageable(state, items) {
        state.itemsPageable = items;
    },
    addNewPageable(state, item) {
        state.itemsPageable.push(item);
    },
    removePageable(state, id) {
        state.itemsPageable = state.itemsPageable.filter(item => item.id !== id);
    },
    replacePageable(state, item) {
        state.itemsPageable.content = state.itemsPageable.content.map(o => {
            if (o.id === item.id) {
                return item;
            }
            return o;
        });
    },
    changeDownloadPageableFlag(state, status) {
        state.downloadPageableFlag = status;
    },
    addOrdersOnWorkplace(state, items) {
        state.ordersOnWorkplace = items;
    },
    changeDownloadOrdersOnWorkplaceFlag(state, status) {
        state.downloadOrdersOnWorkplaceFlag = status;
    },
}