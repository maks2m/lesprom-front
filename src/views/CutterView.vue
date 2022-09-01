<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Фрезы</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'cutter-edit', params: {id: 'new'} }">Добавить</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
<!--        <th>id</th>-->
        <th>Наименование фрезы</th>
        <th>Редактирование</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length" @dblclick="this.$router.push({ name: 'cutter-edit', params: {id: item.id} })">
<!--        <td v-text="item.id"></td>-->
        <td v-text="item.cutterName"></td>
        <td>
          <div class="btn-group">
            <router-link class="btn btn-secondary" :to="{ name: 'cutter-edit', params: {id: item.id} }">Редактировать</router-link>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CutterView",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('cutter', { items: 'getAllItems', getItem: 'getOneItem' }),
  },
  methods: {
    ...mapActions('cutter', { save: 'add', remove: 'remove' }),
    del(id) {
      this.remove(id).then(() => {
        this.$store.dispatch('order/changeDownloadFlag', false);
      });
    }
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['cutter/getDownloadFlag']) this.$store.dispatch('cutter/findAll');
    }
  }
}
</script>

<style scoped>

</style>