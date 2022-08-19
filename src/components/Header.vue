<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }">LESPROM</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isLoggedIn">
          <li class="nav-item" v-for="item in menu" :key="item.text">
            <router-link class="nav-link" :to="{ name: item.route }" exact-active-class="active" >
              {{ item.text }}
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else></ul>

        <span v-if="isLoggedIn">
          <div class="input-group">
            <label class="navbar-text me-2">{{ user.username }}</label>
            <button class="btn btn-sm btn-outline-secondary" @click="logout">Sign Out</button>
          </div>
        </span>
        <span v-else>
            <div class="input-group input-group-sm">
              <input v-model="username" type="text" class="form-control" placeholder="Username" aria-label="Username"
                     aria-describedby="addon-wrapping">
              <input v-model="password" type="password" class="form-control" placeholder="Password" aria-label="Password"
                     aria-describedby="addon-wrapping">
              <button class="btn btn-sm btn-outline-secondary" @click.prevent="login">Sing In</button>

            </div>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "app-header",
  data() {
    return {
      username: '',
      password: '',
      menu: [
        { route: 'order', text: 'Order', access: ['ADMIN', 'USER'] },
        { route: 'baguette', text: 'Baguette', access: ['ADMIN', 'USER'] },
        { route: 'cutter', text: 'Cutter', access: ['ADMIN', 'USER'] },
        { route: 'workplace', text: 'Workplace', access: ['ADMIN', 'USER'] },
        { route: 'employee', text: 'Employee', access: ['ADMIN', 'USER'] },
        { route: 'user', text: 'User', access: ['ADMIN'] },
        { route: 'role', text: 'Role', access: ['ADMIN'] },
      ]
    }
  },
  computed: {
    ...mapGetters('authorization', { isLoggedIn: 'isAuthenticated', user: 'getUser' }),

  },
  methods: {
    login() {
      this.$load(async() => {
        const response = await this.$api.auth.signIn({ username: this.username, password: this.password });
        console.log(response);
        this.$store.dispatch('authorization/setUser', response.data);
      });
    },
    logout() {
      this.$load(async() => {
        await this.$api.auth.logout();
        this.$store.dispatch('authorization/deleteUser');
        this.$router.push('/');
      });
    }
  },
}
</script>

<style scoped>

</style>