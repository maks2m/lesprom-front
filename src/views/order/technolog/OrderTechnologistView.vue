<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Заказы</h3>
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
        <th v-for="workplace in workplaces">{{ workplace.nameWorkplace }}</th>
        <th>Редактирование</th>
      </tr>
      </thead>
      <template v-if="downloadPageableFlag">
        <tbody v-if="ordersPageable.length">

        <tr v-for="(order) in ordersPageable" :key="order.id">
          <!--          @dblclick="this.$router.push({ name: 'order-edit', params: {id: item.id} })">-->
          <td v-text="order.numberOrder"></td>
          <td v-text="order.numberOrderOther"></td>
          <td v-for="workplace in workplaces">
            <div v-for="technologicalProcess in order.technologicalProcesses.filter(t => t.workplace.id === workplace.id)">
              <div class="btn-group m-1">
                <div class="btn"
                     :class="getClassBtnFindAndNotUndefined(technologicalProcess)"
                     @click="addDateEmployee(technologicalProcess, order)">
                  {{ technologicalProcess.employee.fullName }}
                </div>
                <div class="btn-group">
                  <div class="btn btn-outline-danger" @click="delDateEmployee(technologicalProcess, order)">-</div>
                </div>
              </div>
            </div>
          </td>

          <td>
            <router-link class="btn btn-secondary m-1" :to="{ name: 'order-edit', params: {id: order.id} }">Редактировать
              заказ
            </router-link>
            <router-link class="btn btn-info m-1"
                         :to="{ name: 'order-add-employees', params: {id: order.id} }">
              Добавить сотрудников
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
    <pagination v-if="downloadPageableFlag"
                :totalPages="pageInfo.totalPages"
                :perPage="pageInfo.pageSize"
                :maxVisibleButtons="5"
                :currentPage="pageInfo.pageNo + 1"
                @pagechanged="onPageChange"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import pagination from "@/components/Pagination";
import cloneDeep from "lodash.clonedeep";

export default {
  name: "OrderTechnologistView",
  components: {
    pagination
  },
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
      arrClassesBtn: [],
    }
  },
  computed: {
    ...mapGetters('order', {
      ordersPageable: 'getAllItemsPageable',
      pageInfo: 'getPageInfo',
      downloadPageableFlag: 'getDownloadPageableFlag'
    }),
    ...mapGetters('workplace', {workplaces: 'getAllItems'}),
  },
  methods: {
    ...mapActions('order', {
      changeUrlParam: 'changeUrlParam',
      findAllPageable: 'findAllPageable'
    }),
    ...mapActions('technologicalProcess', {updateTime: 'add'}),

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

          this.$store.dispatch('order/findOnePageable', order.id);
          this.setClassBtnToArr(updateTechnologicalProcess);
        });
      } else if (updateTechnologicalProcess.timeStartWork !== null && updateTechnologicalProcess.timeFinishWork === null) {
        updateTechnologicalProcess.timeFinishWork = Date.now();
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.$store.dispatch('order/findOnePageable', order.id);
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
      let updateTechnologicalProcess = cloneDeep(technologicalProcess);
      updateTechnologicalProcess.order = {id: order.id};
      if (updateTechnologicalProcess.timeStartWork !== null && updateTechnologicalProcess.timeFinishWork !== null) {
        updateTechnologicalProcess.timeFinishWork = null;
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.$store.dispatch('order/findOnePageable', order.id);
          this.setClassBtnToArr(updateTechnologicalProcess);
        });
      } else if (updateTechnologicalProcess.timeStartWork !== null && updateTechnologicalProcess.timeFinishWork === null) {
        updateTechnologicalProcess.timeStartWork = null;
        this.updateTime(updateTechnologicalProcess).then(() => {
          this.$store.dispatch('order/findOnePageable', order.id);
          this.setClassBtnToArr(updateTechnologicalProcess);
        });
      }
    },
    onPageChange(page) {
      //this.findAllWithPaginationAndSorted({pageNo: page, pageSize: null, sortBy: null});

      this.changeUrlParam({pageNo: page - 1, pageSize: null, sortBy: null});
      this.findAllPageable().then(() => {
        this.$router.push({name: 'order-manager', query: {pageNo: this.pageInfo.pageNo, pageSize: this.pageInfo.pageSize, sortBy: this.pageInfo.sortBy}})
      });
    }
  },
  mounted() {

  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.changeUrlParam({
      pageNo: urlParams.get("pageNo") !== '' ? urlParams.get("pageNo") : -1,
      pageSize: urlParams.get("pageSize") !== '' ? urlParams.get("pageSize") : '',
      sortBy: urlParams.get("sortBy") !== '' ? urlParams.get("sortBy") : 'id',
    });
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['order/getDownloadPageableFlag']) {
        this.$store.dispatch('order/findAllPageable').then(() => {
          this.ordersPageable.forEach(o => {
            o.technologicalProcesses.forEach(t => this.setClassBtnToArr(t));
          })
        });
      } else {
        this.ordersPageable.forEach(o => {
          o.technologicalProcesses.forEach(t => this.setClassBtnToArr(t));
        });
      }
      if (!this.$store.getters['workplace/getDownloadFlag'])
        this.$store.dispatch('workplace/findAll');
    }
  },
}
</script>

<style scoped>

</style>