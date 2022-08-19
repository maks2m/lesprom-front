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
      <div class="col-md-4">
        <label for="inputFullName" class="form-label">Order number</label>
        <input type="text" class="form-control" id="inputFullName" :value="item.numberOrder" @change="inputOnForm">
      </div>
      <div class="col-md-4">
        <label for="inputNumberOrderOther" class="form-label">Order number (other)</label>
        <input type="text" class="form-control" id="inputNumberOrderOther" :value="item.numberOrderOther" @change="inputOnForm">
      </div>
      <div class="col-md-4">
        <label for="inputDuty" class="form-label">Duty</label>
        <input type="text" class="form-control" id="inputDuty" :value="item.duty" @change="inputOnForm">
      </div>
      <div class="col-md-3">
        <label for="inputStartDate" class="form-label">Start Date</label>
        <input type="date" class="form-control" id="inputStartDate" :value="item.startDate" @change="inputOnForm">
      </div>
      <div class="col-md-3">
        <label for="inputFinishDate" class="form-label">Finish Date</label>
        <input type="date" class="form-control" id="inputFinishDate" :value="item.finishDate" @change="inputOnForm">
      </div>

<!--      выбор участков workplace, а на них выбор сотрудников-->

      <div class="col-md-3">
        <label for="selectBaguette" class="form-label">Baguette</label>
        <select id="selectBaguette" class="form-select">
          <option selected>Выберите...</option>
          <option>...</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="selectCutter" class="form-label">Cutter</label>
        <select id="selectCutter" class="form-select">
          <option selected>Выберите...</option>
          <option>...</option>
        </select>
      </div>

      <div class="col-md-2">
        <label for="inputRadius" class="form-label">Radius</label>
        <input type="text" class="form-control" id="inputRadius" :value="item.orderDescription.radius" @change="inputOnForm">
      </div>
      <div class="col-md-2">
        <label for="inputGlass" class="form-label">Glass</label>
        <input type="text" class="form-control" id="inputGlass" :value="item.orderDescription.glass" @change="inputOnForm">
      </div>
      <div class="col-md-2">
        <label for="inputColor" class="form-label">Color</label>
        <input type="text" class="form-control" id="inputColor" :value="item.orderDescription.color" @change="inputOnForm">
      </div>
      <div class="col-md-2">
        <label for="inputBinding" class="form-label">Binding</label>
        <input type="text" class="form-control" id="inputBinding" :value="item.orderDescription.binding" @change="inputOnForm">
      </div>
      <div class="col-md-2">
        <label for="inputWoodMass" class="form-label">Wood Mass</label>
        <input type="text" class="form-control" id="inputWoodMass" :value="item.orderDescription.woodMass" @change="inputOnForm">
      </div>
      <div class="col-md-2">
        <label for="inputWoodVeneer" class="form-label">Wood Veneer</label>
        <input type="text" class="form-control" id="inputWoodVeneer" :value="item.orderDescription.woodVeneer" @change="inputOnForm">
      </div>

      <div class="mb-3">
        <label for="textareaOther" class="form-label">Other</label>
        <textarea class="form-control" id="textareaOther" rows="5" :value="item.other"></textarea>
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
  name: "OrderEditView",
  data() {
    return {
      item: {
        id: '',
        numberOrder: '',
        numberOrderOther: '',
        duty: '',
        startDate: '',
        finishDate: '',
        workplaces: [],
        cutter: '',
        baguette: '',
        orderDescription: {
          radius: '',
          glass: '',
          binding: '',
          woodVeneer: '',
          woodMass: '',
          color: '',
        },
        other: ''
      }
    }
  },
  computed: {
    isNewItem() {
      return this.$route.params.id === '-1'
    }
  },
  mounted() {
    if(!this.isNewItem) {
      this.item = Object.assign({}, this.$store.getters['order/getOneItem'](Number(this.$route.params.id)));
    }
  },
  methods: {
    ...mapActions('order', { addItem: 'add' }),
    sendForm() {
      this.addItem(this.item);
      this.$router.push('/order');
    },
    inputOnForm(event) {
      this.item.numberOrder = event.target.value;
    }

  }
}
</script>

<style scoped>

</style>