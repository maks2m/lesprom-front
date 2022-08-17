import store from "@/store";

export default function(instance) {
    return {
        signIn(payload) {
            return instance.post('auth/login', payload);
        },
        logout() {
            instance.post('auth/logout', {}, {
                headers: {
                    Authorization: store.getters["authorization/getUser"].token,
                }
            });
        }
    }
}
