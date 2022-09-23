export default {
    getAllItems(state) {
        return state.items;
    },
    // параметризированный геттер
    getOneItem(state) {
        return function (id) {
            return state.items.find(item => item.id === id);
        }
    },
    getDownloadFlag(state) {
        return state.downloadFlag;
    },
    getUrl(state) {
        return state.URL;
    },
    getFullURL(state) {
        return state.URL + '?pageNo=' + state.pageNo + '&pageSize=' + state.pageSize + '&sortBy=' + state.sortBy;
    },
}