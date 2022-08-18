<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-group">
        <h3 class="text-black m-2">Cutter</h3>
        <router-link class="btn btn-primary m-2" :to="{ name: 'cutter-edit', params: {id: -1} }">new</router-link>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Cutter Name</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in items" :key="item.id" v-if="items.length">
        <td v-text="item.id"></td>
        <td v-text="item.cutterName"></td>
        <td>
          <div class="btn-group">
            <router-link class="btn btn-secondary" :to="{ name: 'cutter-edit', params: {id: item.id} }">edit</router-link>
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
  name: "CutterView",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('cutter', { items: 'getAllItems', getItem: 'getOneItem' }),
  },
  methods: {
    ...mapActions('cutter', { save: 'add', remove: 'remove', getAll: 'findAll'}),
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