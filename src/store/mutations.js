export default {
    addAll(state, items) {
        state.items = items;
    },
    addNew(state, item) {
        state.items.push(item);
    },
    remove(state, id) {
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

    changeDownloadFlag(state, status) {
        state.downloadFlag = status;
    },
    changeUrlParam(state, payload) {
        state.pageNo = payload.pageNo !== null ? payload.pageNo : state.pageNo;
        state.pageSize = payload.pageSize !== null ? payload.pageSize : state.pageSize;
        state.sortBy = payload.sortBy !== null ? payload.sortBy : state.sortBy;
    }
}