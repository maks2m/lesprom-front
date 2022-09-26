<template>
  <div class="container-fluid">
    <div class="row">
      <h3 class="col-auto text-black m-2">Заказы</h3>
      <div class="col-auto m-2">
        <div class="input-group">
          <label for="selectBaguette" class="input-group-text">Выберите участок</label>
          <select id="selectBaguette"
                  class="form-select"
                  v-model="selectedWorkplace"
                  @change="saveWorkplaceInLocaleStorage($event.target.options)">
            <option disabled value="">Выберите участок</option>
            <option v-for="workplace in workplaces"
                    :key="workplace.id"
                    :value="workplace">
              {{ workplace.nameWorkplace }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th v-for="item in arrSeparateAbc"
            :key="item.column">
          <div class="row">
            <div class="col-6">{{ item.text }}</div>
            <div v-show="item.showIcon" class="col-6">
              <span v-if="item.separated === 'asc'"><i class="bi bi-chevron-expand"></i></span>
              <span v-else-if="item.separated === 'desc'"><i class="bi bi-chevron-expand"></i></span>
            </div>
          </div>
        </th>
      </tr>
      </thead>
      <template v-if="downloadFlag">
        <tbody v-if="_order.length">
        <tr v-for="(order) in _order" :key="order.id">
          <!--          @dblclick="this.$router.push({ name: 'order-edit', params: {id: item.id} })">-->
          <td v-text="order.numberOrder"></td>
          <td v-text="order.numberOrderOther"></td>

          <td>
            <div v-for="technologicalProcess in order.technologicalProcesses.filter(t => t.workplace.id === selectedWorkplace.id)">
              <div class="btn-group m-1">
                <div class="btn"
                     :class="getClassBtnFindAndNotUndefined(technologicalProcess)"
                     @click="addDateEmployee(technologicalProcess, order)">
                  {{ technologicalProcess.employee.fullName }}
                </div>
              </div>
            </div>
          </td>

          <td>
            <router-link class="btn btn-secondary m-1" :to="{ name: 'order-view', params: {id: order.id} }">Подробно
            </router-link>
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
import cloneDeep from "lodash.clonedeep";

export default {
  name: "OrderWorkplaceView",
  data() {
    return {
      selectedWorkplace: {},
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
        {column: 'employee', text: 'Сотрудники', sorted: false, showIcon: false, separated: '', type: ''},
        {column: 'edit', text: 'Редактирование', sorted: false, showIcon: false, separated: '', type: ''},
      ],
      arrClassesBtn: [],
    }
  },
  computed: {
    ...mapGetters('order', {
      orders: 'getOrdersOnWorkplace',
      downloadFlag: 'getDownloadOrdersOnWorkplaceFlag',
    }),
    ...mapGetters('workplace', {workplaces: 'getAllItems'}),
    _order() {
      return this.orders;
    },
  },
  methods: {
    ...mapActions('order', {changeUrlParam: 'changeUrlParam'}),
    ...mapActions('technologicalProcess', {updateTime: 'add'}),

    saveWorkplaceInLocaleStorage(selected) {
      this.selectedWorkplace = selected[selected.selectedIndex]._value;
      this.$store.dispatch('order/findAllOnWorkplace', this.selectedWorkplace.id).then(() => {
        localStorage.setItem('active_workplace', JSON.stringify(selected[selected.selectedIndex]._value));
        this.orders.forEach(o => {
          o.technologicalProcesses.forEach(t => this.setClassBtnToArr(t));
        })
      });
    },

    /**
     * функция ищет по ID classBtn и проверяет его на undefined
     * @param technologicalProcess
     * @returns {[string]|[string]|[string]|*}
     */
    getClassBtnFindAndNotUndefined(technologicalProcess) {
      const classBtn = this.arrClassesBtn.find(a => a.id === technologicalProcess.id);
      if (classBtn !== undefined) return classBtn.arrClasses;
    },

    /**
     * функция заполняет массив arrClassesBtn объектами при старте странички
     * а также обновляет значения массива при нажатии на кнопки "+(имя сотрудника)" и "-"
     * @param technologicalProcess
     */
    setClassBtnToArr(technologicalProcess) {
      let newClassBtn = {};
      const id = technologicalProcess.id;
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
     * @param technologicalProcess технологический процесс
     * @param order заказ
     */
    addDateEmployee(technologicalProcess, order) {
      let updateTechnologicalProcess = cloneDeep(technologicalProcess);
      updateTechnologicalProcess.order = {id: order.id};
      if (updateTechnologicalProcess.timeStartWork === null && updateTechnologicalProcess.timeFinishWork === null) {
        updateTechnologicalProcess.timeStartWork = Date.now();
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.$store.dispatch('order/findAllOnWorkplace', this.selectedWorkplace.id).then(() => {
            this.$store.dispatch('order/changeDownloadFlag', false)
            this.$store.dispatch('order/changeDownloadPageableFlag', false)
            this.setClassBtnToArr(updateTechnologicalProcess);
          });
        });
      } else if (updateTechnologicalProcess.timeStartWork !== null && updateTechnologicalProcess.timeFinishWork === null) {
        updateTechnologicalProcess.timeFinishWork = Date.now();
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.$store.dispatch('order/findAllOnWorkplace', this.selectedWorkplace.id).then(() => {
            this.$store.dispatch('order/changeDownloadFlag', false)
            this.$store.dispatch('order/changeDownloadPageableFlag', false)
            this.setClassBtnToArr(updateTechnologicalProcess);
          });
        });
      }
      //this.$store.dispatch('order/changeDownloadOrdersOnWorkplaceFlag', false)
    },

    /**
     * Функция установки параметров в хуке create
     */
    setOptionsInCreateHook() {
      if (localStorage.getItem('active_workplace')) {
        this.selectedWorkplace = JSON.parse(localStorage.getItem('active_workplace'));
      }
    }
  },
  mounted() {
  },
  created() {
    this.setOptionsInCreateHook();
    if (this.$store.getters['authorization/isAuthenticated']) {
      this.changeUrlParam({
        pageNo: -1,
        pageSize: '',
        sortBy: 'id',
      });
      if (!this.$store.getters['order/getDownloadOrdersOnWorkplaceFlag']) {
        this.$store.dispatch('order/findAllOnWorkplace', this.selectedWorkplace.id).then(() => {
          this.orders.forEach(o => {
            o.technologicalProcesses.forEach(t => this.setClassBtnToArr(t));
          })
        });
      } else {
        this.orders.forEach(o => {
          o.technologicalProcesses.forEach(t => this.setClassBtnToArr(t));
        })
      }

      if (!this.$store.getters['workplace/getDownloadFlag'])
        this.$store.dispatch('workplace/findAll');
    }
  },
}

</script>

<style scoped>

</style>