<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <h3>Workplaces list</h3>
      </div>
      <div class="col">
        <a href="user/new" class="btn btn-primary">New workplace</a>
      </div>
    </div>
    <table class="table table-striped table-hover table-sm">
      <thead class="table-info">
      <tr>
        <th>id</th>
        <th>Workplace Name</th>
        <th colspan="2">Edit</th>
      </tr>
      </thead>
      <tbody>

      <!--    <form @submit="save()">
            <tr>
              <input type="hidden" v-model="editUser.id" name="id"/>
              <th v-text="(editUser.id != 0) ? editUser.id : ''"></th>
              <th><input type="text" v-model="editUser.username"/></th>
              <th><input type="password" v-model="editUser.password"/></th>
              <th>
                <div v-for="role in roles">
                  <label>
                    <input type="checkbox" v-text="role.role"/>
                  </label>
                </div>
              </th>
              <th><input class="btn btn-success" type="submit" value="Save"/></th>
              <th><input class="btn btn-warning" type="reset" value="Cancel"/></th>
            </tr>
          </form>-->

      <tr v-for="(item, index) in workplaces" v-if="workplaces.length">
        <td v-text="item.id"></td>
        <td v-text="item.nameWorkplace"></td>
        <td>
          <router-link class="btn btn-secondary" :to="{ name: 'edit-user', params: {id: item.id} }">edit</router-link>
        </td>
        <td>
          <button class="btn btn-danger" @click="del(item.id, index)">delete</button>
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
import { mapGetters, mapActions} from "vuex";

export default {
  name: "WorkplaceView",
  data() {
    return {
      editWorkplace: '',
    }
  },
  computed: {
    ...mapGetters('workplace', { workplaces: 'getAllItems', getWorkplace: 'getOneItem' }),
  },
  methods: {
    ...mapActions('workplace', { save: 'add', del: 'remove' }),
  }
}

</script>

<style scoped>

</style>