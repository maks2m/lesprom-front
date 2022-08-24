<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Order</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'order-edit', params: {id: 'new'} }">new</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Number order</th>
        <th>Number order (Other)</th>
        <th>Start Date</th>
        <th>Finish Date</th>
        <th>Duty</th>
        <th>Color</th>
        <th>Wood Mass</th>
        <th>Wood Veneer</th>
        <th>Radius</th>
        <th>Glass</th>
        <th>Binding</th>
        <th>Baguette</th>
        <th>Cutter</th>
        <th>Workplaces</th>
        <th>Time Of Employee On Orders</th>
        <th>Notes</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length" @dblclick="this.$router.push({ name: 'order-edit', params: {id: item.id} })">
        <td v-text="item.id"></td>
        <td v-text="item.numberOrder"></td>
        <td v-text="item.numberOrderOther"></td>
        <td v-text="new Date(item.startDate).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric'})"></td>
        <td v-text="new Date(item.finishDate).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric'})"></td>
        <td v-text="item.duty"></td>
        <td v-text="item.color"></td>
        <td v-text="item.woodMass"></td>
        <td v-text="item.woodVeneer"></td>
        <td v-text="item.radius"></td>
        <td v-text="item.glass"></td>
        <td v-text="item.binding"></td>

        <td>
          <div v-for="baguette in item.baguettes" :key="baguette.id">
            {{ baguette.baguetteName }}
          </div>
        </td>
        <td>
          <div v-for="cutter in item.cutters" :key="cutter.id">
            {{ cutter.cutterName }}
          </div>
        </td>
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
        <td v-text="item.notes"></td>
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