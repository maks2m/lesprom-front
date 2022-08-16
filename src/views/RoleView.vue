<template>
  <div>
    <h1>Role page</h1>
  </div>
  <div>
    <button @click="clickButton">test</button>
  </div>
</template>

<script>

export default {
  name: "RoleView",

  methods: {
    async clickButton(){
      // api.findAll('/order', this.$store.getters['authorization/getUser']);
/*
      console.log('start')

      let rs = await axios
          .get('http://localhost:8080/api/order', { auth: { username: 'elkin', password: 'elkin' } });
          //.then(response => (console.log(response.data)));

      console.log(rs)
      console.log('finish')
*/
    }
  }
}
</script>

<style scoped>

</style>