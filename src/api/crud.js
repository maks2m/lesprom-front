import store from "@/store";

export default function(instance) {
    return {
        getAll(url) {
            return instance.get(url)
        },
        get(url, id) {
            return instance.get(url + `/${id}`);
        },
        update(url, id, item) {
            return instance.put(url + `/${id}`, {item});
        },
        save(url, item, user) {
            return instance.post(url, {item});
        },
        del(url, id) {
            return instance.delete(url + `/${id}`);
        }
    }
}
