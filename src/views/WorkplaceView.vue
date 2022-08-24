<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Workplace</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'workplace-edit', params: {id: 'new'} }">new</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Name Workplace</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length" @dblclick="this.$router.push({ name: 'workplace-edit', params: {id: item.id} })">
        <td v-text="item.id"></td>
        <td v-text="item.nameWorkplace"></td>
        <td>
          <div class="btn-group">
            <router-link class="btn btn-secondary" :to="{ name: 'workplace-edit', params: {id: item.id} }">edit</router-link>
            <button class="btn btn-danger" @click="del(item.id)">delete</button>
          </div>
        </td>
      </tr>
      <tr v-else>
        <td>List is empty!</td>
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
    ...mapActions('workplace', { save: 'add', remove: 'remove', getAll: 'findAll'}),
    del(id) {
      this.remove(id);
    }
  },
  created() {
    this.getAll();
  }
}
</script>

<style scoped>

</style>