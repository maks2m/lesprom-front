<template>
  <div class="container">
    <div>
      <h1>Добавление участков и сотрудников</h1>
    </div>

    <hr>

    <form @submit.prevent="sendForm">
      <div class="row">
        <div class="input-group">
          <span class="input-group-text" id="inputNumberOrderOther">Код операции</span>
          <input type="number" min="0" step="1"
                 class="form-control"
                 id="inputNumberOrderOther"
                 v-model="newTechnologicalProcess.operationCode">
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
        <th v-for="item in arrSeparateAbc"
            :key="item.column">
          <div :class="item.column === 'operationCode' ? 'bi-caret-down' : ''">{{ item.text }}</div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in _technologicalProcesses"
          :key="item.id"
          v-if="_technologicalProcesses.length">
        <td v-text="item.operationCode"></td>
        <td v-text="item.workplace.nameWorkplace"></td>
        <td v-text="item.employee.fullName"></td>
        <td v-text="getTime(item.timeStartWork)"></td>
        <td v-text="getTime(item.timeFinishWork)"></td>
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
import moment from "moment";

export default {
  name: "TechnologicalProcessEditView",
  data() {
    return {
      newOrder: {},
      selectedWorkplace: {},
      selectedEmployee: {},
      arrSeparateAbc: [
        {column: 'operationCode', text: 'Код операции', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'workplace', text: 'Участок', sorted: false, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'employee', text: 'Сотрудник', sorted: false, showIcon: false, separated: 'desc', type: 'text'},
        {
          column: 'timeStartWork',
          text: 'Дата начала работ',
          sorted: false,
          showIcon: false,
          separated: 'desc',
          type: 'text'
        },
        {
          column: 'timeFinishWork',
          text: 'Дата окончания работ',
          sorted: false,
          showIcon: false,
          separated: 'desc',
          type: 'text'
        },
        {column: 'edit', text: 'Редактирование', sorted: false, showIcon: false, separated: '', type: ''},
      ],
      newTechnologicalProcess: {
        id: '',
        timeStartWork: '',
        timeFinishWork: '',
        operationCode: '',
        employee: {
          id: '',
        },
        order: {
          id: '',
        },
        workplace: {
          id: '',
        },
      },
    }
  },
  computed: {
    editOrderId() {
      return Number(this.$route.params.id);
    },
    ...mapGetters('workplace', {workplaces: 'getAllItems', downloadFlag: 'getDownloadFlag'}),
    ...mapGetters('technologicalProcess', {technologicalProcesses: 'getAllItems'}),
    _technologicalProcesses() {
      return this.technologicalProcesses.filter(t => t.order.id === this.editOrderId);
    },
    order() {
      return this.$store.getters['order/getOneItem'](Number(this.editOrderId));
    },
  },
  methods: {
    ...mapActions('technologicalProcess', {
      saveTechnologicalProcess: 'add',
      removeTechnologicalProcess: 'remove',
      setItemsSorted: 'setItemsSorted'
    }),
    ...mapActions('order', {replaceOrder: 'add'}),
    sendForm() {
      this.newTechnologicalProcess.order.id = this.order.id;
      this.newTechnologicalProcess.employee.id = this.selectedEmployee.id;
      this.newTechnologicalProcess.workplace.id = this.selectedWorkplace.id;
      this.saveTechnologicalProcess(this.newTechnologicalProcess).then(() => {
        this.$store.dispatch('technologicalProcess/setItemsSorted', {column: 'operationCode', separated: 'asc', type: 'number'});
      });
    },
    del(id) {
      this.removeTechnologicalProcess(id);
    },
    getTime(time) {
      const option = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      if (time !== null)
        return new Date(time).toLocaleString('ru', option);
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
    this.$store.dispatch('technologicalProcess/setItemsSorted', {column: 'operationCode', separated: 'asc', type: 'number'});
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['order/getDownloadFlag']) this.$store.dispatch('order/findAll');
      if (!this.$store.getters['workplace/getDownloadFlag']) this.$store.dispatch('workplace/findAll');
      if (!this.$store.getters['technologicalProcess/getDownloadFlag']) this.$store.dispatch('technologicalProcess/findAll');
    }
  }
}
</script>

<style scoped>

</style>