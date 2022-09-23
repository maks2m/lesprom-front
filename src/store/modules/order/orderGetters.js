export default {
    getAllItemsPageable(state) {
        return state.itemsPageable.content;
    },
    // параметризированный геттер
    getOneItemPageable(state) {
        return function (id) {
            return state.itemsPageable.content.find(item => item.id === id);
        }
    },
    getDownloadPageableFlag(state) {
        return state.downloadPageableFlag;
    },
    getPageInfo(state) {
        return {
            pageNo: state.itemsPageable.number,
            pageSize: state.itemsPageable.size,
            sortBy: state.sortBy,
            totalPages: state.itemsPageable.totalPages,
        };
    },
    getOrdersOnWorkplace(state) {
        return state.ordersOnWorkplace;
    },
    getDownloadOrdersOnWorkplaceFlag(state) {
        return state.downloadOrdersOnWorkplaceFlag;
    },
}