<template>
  <div class="container">
    <div>
      <h1>Edit</h1>
    </div>
    <form class="row g-3" @submit.prevent="sendForm">
      <div class="col-md-6">
        <label for="inputId" class="form-label">ID</label>
        <input type="text" class="form-control" readonly="readonly" id="inputId" :value="employee.id">
      </div>
      <div class="col-md-6">
        <label for="inputFullName" class="form-label">Full name</label>
        <input type="text" class="form-control" id="inputFullName" :value="employee.fullName" @change="inputOnForm">
      </div>

<!--
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Эл. адрес</label>
        <input type="email" class="form-control" id="inputEmail4">
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Пароль</label>
        <input type="password" class="form-control" id="inputPassword4">
      </div>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Адрес</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="Проспект Ленина">
      </div>
      <div class="col-md-6">
        <label for="inputCity" class="form-label">Город</label>
        <input type="text" class="form-control" id="inputCity" placeholder="Брянск">
      </div>
      <div class="col-md-4">
        <label for="inputState" class="form-label">Область</label>
        <select id="inputState" class="form-select">
          <option selected>Выберите...</option>
          <option>...</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="inputZip" class="form-label">Индекс</label>
        <input type="text" class="form-control" id="inputZip">
      </div>
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="gridCheck">
          <label class="form-check-label" for="gridCheck">
            Проверить меня
          </label>
        </div>
      </div>
-->


      <div class="col-12">
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditView",
  data() {
    return {
      employee: {
        id: '',
        fullName: '',
      }
    }
  },
  mounted() {
    this.employee = this.$store.getters['employee/getOneItem'](Number(this.$route.params.id));
  },
  methods: {
    ...mapActions('employee', { addEmployee: 'add' }),
    sendForm() {
      console.log(this.employee);
      //this.addEmployee(this.employee);
      //this.$router.push('/employee');
    },
    inputOnForm(event) {
      this.employee.fullName = event.target.value;
    }

  }
}
</script>

<style scoped>

</style>