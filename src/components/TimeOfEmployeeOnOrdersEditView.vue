<template>
  <div class="container">
    <form @submit.prevent="sendForm">
      <div>
        <h1>Add Workplaces and Employees</h1>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-3 mt-2"
             v-for="workplace in workplaces"
             :key="workplace.id">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox" :value="workplace"
                   v-model="useWorkplaces">
            <label class="form-check-label" for="inlineCheckbox">{{ workplace.nameWorkplace }}</label>
          </div>
          <select id="selectWorkplace"
                  class="form-select"
                  multiple
                  v-show="useWorkplaces.some(u => u.id === workplace.id)">
            <option disabled value="">Выберите вариант</option>
            <option v-for="employee in workplace.employees"
                    :key="employee.id"
                    :value="employee.id"
                    :selected="_timeOfEmployeeOnOrders.some((t) => t.employee.id === employee.id)">
              {{ employee.fullName }}
            </option>
          </select>
        </div>
      </div>

      <hr>

      <div class="row mb-2">
        <div class="col-1">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
        <div class="col-1">
          <button type="reset" class="btn btn-danger">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "TimeOfEmployeeOnOrdersEditView",
  props: {
    editOrderId: '',
  },
  data() {
    return {
      useWorkplaces: [],
      newTimeOfEmployeeOnOrders: [
        {

        }
      ],
    }
  },
  computed: {
    ...mapGetters('workplace', {workplaces: 'getAllItems', downloadFlag: 'getDownloadFlag'}),
    ...mapGetters('timeOfEmployeeOnOrder', {timeOfEmployeeOnOrders: 'getAllItems'}),
    _timeOfEmployeeOnOrders() {
      if (this.editOrderId !== 'new') {
        return this.timeOfEmployeeOnOrders.filter(t => t.order.id === Number(this.editOrderId));
      } else {
        return [];
      }
    },
  },

  mounted() {
    /**
     * загрузка данных о предыдущих выбранных участках (Workplaces)
     */
    this.useWorkplaces = this.workplaces.filter(w => this._timeOfEmployeeOnOrders.some(_t => _t.employee.workplaces.some(_w => _w.id === w.id)));
  },
  created() {
    if (!this.$store.getters['timeOfEmployeeOnOrder/getDownloadFlag']) this.$store.dispatch('timeOfEmployeeOnOrder/findAll');
    if (!this.$store.getters['workplace/getDownloadFlag']) this.$store.dispatch('workplace/findAll');
  },
  methods: {
    ...mapActions('timeOfEmployeeOnOrder', {addTimeOfEmployeeOnOrder: 'add'}),
    sendForm() {
      this._timeOfEmployeeOnOrders.forEach(_t => this.addTimeOfEmployeeOnOrder(_t));
      //this.$router.push('/order');
    },
  }

}
</script>

<style scoped>

</style>