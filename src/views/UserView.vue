<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">User</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'user-edit', params: {id: 'new'} }">new</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Username</th>
        <th>Password</th>
        <th>Role</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length" @dblclick="this.$router.push({ name: 'user-edit', params: {id: item.id} })">
        <td v-text="item.id"></td>
        <td v-text="item.username"></td>
        <td>******</td>
        <td>
          <div v-for="role in item.roles">{{ role.role }}</div>
        </td>
        <td>
          <div class="btn-group">
            <router-link class="btn btn-secondary" :to="{ name: 'user-edit', params: {id: item.id} }">edit</router-link>
            <button class="btn btn-danger" @click="del(item.id)">delete</button>
          </div>
        </td>
      </tr>
      <tr v-else>
        <td>List is empty!</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserView",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('user', { items: 'getAllItems', getItem: 'getOneItem' }),
  },
  methods: {
    ...mapActions('user', { save: 'add', remove: 'remove' }),
    del(id) {
      this.remove(id);
    }
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['user/getDownloadFlag']) this.$store.dispatch('user/findAll');
    }
  }
}
</script>

<style scoped>

</style>