<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <h3>Users list</h3>
      </div>
      <div class="col">
        <a href="user/new" class="btn btn-primary">New user</a>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Username</th>
        <th>Password</th>
        <th>Role</th>
        <th colspan="2">Edit</th>
      </tr>
      </thead>
      <tbody>

      <!--    <form @submit="save()">
            <tr>
              <input type="hidden" v-model="editUser.id" name="id"/>
              <th v-text="(editUser.id != 0) ? editUser.id : ''"></th>
              <th><input type="text" v-model="editUser.username"/></th>
              <th><input type="password" v-model="editUser.password"/></th>
              <th>
                <div v-for="role in roles">
                  <label>
                    <input type="checkbox" v-text="role.role"/>
                  </label>
                </div>
              </th>
              <th><input class="btn btn-success" type="submit" value="Save"/></th>
              <th><input class="btn btn-warning" type="reset" value="Cancel"/></th>
            </tr>
          </form>-->

      <tr v-for="(user, index) in users" v-if="users.length">
        <td v-text="user.id"></td>
        <td v-text="user.username"></td>
        <td>********</td>
        <td>
          <div v-for="role in user.roles">
            <div v-text="role.role"></div>
          </div>
        </td>
        <td>
          <router-link class="btn btn-secondary" :to="{ name: 'edit-user', params: {id: user.id} }">edit</router-link>
        </td>
        <td>
          <button class="btn btn-danger" @click="del(user.id, index)">delete</button>
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
import { mapGetters, mapActions} from "vuex";

export default {
  name: "UserView",
  data() {
    return {
      editUser: '',
    }
  },
  computed: {
    ...mapGetters('user', { users: 'users', getUser: 'getUser' }),
    ...mapGetters('role', { roles: 'roles' }),
  },
  methods: {
    ...mapActions('user', { save: 'add', del: 'remove' }),
  }
}
</script>

<style scoped>

</style>