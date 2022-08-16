<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Username</label>
      <input required v-model="username" type="text" placeholder="Username"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data(){
    return {
      username : "",
      password : ""
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('authorization/login', { username: this.username, password: this.password})
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>