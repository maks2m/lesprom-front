<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Order</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'order-edit', params: {id: -1} }">new</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Number order</th>
        <th>Start Date</th>
        <th>Finish Date;</th>
        <th>Baguette</th>
        <th>Cutter</th>
        <th>Workplaces</th>
        <th>Time Of Employee On Orders</th>
        <th>Order Description</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length">
        <td v-text="item.id"></td>
        <td v-text="item.numberOrder"></td>
        <td v-text="new Date(item.startDate).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric'})"></td>
        <td v-text="new Date(item.finishDate).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric'})"></td>
        <td v-text="item.baguette.baguetteName"></td>
        <td v-text="item.cutter.cutterName"></td>
        <td>
          <div v-for="workplace in item.workplaces" :key="workplace.id">
            {{ workplace.nameWorkplace }}
          </div>
        </td>
        <td>
          <div v-for="timeOfEmployeeOnOrder in item.timeOfEmployeeOnOrders" :key="timeOfEmployeeOnOrder.id">
            {{ timeOfEmployeeOnOrder.employee.fullName }}
            <br>
            timeStartWork - {{ timeOfEmployeeOnOrder.timeFinishWork.toString() }}
<!--            <div v-text="new Date(2022,7,20,9,36,49).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })"></div>-->
            <br>
            timeFinishWork - {{ timeOfEmployeeOnOrder.timeFinishWork.toString() }}
<!--            <div v-text="new Date(timeOfEmployeeOnOrder.timeFinishWork.toString()).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })"></div>-->
          </div>
        </td>
        <td v-text="item.orderDescription"></td>
        <td>
          <div class="btn-group">
            <router-link class="btn btn-secondary" :to="{ name: 'order-edit', params: {id: item.id} }">edit</router-link>
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
  name: "OrderView",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('order', { items: 'getAllItems', getItem: 'getOneItem' }),
    localeDate() {
      return (new Date(this.date)).toLocaleDateString()
    },
  },
  methods: {
    ...mapActions('order', { save: 'add', remove: 'remove', getAll: 'findAll'}),
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