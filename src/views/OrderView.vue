<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Заказы</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'order-edit', params: {id: 'new'} }">Добавить</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
<!--        <th>id</th>-->
        <th @click="sortedOnTable">
          Номер заказа
          <span v-if="isSeparateAbc">\/</span>
          <span v-else>/\</span>
        </th>
        <th>Номер заказа (другое)</th>
        <th>Дата начала</th>
        <th>Дата окончания</th>
        <th>Задолжность</th>
        <th>Цвет</th>
        <th>Массив</th>
        <th>Шпон</th>
        <th>Радиус</th>
        <th>Стекло</th>
        <th>Переплет</th>
        <th>Багет</th>
        <th>Фреза</th>
        <th>Участки</th>
        <th>Примечание</th>
        <th>Редактирование</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length" @dblclick="this.$router.push({ name: 'order-edit', params: {id: item.id} })">
<!--        <td v-text="item.id"></td>-->
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
            <router-link class="btn btn-secondary m-1" :to="{ name: 'order-edit', params: {id: item.id} }">Редактировать заказ</router-link>
            <router-link class="btn btn-info m-1" :to="{ name: 'order-edit-add-employees', params: {id: item.id} }">Добавить сотрудников</router-link>
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
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "OrderView",
  data() {
    return {
      isSeparateAbc: true,
      itemsSorted: [],
    }
  },
  computed: {
    ...mapGetters('order', {getAllItems: 'getAllItems', getItem: 'getOneItem' }),
    items() {
      // return this.getAllSorted(this.isSeparateAbc, 'color');
      return this.getAllItems;
    },
  },
  methods: {
    ...mapActions('order', { save: 'add', remove: 'remove', getAll: 'findAll'}),
    del(id) {
      this.remove(id);
    },
    getLocalDate(arr) {
      return moment(arr).format('DD.MM.YYYY');
    },
    sortedOnTable() {
      this.isSeparateAbc = !this.isSeparateAbc;
      if (this.isSeparateAbc) {
        this.itemsSorted = this.items.sort((a, b) => a.color.localeCompare(b.color));
      } else {
        //this.itemsSorted = this.items.sort((a, b) => b.color.localeCompare(a.color));
      }
    },
  },
  created() {
    this.getAll();
  }
}
</script>

<style scoped>

</style>