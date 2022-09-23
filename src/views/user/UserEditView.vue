<template>
  <div class="container">
    <div v-if="isNewItem">
      <h1>New</h1>
    </div>
    <div v-else>
      <h1>Edit</h1>
    </div>
    <form class="row g-3" @submit.prevent="sendForm">
      <div class="col-md-12" v-show="!isNewItem">
        <label for="inputId" class="form-label">ID</label>
        <input type="text" class="form-control" disabled readonly id="inputId" v-model="item.id">
      </div>
      <div class="col-md-6">
        <label for="inputUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="inputUsername" v-model="item.username">
      </div>
      <div class="col-md-6">
        <label for="inputPassword" class="form-label">Password</label>
        <input type="text" class="form-control" id="inputPassword" v-model="item.password">
      </div>
      <div class="col-md-12">
        <label for="selectRole" class="form-label">Role</label>
        <select id="selectRole"
                class="form-select"
                multiple
                size="6"
                v-model="item.roles">
          <option disabled value="">Select</option>
          <option v-for="role in roles"
                  :key="role.id"
                  :value="role"
                  :selected="this.item.roles.some((r) => r.id === role.id)">
            {{ role.role }}
          </option>
        </select>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import cloneDeep from 'lodash.clonedeep'

export default {
  name: "UserEditView",
  data() {
    return {
      item: {
        id: '',
        username: '',
        password: '',
        roles: [
          {id: ''}
        ]
      }
    }
  },
  computed: {
    ...mapGetters('role', { roles: 'getAllItems', getItem: 'getOneItem' }),
    orderId() {
      if (!this.isNewItem) return Number(this.$route.params.id);
    },
    isNewItem() {
      return this.$route.params.id === 'new';
    }
  },
  methods: {
    ...mapActions('user', { addItem: 'add' }),
    sendForm() {
      this.addItem(this.item);
      this.$router.push('/user');
    },
    inputOnForm(event) {
      this.item.fullName = event.target.value;
    }
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['role/getDownloadFlag']) this.$store.dispatch('role/findAll');
      if (!this.$store.getters['user/getDownloadFlag']) {
        this.$store.dispatch('user/findAll').then(() => {
          if (!this.isNewItem) this.item = cloneDeep(this.$store.getters['user/getOneItem'](this.orderId));
        });
      } else {
        if (!this.isNewItem) this.item = cloneDeep(this.$store.getters['user/getOneItem'](this.orderId));
      }
    }
  },
}
</script>

<style scoped>

</style>