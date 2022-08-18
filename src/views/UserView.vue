<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">User</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'user-edit', params: {id: -1} }">new</router-link>
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
      <tr v-for="(item) in items" :key="item.id" v-if="items.length">
        <td v-text="item.id"></td>
        <td v-text="item.username"></td>
        <td v-text="item.password"></td>
        <td v-text="item.roles"></td>
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
    ...mapActions('user', { save: 'add', remove: 'remove', getAll: 'findAll'}),
    del(id) {
      this.remove(id);
    }
  },
  created() {
    this.getAll();
  }
}
</script>

<style scoped>

</style>