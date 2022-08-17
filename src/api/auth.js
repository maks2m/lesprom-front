import axios from "axios";

export default function(instance) {
    return {
        signIn(payload) {
            let rs = instance.get('http://localhost:8080/api/order',
                    { auth: { username: user.username, password: user.password } });
            if (rs.status === 200) {
                console.log(rs)
                commit('setUser', user);
                commit('setAuthenticated', true);
            }
        },
        logout() {
            return instance.delete('auth/logout')
        }
    }
}
