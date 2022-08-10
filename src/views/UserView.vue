<template>
  <div class="container-fluid">
  <div class="row">
    <div class="col-1">
      <h3>Users list</h3>
    </div>
    <div class="col-1">
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

    <form @submit="save()">
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
    </form>

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
        <button class="btn btn-secondary" @click="edit(user)">edit</button>
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
export default {
  name: "UserView",
  data() {
    return {
      users: [
        {
          id: 1,
          username: 'elkin',
          password: 'elkin',
          roles: [
            {
              id: 1,
              role: 'USER',
            },
            {
              id: 2,
              role: 'ADMIN',
            },
          ]
        },
        {
          id: 2,
          username: 'ivanov',
          password: 'ivanov',
          roles: [
            {
              id: 1,
              role: 'USER',
            },
          ]
        },
        {
          id: 3,
          username: 'petrov',
          password: 'petrov',
          roles: [
            {
              id: 1,
              role: 'USER',
            },
          ]
        },
        {
          id: 4,
          username: 'sidorov',
          password: 'sidorov',
          roles: [
            {
              id: 1,
              role: 'USER',
            },
          ]
        },
      ],
      editUser: '',
      roles: [
        {
          id: 1,
          role: 'USER',
        },
        {
          id: 2,
          role: 'ADMIN',
        },
      ],
    }
  },
  mounted() {
/*
    axios
        .get('http://localhost:8080/api/user')
        .then(response => (this.users = response.data));
    axios
        .get('http://localhost:8080/api/role')
        .then(response => (this.roles = response.data));
*/
  },
  methods: {
    save: function (user) {
      console.log('save ' + user)
    },
    edit: function (user) {
      console.log('edit ' + user)
    },
    del: function (id, index) {
      console.log('del id' + id)
      /*
                  axios.delete(
                      'http://localhost:8080/api/user/' + id,
                      {headers: {
                              Authorization: "Basic ZWxraW46ZWxraW4="
                          },
                          data:{
                          }}
                  );

      this.users.splice(index, 1);
      */
    }
  }
}
</script>

<style scoped>

</style>