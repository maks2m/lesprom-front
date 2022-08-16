<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <h3>Employees list</h3>
      </div>
      <div class="col">
        <a href="employee/new" class="btn btn-primary">New user</a>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Full Name</th>
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

      <tr v-for="(item, index) in employees" v-if="employees.length">
        <td v-text="item.id"></td>
        <td v-text="item.fullName"></td>
        <td>
          <router-link class="btn btn-secondary" :to="{ name: 'edit-user', params: {id: item.id} }">edit</router-link>
        </td>
        <td>
          <button class="btn btn-danger" @click="del(item.id, index)">delete</button>
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
import {mapActions, mapGetters} from "vuex";
import store from "@/store";

export default {
  name: "EmployeeView",
  data() {
    return {
      employees: [],
      editUser: '',
    }
  },
  computed: {
    ...mapGetters('employee', { employees: 'getAllItems', getEmployee: 'getOneItem' }),
  },
  methods: {
    ...mapActions('employee', { save: 'add', del: 'remove', getAll: 'findAll'}),
  },
  created() {
    console.log('1');

    this.$load(async() => {
      this.employees = (await this.$api.crud.getAll('/employee')).data
    })

    console.log('2');
  }
}
</script>

<style scoped>

</style>