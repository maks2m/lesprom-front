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
      <template v-if="downloadPageableFlag">
        <tbody v-if="itemsPageable.length">
        <tr v-for="(item) in itemsPageable" :key="item.id"
            @dblclick="this.$router.push({ name: 'order-edit', params: {id: item.id} })">
          <td v-text="item.numberOrder"></td>
          <td v-text="item.numberOrderOther"></td>
          <td v-text="getDate(item.startDate)"></td>
          <td v-text="getDate(item.finishDate)"></td>
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
          <td v-text="item.notes"></td>
          <td>
            <router-link class="btn btn-secondary m-1" :to="{ name: 'order-edit', params: {id: item.id} }">Редактировать
              заказ
            </router-link>
            <router-link class="btn btn-info m-1" :to="{ name: 'order-add-employees', params: {id: item.id} }">
              Добавить сотрудников
            </router-link>
            <button class="btn btn-danger m-1" @click="del(item.id)">Удалить</button>
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

export default {
  name: "OrderView",
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
        {column: 'startDate', text: 'Дата начала', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'finishDate', text: 'Дата окончания', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'duty', text: 'Задолжность', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'color', text: 'Цвет', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'woodMass', text: 'Массив', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'woodVeneer', text: 'Шпон', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'radius', text: 'Радиус', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'glass', text: 'Стекло', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'binding', text: 'Переплет', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'baguettes', text: 'Багет', sorted: false, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'cutters', text: 'Фреза', sorted: false, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'notes', text: 'Примечание', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'edit', text: 'Редактирование', sorted: false, showIcon: false, separated: '', type: ''},
      ],
    }
  },
  computed: {
    ...mapGetters('order', {
      itemsPageable: 'getAllItemsPageable',
      itemPageable: 'getOneItemPageable',
      url: 'getUrl',
      pageInfo: 'getPageInfo',
      downloadPageableFlag: 'getDownloadPageableFlag'
    }),
  },
  methods: {
    ...mapActions('order', {
      save: 'addPageable',
      remove: 'removePageable',
      changeUrlParam: 'changeUrlParam',
      findAllPageable: 'findAllPageable',
    }),
    del(id) {
      this.remove(id).then(() => {
        this.$store.dispatch('technologicalProcess/changeDownloadFlag', false);
      });
    },
    getDate(time) {
      const option = {year: 'numeric', month: 'numeric', day: 'numeric'};
      if (time !== null)
        return new Date(time).toLocaleString('ru', option);
    },
    onPageChange(page) {
      this.changeUrlParam({pageNo: page - 1, pageSize: null, sortBy: null});
      this.findAllPageable().then(() => {
        this.$router.push({name: 'order-manager', query: {pageNo: this.pageInfo.pageNo, pageSize: this.pageInfo.pageSize, sortBy: this.pageInfo.sortBy}})
      });
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.changeUrlParam({
      pageNo: urlParams.get("pageNo") !== '' ? urlParams.get("pageNo") : -1,
      pageSize: urlParams.get("pageSize") !== '' ? urlParams.get("pageSize") : '',
      sortBy: urlParams.get("sortBy") !== '' ? urlParams.get("sortBy") : 'id',
    });
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['order/getDownloadPageableFlag']) this.$store.dispatch('order/findAllPageable');
    }
  }
}
</script>

<style scoped>

</style>