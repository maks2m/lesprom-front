<template>
  <div class="container">
    <div v-if="isNewItem">
      <h1>New</h1>
    </div>
    <div v-else>
      <h1>Edit</h1>
    </div>
    <form class="row g-3" @submit.prevent="sendForm">
      <div class="col-md-6" v-show="!isNewItem">
        <label for="inputId" class="form-label">ID</label>
        <input type="text" class="form-control" disabled readonly id="inputId" :value="item.id">
      </div>
      <div class="col-md-6">
        <label for="inputFullName" class="form-label">Role</label>
        <input type="text" class="form-control" id="inputFullName" :value="item.role" @change="inputOnForm">
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
  name: "RoleEditView",
  data() {
    return {
      item: {
        id: '',
        role: '',
      }
    }
  },
  computed: {
    orderId() {
      if (!this.isNewItem) return Number(this.$route.params.id);
    },
    isNewItem() {
      return this.$route.params.id === 'new'
    }
  },
  methods: {
    ...mapActions('role', { addItem: 'add' }),
    sendForm() {
      this.addItem(this.item).then(() => {
        this.$store.dispatch('user/changeDownloadFlag', false);
      });
      this.$router.push('/role');
    },
    inputOnForm(event) {
      this.item.role = event.target.value;
    }
  },
  async created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['role/getDownloadFlag']) {
        await this.$store.dispatch('role/findAll');
        if (!this.isNewItem) this.item = Object.assign({}, this.$store.getters['role/getOneItem'](this.orderId));
      } else {
        if (!this.isNewItem) this.item = Object.assign({}, this.$store.getters['role/getOneItem'](this.orderId));
      }
    }
  },
}
</script>

<style scoped>

</style>