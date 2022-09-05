import store from "@/store";

export default function(instance) {
    return {
        getAll(url) {
            return instance.get(url, {
                headers: {
                    Authorization: store.getters["authorization/getUser"].token,
                }
            })
        },
        get(url, id) {
            return instance.get(url + `/${id}`, {
                headers: {
                    Authorization: store.getters["authorization/getUser"].token,
                }
            });
        },
        update(url, item) {
            return instance.put(url + `/${item.id}`, item, {
                headers: {
                    Authorization: store.getters["authorization/getUser"].token,
                }
            });
        },
        save(url, item) {
            return instance.post(url, item, {
                headers: {
                    Authorization: store.getters["authorization/getUser"].token,
                }
            });
        },
        del(url, id) {
            return instance.delete(url + `/${id}`, {
                headers: {
                    Authorization: store.getters["authorization/getUser"].token,
                }
            });
        }
    }
}
