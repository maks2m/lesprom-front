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
      <tr v-for="(item) in orders" :key="item.id" v-if="orders.length"
          @dblclick="this.$router.push({ name: 'order-edit', params: {id: item.id} })">
        <td v-text="item.numberOrder"></td>
        <td v-text="item.numberOrderOther"></td>
        <td v-for="workplace in workplaces">
          <div v-for="technologicalProcess in _technologicalProcesses(item.id)">
            <div class="btn-group m-1" v-if="technologicalProcess.workplace.id === workplace.id">
              <div class="btn"
                   :class="getClassBtnFindAndNotUndefined(technologicalProcess)"
                   @click="addDateEmployee(technologicalProcess, item)">
                {{ technologicalProcess.employee.fullName }}
                <!--                {{ arrClassesBtn.find(a => a.id === technologicalProcess.workplace.id.toString() + technologicalProcess.employee.id.toString()) }}-->
                <!--                {{ getClassBtnEmployeeToArr(technologicalProcess) }}-->
              </div>
              <div class="btn-group">
                <div class="btn btn-outline-danger" @click="delDateEmployee(technologicalProcess, item)">-</div>
              </div>
            </div>
          </div>
        </td>

        <td>
          <router-link class="btn btn-secondary m-1" :to="{ name: 'order-edit', params: {id: item.id} }">Редактировать
            заказ
          </router-link>
          <router-link class="btn btn-info m-1"
                       :to="{ name: 'order-manager-edit-add-employees', params: {id: item.id} }">
            Добавить сотрудников
          </router-link>
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
        {
          column: 'numberOrderOther',
          text: 'Номер заказа (другое)',
          sorted: true,
          showIcon: false,
          separated: 'desc',
          type: 'text'
        },
      ],
      itemsSorted: [],
      arrClassesBtn: [],
    }
  },
  computed: {
    ...mapGetters('order', {orders: 'getAllItems'}),
    ...mapGetters('technologicalProcess', {technologicalProcesses: 'getAllItems'}),
    ...mapGetters('workplace', {workplaces: 'getAllItems'}),
  },
  methods: {
    ...mapActions('order', {setItemsSorted: 'setItemsSorted'}),
    ...mapActions('technologicalProcess', {updateTime: 'add'}),

    _technologicalProcesses(id) {
      return this.technologicalProcesses.filter(t => t.order.id === id);
    },

    /**
     * функция собирает ID classBtn из ID order, ID workplace, ID employee
     * @param technologicalProcess
     * @returns {string}
     */
    calculateIdClassBtn(technologicalProcess) {
      return technologicalProcess.order.id.toString() + technologicalProcess.workplace.id.toString() + technologicalProcess.employee.id.toString();
    },
    /**
     * функция ищет по ID classBtn и проверяет его на undefined
     * @param technologicalProcess
     * @returns {[string]|[string]|[string]|*}
     */
    getClassBtnFindAndNotUndefined(technologicalProcess) {
      const classBtn = this.arrClassesBtn.find(a => a.id === this.calculateIdClassBtn(technologicalProcess));
      if (classBtn !== undefined) return classBtn.arrClasses;
    },

    /**
     * функция заполняет массив arrClassesBtn объектами при старте странички
     * а также обновляет значения массива при нажатии на кнопки "+(имя сотрудника)" и "-"
     * @param technologicalProcess
     */
    setClassBtnToArr(technologicalProcess) {
      let newClassBtn = {};
      const id = this.calculateIdClassBtn(technologicalProcess);
      if (technologicalProcess.timeStartWork === null && technologicalProcess.timeFinishWork === null) {
        newClassBtn = {id: id, arrClasses: ['btn-danger']};
      }
      if (technologicalProcess.timeStartWork !== null && technologicalProcess.timeFinishWork === null) {
        newClassBtn = {id: id, arrClasses: ['btn-warning']};
      }
      if (technologicalProcess.timeStartWork !== null && technologicalProcess.timeFinishWork !== null) {
        newClassBtn = {id: id, arrClasses: ['btn-success']};
      }
      const classBtn = this.arrClassesBtn.find(c => c.id === id)
      if (classBtn) {
        this.arrClassesBtn = this.arrClassesBtn.map(o => o.id === newClassBtn.id ? newClassBtn : o)
      } else {
        this.arrClassesBtn.push(newClassBtn);
      }
    },

    /**
     * функция добавления времени взятия в работу и отработки технологической операции
     * так же стартует промис сохранения данных на сервер
     * и, после выполнения промиса, обновляется класс кнопки через массив arrClassesBtn
     * @param technologicalProcess
     * @param order
     */
    addDateEmployee(technologicalProcess, order) {
      let updateTechnologicalProcess = simpleClone(technologicalProcess, order.id);
      if (updateTechnologicalProcess.timeStartWork === null && updateTechnologicalProcess.timeFinishWork === null) {
        updateTechnologicalProcess.timeStartWork = Date.now();
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.setClassBtnToArr(updateTechnologicalProcess);
        });
      } else if (updateTechnologicalProcess.timeStartWork !== null && updateTechnologicalProcess.timeFinishWork === null) {
        updateTechnologicalProcess.timeFinishWork = Date.now();
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.setClassBtnToArr(updateTechnologicalProcess);
        });
      }
    },
    /**
     * функция удаления времени взятия в работу и отработки технологической операции
     * так же стартует промис сохранения данных на сервер
     * и, после выполнения промиса, обновляется класс кнопки через массив arrClassesBtn
     * @param technologicalProcess
     * @param order
     */
    delDateEmployee(technologicalProcess, order) {
      let updateTechnologicalProcess = simpleClone(technologicalProcess, order.id);
      if (updateTechnologicalProcess.timeStartWork !== null && updateTechnologicalProcess.timeFinishWork !== null) {
        updateTechnologicalProcess.timeFinishWork = null;
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.setClassBtnToArr(updateTechnologicalProcess);
        });
      } else if (updateTechnologicalProcess.timeStartWork !== null && updateTechnologicalProcess.timeFinishWork === null) {
        updateTechnologicalProcess.timeStartWork = null;
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.setClassBtnToArr(updateTechnologicalProcess);
        });
      }
    },

    /**
     * функция сортировки основных элементов таблицы
     * @param item
     */
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
    this.$store.dispatch('workplace/setItemsSorted', {column: 'id', separated: 'asc', type: 'text'});
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['order/getDownloadFlag']) this.$store.dispatch('order/findAll');
      if (!this.$store.getters['workplace/getDownloadFlag']) this.$store.dispatch('workplace/findAll');
      if (!this.$store.getters['technologicalProcess/getDownloadFlag']) {
        this.$store.dispatch('technologicalProcess/findAll').then(() => {
          this.technologicalProcesses.forEach(t => this.setClassBtnToArr(t));
        });
      } else {
        this.technologicalProcesses.forEach(t => this.setClassBtnToArr(t));
      }
    }
  },
}

/**
 * Функция создания простого клона объекта technologicalProcess
 * @param parent
 * @param orderId
 * @returns {{employee: {id: string}, workplace: {id: string}, order: {id: string}}}
 */
function simpleClone(technologicalProcess, orderId) {
  let clone = {
    order: {id: ''},
    employee: {id: ''},
    workplace: {id: ''},
  };
  for (let key1 in technologicalProcess) {
    if (!(technologicalProcess[key1] instanceof Object)) {
      clone[key1] = technologicalProcess[key1];
    }
  }
  clone.order.id = orderId;
  clone.employee.id = technologicalProcess.employee.id;
  clone.workplace.id = technologicalProcess.workplace.id;
  return clone;
}
</script>

<style scoped>

</style>