import store from "@/store";

export default function(instance) {
    return {
        getAllOfWorkplace(url, idWorkplace) {
            return instance.get(url, {
                headers: {
                    Authorization: store.getters["authorization/getUser"].token,
                }
            })
        },
    }
}
