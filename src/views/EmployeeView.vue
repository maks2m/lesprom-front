<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Employees list</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'edit-user', params: {id: 1} }">New user</router-link>
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
      <tr v-for="(item, index) in employees" v-if="employees.length">
        <td v-text="item.id"></td>
        <td v-text="item.fullName"></td>
        <td>
          <router-link class="btn btn-secondary" :to="{ name: 'edit-user', params: {id: item.id} }">edit</router-link>
        </td>
        <td>
          <button class="btn btn-danger" @click="del(item.id)">delete</button>
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
  name: "EmployeeView",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('employee', { employees: 'getAllItems', getEmployee: 'getOneItem' }),
  },
  methods: {
    ...mapActions('employee', { save: 'add', remove: 'remove', getAll: 'findAll'}),
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