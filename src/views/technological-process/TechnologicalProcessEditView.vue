<template>
  <div class="container">
    <div>
      <h1>Добавление участков и сотрудников</h1>
    </div>

    <hr>

    <form @submit.prevent="sendForm" v-if="workplaceDownloadFlag">
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
      <template v-if="orderDownloadFlag || orderDownloadPageableFlag || downloadOnceItem">
        <tbody v-if="_technologicalProcesses.length">
        <tr v-for="item in _technologicalProcesses"
            :key="item.id">
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
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="20" class="text-center">Список пуст!</td>
        </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import cloneDeep from 'lodash.clonedeep'

export default {
  name: "TechnologicalProcessEditView",
  data() {
    return {
      order: {},
      downloadOnceItem: false,
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
    orderId() {
      return Number(this.$route.params.id);
    },
    ...mapGetters('order', {
      orderDownloadFlag: 'getDownloadFlag',
      orderDownloadPageableFlag: 'getDownloadPageableFlag',
      orderGetOneItem: 'getOneItem',
      orderGetOneItemPageable: 'getOneItemPageable',
    }),
    ...mapGetters('workplace', {workplaces: 'getAllItems', workplaceDownloadFlag: 'getDownloadFlag'}),
    _technologicalProcesses() {
      if (this.orderDownloadFlag || this.orderDownloadPageableFlag || this.downloadOnceItem)
        return this.order.technologicalProcesses.sort((a, b) => a.operationCode - b.operationCode);
    },
  },
  methods: {
    ...mapActions('technologicalProcess', {
      saveTechnologicalProcess: 'add',
      removeTechnologicalProcess: 'remove',
    }),
    ...mapActions('order', {orderFindOne: 'findOne', orderFindOnePageable: 'findOnePageable',}),
    sendForm() {
      this.newTechnologicalProcess.order.id = this.order.id;
      this.newTechnologicalProcess.employee.id = this.selectedEmployee.id;
      this.newTechnologicalProcess.workplace.id = this.selectedWorkplace.id;
      this.saveTechnologicalProcess(this.newTechnologicalProcess).then(() => {

        if (this.orderDownloadFlag) {
          this.orderFindOne(this.orderId).then(() => {
            this.order = cloneDeep(this.orderGetOneItem(this.orderId));
          });
        } else if (this.orderDownloadPageableFlag) {
          console.log('orderDownloadPageableFlag save')
          this.orderFindOnePageable(this.orderId).then(() => {
            this.order = cloneDeep(this.orderGetOneItemPageable(this.orderId));
          });
        } else if (this.downloadOnceItem) {
          this.orderFindOne(this.orderId).then((data) => {
            this.order = data;
          });
        }

        this.newTechnologicalProcess.operationCode = '';
        this.selectedEmployee = {};
        this.selectedWorkplace = {};
      });
    },
    del(id) {
      this.removeTechnologicalProcess(id).then(() => {
        if (this.orderDownloadFlag) {
          this.orderFindOne(this.orderId).then(() => {
            this.order = cloneDeep(this.orderGetOneItem(this.orderId));
          });
        } else if (this.orderDownloadPageableFlag) {
          console.log('orderDownloadPageableFlag del')
          this.orderFindOnePageable(this.orderId).then(() => {
            this.order = cloneDeep(this.orderGetOneItemPageable(this.orderId));
          });
        } else if (this.downloadOnceItem) {
          this.orderFindOne(this.orderId).then((data) => {
            this.order = data;
          });
        }
      });
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
  },
  mounted() {

  },
  created() {
    /*
        if (this.$store.getters['authorization/isAuthenticated']) {
          if (!this.$store.getters['order/getDownloadFlag']) this.$store.dispatch('order/findAll');
          if (!this.$store.getters['workplace/getDownloadFlag']) this.$store.dispatch('workplace/findAll');
        }
    */

    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['workplace/getDownloadFlag']) this.$store.dispatch('workplace/findAll');
      if (this.$store.getters['order/getDownloadFlag']) {
        this.order = cloneDeep(this.$store.getters['order/getOneItem'](this.orderId));
      } else if (this.$store.getters['order/getDownloadPageableFlag']) {
        this.order = cloneDeep(this.$store.getters['order/getOneItemPageable'](this.orderId));
      } else {
        this.$store.dispatch('order/findOne', this.orderId).then((data) => {
          this.downloadOnceItem = true;
          this.order = data;
        });
      }
    }
  }
}

</script>

<style scoped>

</style>