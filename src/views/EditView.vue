<template>
  <div class="container">
    <div>
      <h1>Edit</h1>
    </div>
    <form class="row g-3">
      <div class="col-md-6">
        <label for="inputId" class="form-label">ID</label>
        <input type="text" class="form-control" readonly="readonly" id="inputId" v-model="selectedEmployee.id">
      </div>
      <div class="col-md-6">
        <label for="inputFullName" class="form-label">Full name</label>
        <input type="text" class="form-control" id="inputFullName" v-model="selectedEmployee.fullName">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "EditView",
  data() {
    return {
      item: {
        id: '1',
        fullName: 'Egorov',
      }
    }
  },
  computed: {
    ...mapGetters('employee', { getOne: 'getOneItem' }),
    selectedEmployeeID() {
      return Number(this.$route.params.id);
    },
    selectedEmployee() {
      return this.$store.getters['employee/getOneItem'](this.selectedEmployeeID);
    }
  },
  mounted() {
/*
    let item = this.getEmployee(1);
    console.log(item);
    this.item = this.getEmployee(this.$route.params.id);
*/
  },
  methods: {
    ...mapActions('employee', { addEmployee: 'add' }),

  }
}
</script>

<style scoped>

</style>