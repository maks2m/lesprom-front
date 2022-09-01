import api from "@/api";

export default {
    setItemsSorted({commit}, paramSort) {
        commit('setItemsSorted', paramSort);
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
            }
        } else {
            try {
                const response = await api.crud.update(state.URL, item);
                commit('replace', response.data);
            } catch (e) {
                console.log(errorText('replace', state.URL) + e);
            }
        }
    },
    async remove({commit, state}, id) {
        try {
            await api.crud.del(state.URL, id);
            commit('remove', id);
        } catch (e) {
            console.log(errorText('remove', state.URL) + e);
        }
    },
    async findAll({commit, state}) {
        try {
            const response = (await api.crud.getAll(state.URL));
            commit('addAll', response.data);
            commit('changeDownloadFlag', true);
        } catch (e) {
            console.log(errorText('find_all', state.URL) + e);
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
        case 'add_new':
            return 'error (store/' + url + '/addNew): ';
    }
}