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
        <input type="text" class="form-control" disabled readonly id="inputId" :value="item.id">
      </div>
      <div class="col-md-6">
        <label for="inputUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="inputUsername" :value="item.username" @change="inputOnForm">
      </div>
      <div class="col-md-6">
        <label for="inputPassword" class="form-label">Password</label>
        <input type="text" class="form-control" id="inputPassword" :value="item.password" @change="inputOnForm">
      </div>
      <div class="col-md-12">
        <label for="inputState" class="form-label">Область</label>
        <select id="inputState" class="form-select">
          <option selected>Выберите...</option>
          <option>...</option>
        </select>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserEditView",
  data() {
    return {
      item: {
        id: '',
        fullName: '',
      }
    }
  },
  computed: {
    isNewItem() {
      return this.$route.params.id === 'new'
    }
  },
  mounted() {
    if(!this.isNewItem) {
      this.item = Object.assign({}, this.$store.getters['user/getOneItem'](Number(this.$route.params.id)));
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

  }
}
</script>

<style scoped>

</style>