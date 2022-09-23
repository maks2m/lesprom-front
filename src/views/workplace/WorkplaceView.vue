<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Участки</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'workplace-edit', params: {id: 'new'} }">Добавить</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
<!--        <th>id</th>-->
        <th>Наименование участка</th>
        <th>Редактирование</th>
      </tr>
      </thead>
      <tbody v-if="items.length">
      <tr v-for="(item) in items" :key="item.id" @dblclick="this.$router.push({ name: 'workplace-edit', params: {id: item.id} })">
<!--        <td v-text="item.id"></td>-->
        <td v-text="item.nameWorkplace"></td>
        <td>
          <div class="btn-group">
            <router-link class="btn btn-secondary" :to="{ name: 'workplace-edit', params: {id: item.id} }">Редактировать</router-link>
            <button class="btn btn-danger" @click="del(item.id)">Удалить</button>
          </div>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td colspan="10" class="text-center">Список пуст!</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "WorkplaceView",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('workplace', { items: 'getAllItems', getItem: 'getOneItem' }),
  },
  methods: {
    ...mapActions('workplace', { save: 'add', remove: 'remove', changeUrlParam: 'changeUrlParam' }),
    del(id) {
      this.remove(id).then(() => {
        this.$store.dispatch('technologicalProcess/changeDownloadFlag', false);
      });
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.changeUrlParam({
      pageNo: -1,
      pageSize: '',
      sortBy: urlParams.get("sortBy") ? urlParams.get("sortBy") : 'id',
    });
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['workplace/getDownloadFlag']) this.$store.dispatch('workplace/findAll');
    }
  }
}
</script>

<style scoped>

</style>