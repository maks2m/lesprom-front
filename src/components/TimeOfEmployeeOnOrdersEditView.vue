<template>
  <div class="container">
    <div>
      <h1>Добавление участков и сотрудников</h1>
    </div>

    <hr>

    <form @submit.prevent="sendForm">
      <div class="row">
        <div class="input-group">
          <span class="input-group-text" id="selectWorkplace">Участок</span>
          <select id="selectWorkplace"
                  class="form-select"
                  v-model="selectedWorkplace">
            <option disabled selected value="">Выберите участок</option>
            <option v-for="workplace in workplaces"
                    :key="workplace.id"
                    :value="workplace">
              {{ workplace.nameWorkplace }}
            </option>
          </select>
          <span class="input-group-text" id="selectEmployee">Сотрудник</span>
          <select id="selectEmployee"
                  class="form-select"
                  v-model="selectedEmployee">
            <option disabled selected value="">Выберите сотрудника</option>
            <option v-for="employee in selectedWorkplace.employees"
                    :key="employee.id"
                    :value="employee">
              {{ employee.fullName }}
            </option>
          </select>
          <button class="btn btn-primary">добавить</button>
          <button class="btn btn-danger" type="reset">Отмена</button>
        </div>
      </div>
    </form>

    <hr>

    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>Участок</th>
        <th>Сотрудник</th>
        <th>Редактирование</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in _timeOfEmployeeOnOrders"
          :key="item.id"
          v-if="_timeOfEmployeeOnOrders.length">
        <td v-text="item.employee.workplaces.find(w => order.workplaces.some(_w => _w.id === w.id)).nameWorkplace"></td>
        <td v-text="item.employee.fullName"></td>
        <td>
          <div class="btn-group">
            <button class="btn btn-danger" @click="del(item.id)">Удалить</button>
          </div>
        </td>
      </tr>
      <tr v-else>
        <td>Список пуст!</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TimeOfEmployeeOnOrdersEditView",
  data() {
    return {
      newOrder: {},
      selectedWorkplace: {},
      selectedEmployee: {},
      newTimeOfEmployeeOnOrder: {
        id: '',
        timeStartWork: '',
        timeFinishWork: '',
        employee: {
          id: '',
        },
        order: {
          id: '',
        },
      },
    }
  },
  computed: {
    editOrderId() {
      return Number(this.$route.params.id);
    },
    ...mapGetters('workplace', { workplaces: 'getAllItems', downloadFlag: 'getDownloadFlag' }),
    ...mapGetters('timeOfEmployeeOnOrder', { timeOfEmployeeOnOrders: 'getAllItems' }),
    _timeOfEmployeeOnOrders() {
      return this.timeOfEmployeeOnOrders.filter(t => t.order.id === this.editOrderId);
    },
    order() {
      return this.$store.getters['order/getOneItem'](Number(this.editOrderId));
    },
  },
  methods: {
    ...mapActions('timeOfEmployeeOnOrder', { saveTimeOfEmployeeOnOrder: 'add', removeTimeOfEmployeeOnOrder: 'remove' }),
    ...mapActions('order', { replaceOrder: 'replace' }),
    sendForm() {
      this.newOrder = JSON.parse(JSON.stringify(this.order));
      this.newOrder.workplaces.push(this.selectedWorkplace);
      this.replaceOrder(this.newOrder);

      this.newTimeOfEmployeeOnOrder.order = this.order;
      this.newTimeOfEmployeeOnOrder.employee = this.selectedEmployee;
      this.saveTimeOfEmployeeOnOrder(this.newTimeOfEmployeeOnOrder);
    },
    del(id) {
      this.removeTimeOfEmployeeOnOrder(id);
    }
  }
}
</script>

<style scoped>

</style>