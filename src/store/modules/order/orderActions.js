import router from "@/router";
import api from "@/services/api";

export default {
    addNewPageable({commit}, item) {
        commit('addNewPageable', item);
    },
    replacePageable({commit}, item) {
        commit('replacePageable', item);
    },
    changeDownloadPageableFlag({commit}, status) {
        commit('changeDownloadPageableFlag', status);
    },
    async addPageable({commit, state}, item) {
        if (item.id === '') {
            try {
                const response = await api.crud.save(state.URL, item);
                commit('addNewPageable', response.data);
            } catch (e) {
                console.log(errorText('add_new_pageable', state.URL) + e);
                console.log(e);
            }
        } else {
            try {
                const response = await api.crud.update(state.URL, item);
                commit('replacePageable', response.data);
            } catch (e) {
                console.log(errorText('replace_pageable', state.URL) + e);
                console.log(e);
            }
        }
    },
    async removePageable({commit, state}, id) {
        try {
            await api.crud.del(state.URL, id);
            commit('removePageable', id);
        } catch (e) {
            console.log(errorText('remove_pageable', state.URL) + e);
            console.log(e);
        }
    },
    async findOnePageable({commit, getters}, id) {
        try {
            const response = await api.crud.get(getters.getUrl, id);
            if (getters.getDownloadPageableFlag) {
                commit('replacePageable', response.data);
            } else {
                return response.data;
            }
        } catch (e) {
            console.log(errorText('find_one_pageable', getters.getUrl) + e);
            console.log(e);
        }
    },
    async findAllOnWorkplace({commit, getters}, id) {
        try {
            const response = await api.orderSpecialCrud.getAllOfWorkplace(getters.getUrl + '/sort-on-workplace?idWorkplace=' + id);
            commit('addOrdersOnWorkplace', response.data.content);
            commit('changeDownloadOrdersOnWorkplaceFlag', true);
        } catch (e) {
            console.log(errorText('find_all_on_workplace', getters.getFullURL) + e);
            console.log(e);
        }
    },
    /*findAllWithPaginationAndSorted({getters, dispatch}, payload) {
        const tmpPageInfo = {
            pageNo: payload.pageNo ? payload.pageNo - 1 : getters.getPageInfo.pageNo,
            pageSize: payload.pageSize ? payload.pageSize : getters.getPageInfo.pageSize,
            sortBy: payload.sortBy ? payload.sortBy : getters.getPageInfo.sortBy,
        };
        dispatch('changeUrlParam', tmpPageInfo);
        dispatch('findAll').then(() => {
            router.push({name: getters.getURL, query: tmpPageInfo});
        });
    },*/
    async findAllPageable({commit, getters}) {
        try {
            const response = await api.crud.getAll(getters.getFullURL);
            commit('addAllPageable', response.data);
            commit('changeDownloadPageableFlag', true);
        } catch (e) {
            console.log(errorText('find_all_pageable', getters.getFullURL) + e);
            console.log(e);
        }
    },
}

function errorText(type, url) {
    switch (type) {
        case 'remove_pageable':
            return 'error (store/' + url + '/remove): ';
        case 'replace_pageable':
            return 'error (store/' + url + '/replace): ';
        case 'find_all_pageable':
            return 'error (store/' + url + '/findAll): ';
        case 'find_all_on_workplace':
            return 'error (store/' + url + '/findAllOnWorkplace): ';
        case 'find_one_pageable':
            return 'error (store/' + url + '/findOne): ';
        case 'add_new_pageable':
            return 'error (store/' + url + '/addNew): ';
    }
}