<template>
  <div class="container">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">User</h3>
        <router-link class="btn btn-primary m-2"
                     :to="{ name: 'user-edit', params: {id: 'new'} }">
          new
        </router-link>
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
      <tbody v-if="items.length">
      <tr v-for="(item) in items"
          :key="item.id"
          @dblclick="this.$router.push({ name: 'user-edit', params: {id: item.id} })">
        <td v-text="item.id"></td>
        <td v-text="item.username"></td>
        <td>******</td>
        <td>
          <div v-for="role in item.roles">{{ role.role }}</div>
        </td>
        <td>
          <div class="btn-group">
            <router-link class="btn btn-secondary"
                         :to="{ name: 'user-edit', params: {id: item.id} }">
              edit
            </router-link>
            <button class="btn btn-danger"
                    @click="del(item.id)">
              delete
            </button>
          </div>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td colspan="10" class="text-center">List is empty!</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserView",
  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', {items: 'getAllItems', getItem: 'getOneItem'}),
  },
  methods: {
    ...mapActions('user', {save: 'add', remove: 'remove', changeUrlParam: 'changeUrlParam'}),
    del(id) {
      this.remove(id);
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.changeUrlParam({
      pageNo: -1,
      pageSize: '',
      sortBy: urlParams.get("sortBy") ? urlParams.get("sortBy") : 'id',
    });
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['user/getDownloadFlag']) this.$store.dispatch('user/findAll');
    }
  }
}
</script>

<style scoped>

</style>