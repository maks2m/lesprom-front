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
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length"
          @dblclick="this.$router.push({ name: 'order-edit', params: {id: item.id} })">
        <td v-text="item.numberOrder"></td>
        <td v-text="item.numberOrderOther"></td>
        <td v-text="getLocalDate(item.startDate)"></td>
        <td v-text="getLocalDate(item.finishDate)"></td>
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
        <td v-text="item.notes"></td>
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
  name: "OrderView",
  data() {
    return {
      arrSeparateAbc: [
        {column: 'numberOrder', text: 'Номер заказа', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'numberOrderOther', text: 'Номер заказа (другое)', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
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
        {column: 'workplaces', text: 'Участки', sorted: false, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'notes', text: 'Примечание', sorted: true, showIcon: false, separated: 'desc', type: 'text'},
        {column: 'edit', text: 'Редактирование', sorted: false, showIcon: false, separated: '', type: ''},
      ],
      itemsSorted: [],
    }
  },
  computed: {
    ...mapGetters('order', {items: 'getAllItems', getItem: 'getOneItem'}),
  },
  methods: {
    ...mapActions('order', {save: 'add', remove: 'remove', getAll: 'findAll', setItemsSorted: 'setItemsSorted'}),
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
  }
}
</script>

<style scoped>

</style>