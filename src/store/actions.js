import api from "@/services/api";

export default {
    changeUrlParam({commit}, payload) {
        commit('changeUrlParam', payload);
    },
    addNew({commit}, item) {
        commit('addNew', item);
    },
    replace({commit}, item) {
        commit('replace', item);
    },
    changeDownloadFlag({commit}, status) {
        commit('changeDownloadFlag', status);
    },
    async add({commit, state}, item) {
        if (item.id === '') {
            try {
                const response = await api.crud.save(state.URL, item);
                commit('addNew', response.data);
            } catch (e) {
                console.log(errorText('add_new', state.URL) + e);
                console.log(e);
            }
        } else {
            try {
                const response = await api.crud.update(state.URL, item);
                commit('replace', response.data);
            } catch (e) {
                console.log(errorText('replace', state.URL) + e);
                console.log(e);
            }
        }
    },
    async remove({commit, state}, id) {
        try {
            await api.crud.del(state.URL, id);
            commit('remove', id);
        } catch (e) {
            console.log(errorText('remove', state.URL) + e);
            console.log(e);
        }
    },
    async findOne({commit, getters}, id) {
        try {
            const response = await api.crud.get(getters.getUrl, id);
            if (getters.getDownloadFlag) {
                commit('replace', response.data);
            } else {
                return response.data;
            }
        } catch (e) {
            console.log(errorText('find_one', getters.getFullURL) + e);
            console.log(e);
        }
    },
    async findAll({commit, getters}) {
        try {
            const response = await api.crud.getAll(getters.getFullURL);
            //console.log('INSTANCE1')
            if (response.data.pageable === 'INSTANCE') {
                //console.log('INSTANCE2')
                commit('addAll', response.data.content);
                commit('changeDownloadFlag', true);
            }
        } catch (e) {
            console.log(errorText('find_all', getters.getFullURL) + e);
            console.log(e);
        }
    },
}

function errorText(type, url) {
    switch (type) {
        case 'remove':
            return 'error (store/' + url + '/remove): ';
        case 'replace':
            return 'error (store/' + url + '/replace): ';
        case 'find_all':
            return 'error (store/' + url + '/findAll): ';
        case 'find_one':
            return 'error (store/' + url + '/findOne): ';
        case 'add_new':
            return 'error (store/' + url + '/addNew): ';
    }
}