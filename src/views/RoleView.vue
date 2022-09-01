<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Role</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'role-edit', params: {id: 'new'} }">new</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Role</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length" @dblclick="this.$router.push({ name: 'role-edit', params: {id: item.id} })">
        <td v-text="item.id"></td>
        <td v-text="item.role"></td>
        <td>
          <div class="btn-group">
            <router-link class="btn btn-secondary" :to="{ name: 'role-edit', params: {id: item.id} }">edit</router-link>
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
  name: "RoleView",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('role', { items: 'getAllItems', getItem: 'getOneItem' }),
  },
  methods: {
    ...mapActions('role', { save: 'add', remove: 'remove' }),
    del(id) {
      this.remove(id).then(() => {
        this.$store.dispatch('user/changeDownloadFlag', false);
      });
    }
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['role/getDownloadFlag']) this.$store.dispatch('role/findAll');
    }
  }
}
</script>

<style scoped>

</style>