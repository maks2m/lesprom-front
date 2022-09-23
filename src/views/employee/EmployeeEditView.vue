<template>
  <div class="container">
    <div v-if="isNewItem">
      <h1>Новый элемент</h1>
    </div>
    <div v-else>
      <h1>Редактирование</h1>
    </div>
    <form class="row g-3" @submit.prevent="sendForm">
<!--
      <div class="col-md-6" v-show="!isNewItem">
        <label for="inputId" class="form-label">ID</label>
        <input type="text" class="form-control" disabled readonly id="inputId" :value="item.id">
      </div>
-->
      <div class="col-md-6">
        <label for="inputFullName" class="form-label">Полное имя сотрудника</label>
        <input type="text" class="form-control" id="inputFullName" :value="item.fullName" @change="inputOnForm">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EmployeeEditView",
  data() {
    return {
      item: {
        id: '',
        fullName: '',
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
    ...mapActions('employee', { addItem: 'add' }),
    sendForm() {
      this.addItem(this.item).then(() =>{
        this.$store.dispatch('workplace/changeDownloadFlag', false);
        this.$store.dispatch('technologicalProcess/changeDownloadFlag', false);
      });
      this.$router.push('/employee');
    },
    inputOnForm(event) {
      this.item.fullName = event.target.value;
    }
  },
  async created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['employee/getDownloadFlag']) {
        await this.$store.dispatch('employee/findAll');
        if (!this.isNewItem) this.item = Object.assign({}, this.$store.getters['employee/getOneItem'](this.orderId));
      } else {
        if (!this.isNewItem) this.item = Object.assign({}, this.$store.getters['employee/getOneItem'](this.orderId));
      }
    }
  },
}
</script>

<style scoped>

</style>