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
          <li class="nav-item"
              v-for="item in menu"
              :key="item.text">
            <router-link class="nav-link"
                         :to="{ name: item.route }"
                         exact-active-class="active"
                         v-if="checkAuthorization(item.access)">
              {{ item.text }}
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else></ul>

        <span v-if="isLoggedIn">
          <div class="input-group">
            <label class="navbar-text me-2">{{ user.username }}</label>
            <button class="btn btn-sm btn-outline-secondary" @click="logout">Выйти</button>
          </div>
        </span>
        <span v-else>
            <div class="input-group input-group-sm">
              <input v-model="userForm.username" type="text" class="form-control" placeholder="Имя пользователя" aria-label="Username"
                     aria-describedby="addon-wrapping">
              <input v-model="userForm.password" type="password" class="form-control" placeholder="Пароль" aria-label="Password"
                     aria-describedby="addon-wrapping">
              <button class="btn btn-sm btn-outline-secondary" @click.prevent="login">Войти</button>

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
      userForm: {
        username: '',
        password: '',
      },
      menu: [
        { route: 'order-manager', text: 'Заказы (менеджер)', access: ['ADMIN', 'USER'] },
        { route: 'order-technologist', text: 'Заказы (технолог)', access: ['ADMIN', 'USER'] },
        { route: 'baguette', text: 'Багеты', access: ['ADMIN', 'USER'] },
        { route: 'cutter', text: 'Фрезы', access: ['ADMIN', 'USER'] },
        { route: 'workplace', text: 'Участки', access: ['ADMIN', 'USER'] },
        { route: 'employee', text: 'Сотрудники', access: ['ADMIN', 'USER'] },
        { route: 'user', text: 'User', access: ['ADMIN'] },
        { route: 'role', text: 'Role', access: ['ADMIN'] },
        { route: 'test', text: 'test', access: ['ADMIN'] },
      ]
    }
  },
  computed: {
    ...mapGetters('authorization', { isLoggedIn: 'isAuthenticated', user: 'getUser' }),
    test(){

    },
  },
  methods: {
    login() {
      this.$load(() => {
        this.$store.dispatch('authorization/login', this.userForm);
      });
    },
    logout() {
      this.$load(() => {
        this.$store.dispatch('authorization/logout');
        this.$router.push('/');
      });
    },
    checkAuthorization(arrRoles) {
      return arrRoles.some(r => this.$store.getters['authorization/getUser'].roles.some(_r => _r === r));
    },
  },
}
</script>

<style scoped>

</style>