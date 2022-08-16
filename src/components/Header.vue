<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">LESPROM</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
<!--
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/order">Orders</router-link>
          </li>
-->
          <li  class="nav-item" v-for="item in menu" :key="item.text">
            <router-link class="nav-link" :to="{ name: item.route }" exact-active-class="active">{{ item.text }}</router-link>
          </li>
        </ul>
        <span class="navbar-text ms-2 me-2" >Username</span>
        <span v-if="isLoggedIn">
          <a class="btn btn-sm btn-outline-secondary" @click="logout">Sign Out</a>
        </span>
        <span v-else>
          <router-link class="btn btn-sm btn-outline-secondary" :to="{ name: 'login' }" exact-active-class="active">Sing In</router-link>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      menu: [
        { route: 'order', text: 'Order'},
        { route: 'baguette', text: 'Baguette'},
        { route: 'cutter', text: 'Cutter'},
        { route: 'workplace', text: 'Workplace'},
        { route: 'employee', text: 'Employee'},
        { route: 'user', text: 'User'},
        { route: 'role', text: 'Role'},
      ]
    }
  },
  computed : {
    isLoggedIn : function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    }
  },
}
</script>

<style scoped>

</style>