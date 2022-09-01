export default {
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
}