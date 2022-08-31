<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Заказы</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'order-edit', params: {id: 'new'} }">Добавить
        </router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th v-for="item in arrSeparateAbc"
            :key="item.column"
            @click="sortedOnTable(item)">
          <div class="row">
            <div class="col-6">{{ item.text }}</div>
            <div v-show="item.showIcon" class="col-6">
              <span v-if="item.separated === 'asc'"><i class="bi bi-chevron-expand"></i></span>
              <span v-else-if="item.separated === 'desc'"><i class="bi bi-chevron-expand"></i></span>
            </div>
          </div>
        </th>
        <th v-for="workplace in workplaces">{{ workplace.nameWorkplace }}</th>
        <th>Редактирование</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length"
          @dblclick="this.$router.push({ name: 'order-edit', params: {id: item.id} })">
        <td v-text="item.numberOrder"></td>
        <td v-text="item.numberOrderOther"></td>
        <td v-for="workplace in workplaces">
          <div v-for="timeOfEmployeeOnOrder in item.timeOfEmployeeOnOrders">
            <div  class="btn-group m-1" v-if="timeOfEmployeeOnOrder.employee.workplaces.some(w => w.id === workplace.id)">
              <div class="btn"
                   :class="setClassBtnEmployee(timeOfEmployeeOnOrder)"
                   @click="addDateEmployee(timeOfEmployeeOnOrder, item)">
                {{ timeOfEmployeeOnOrder.employee.fullName }}
              </div>
              <div class="btn-group">
                <div class="btn btn-outline-danger" @click="delDateEmployee(timeOfEmployeeOnOrder, item)">-</div>
              </div>
            </div>
          </div>
        </td>

        <td>
          <router-link class="btn btn-secondary m-1" :to="{ name: 'order-edit', params: {id: item.id} }">Редактировать
            заказ
          </router-link>
          <router-link class="btn btn-info m-1" :to="{ name: 'order-manager-edit-add-employees', params: {id: item.id} }">
            Добавить сотрудников
          </router-link>
          <button class="btn btn-danger m-1" @click="del(item.id)">Удалить</button>
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
import moment from "moment";

export default {
  name: "OrderTechnologistView",
  data() {
    return {
      arrSeparateAbc: [
        {column: 'numberOrder', text: 'Номер заказа', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'numberOrderOther', text: 'Номер заказа (другое)', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
      ],
      itemsSorted: [],
    }
  },
  computed: {
    ...mapGetters('order', {items: 'getAllItems'}),
    ...mapGetters('workplace', {workplaces: 'getAllItems'}),
  },
  methods: {
    ...mapActions('order', {save: 'add', getAll: 'findAll', setItemsSorted: 'setItemsSorted', replaceTimeInOrder: 'replaceTime'}),
    ...mapActions('timeOfEmployeeOnOrder', { updateTime: 'add'}),

    setClassBtnEmployee(timeOfEmployeeOnOrder) {
      if (timeOfEmployeeOnOrder.timeStartWork === null && timeOfEmployeeOnOrder.timeFinishWork === null) {
        return ['btn-danger'];
      }
      if (timeOfEmployeeOnOrder.timeStartWork !== null && timeOfEmployeeOnOrder.timeFinishWork === null) {
        return ['btn-warning'];
      }
      if (timeOfEmployeeOnOrder.timeStartWork !== null && timeOfEmployeeOnOrder.timeFinishWork !== null) {
        return ['btn-success'];
      }
    },
    addDateEmployee(timeOfEmployeeOnOrder, order) {
      let updateTimeOfEmployeeOnOrder = simpleClone(timeOfEmployeeOnOrder, order.id);
      console.log(order);
      if (updateTimeOfEmployeeOnOrder.timeStartWork === null && updateTimeOfEmployeeOnOrder.timeFinishWork === null) {
        updateTimeOfEmployeeOnOrder.timeStartWork = arrDate(new Date());
        this.updateTime(updateTimeOfEmployeeOnOrder);
      } else if (updateTimeOfEmployeeOnOrder.timeStartWork !== null && updateTimeOfEmployeeOnOrder.timeFinishWork === null) {
        updateTimeOfEmployeeOnOrder.timeFinishWork = arrDate(new Date());
        this.updateTime(updateTimeOfEmployeeOnOrder);
      }
      function arrDate (date) {
        return [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
      }
      console.log('+');
      this.getAll();
    },
    delDateEmployee(timeOfEmployeeOnOrder, order) {
      let updateTimeOfEmployeeOnOrder = simpleClone(timeOfEmployeeOnOrder, order.id);
      console.log(updateTimeOfEmployeeOnOrder);
      if (updateTimeOfEmployeeOnOrder.timeStartWork !== null && updateTimeOfEmployeeOnOrder.timeFinishWork !== null) {
        updateTimeOfEmployeeOnOrder.timeFinishWork = null;
        this.updateTime(updateTimeOfEmployeeOnOrder);
      } else if (updateTimeOfEmployeeOnOrder.timeStartWork !== null && updateTimeOfEmployeeOnOrder.timeFinishWork === null) {
        updateTimeOfEmployeeOnOrder.timeStartWork = null;
        this.updateTime(updateTimeOfEmployeeOnOrder);
      }
      console.log('-')
      this.getAll();
    },
    del(id) {
      this.remove(id);
    },
    getLocalDate(arr) {
      return moment(arr).format('DD.MM.YYYY');
    },
    sortedOnTable(item) {
      if (!item.sorted) return;
      this.arrSeparateAbc.forEach(i => i.showIcon = false);
      item.showIcon = true;
      switch (item.separated) {
        case 'asc':
          item.separated = 'desc';
          break;
        case 'desc':
          item.separated = 'asc';
          break;
      }
      this.setItemsSorted(item);
    },
  },
  mounted() {
    this.$store.dispatch('workplace/setItemsSorted', {column: 'sequence', separated: 'asc', type: 'number'});
  },
  created() {
    this.getAll();
  }
}

function simpleClone(parent, orderId) {
  let clone = {
    order: { id: '' },
    employee: { id: '' },
    timeFinishWork: [],
    timeStartWork: [],
  };
  for (let key1 in parent) {
    if (!(parent[key1] instanceof Object)) {
      clone[key1] = parent[key1];
    }
  }
  clone.timeStartWork = parent.timeStartWork;
  clone.timeFinishWork = parent.timeFinishWork;
  clone.order.id = orderId;
  clone.employee.id = parent.employee.id;
  return clone;
}
</script>

<style scoped>

</style>