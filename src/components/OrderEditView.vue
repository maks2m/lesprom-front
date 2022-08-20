<template>
  <div class="container">
    <div v-if="isNewItem">
      <h1>New</h1>
    </div>
    <div v-else>
      <h1>Edit</h1>
    </div>

    <hr>

    <form class="g-3" @submit.prevent="sendForm">
      <div class="row">
        <div class="col-md-12"><h4>General</h4></div>
        <div class="col-md-12 mt-2" v-show="!isNewItem">
          <label for="inputId" class="form-label">ID</label>
          <input type="text" class="form-control" disabled readonly id="inputId" :value="item.id">
        </div>

        <div class="col-md-4 mt-2">
          <label for="inputFullName" class="form-label">Order number</label>
          <input type="text" class="form-control" id="inputFullName" :value="item.numberOrder" @change="inputOnForm">
        </div>
<!--
      <div class="col-md-4 mt-2">
        <label for="inputNumberOrderOther" class="form-label">Order number (other)</label>
        <input type="text" class="form-control" id="inputNumberOrderOther" :value="item.numberOrderOther" @change="inputOnForm">
      </div>
      <div class="col-md-4 mt-2">
        <label for="inputDuty" class="form-label">Duty</label>
        <input type="text" class="form-control" id="inputDuty" :value="item.duty" @change="inputOnForm">
      </div>
-->
        <div class="col-md-4 mt-2">
          <label for="inputStartDate" class="form-label">Start Date</label>
          <input type="date" class="form-control" id="inputStartDate" :value="item.startDate" @change="inputOnForm">
        </div>
        <div class="col-md-4 mt-2">
          <label for="inputFinishDate" class="form-label">Finish Date</label>
          <input type="date" class="form-control" id="inputFinishDate" :value="item.finishDate" @change="inputOnForm">
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-12"><h4>Workplace</h4></div>
<!--      выбор участков workplace, а на них выбор сотрудников-->
        <div class="col-md-3 mt-2" v-for="workplace in workplaces" :key="workplace.id">
          <label for="selectWorkplace" class="form-label">{{ workplace.nameWorkplace }}</label>
          <select id="selectWorkplace" class="form-select" multiple>
            <option v-for="employee in workplace.employees"
                    :key="employee.id"
                    :value="employee.id"
                    :selected="this.item.timeOfEmployeeOnOrders.some((item) => item.employee.id === employee.id)"
            >{{ employee.fullName }}</option>
          </select>
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-12"><h4>Others</h4></div>

        <div class="col-md-6 mt-2">
          <label for="selectBaguette" class="form-label">Baguette</label>
          <select id="selectBaguette" class="form-select">
            <option v-if="baguettes" selected></option>
            <option v-for="baguette in baguettes"
                    :key="baguette.id"
                    :value="baguette.id"
                    :selected="item.baguette.id === baguette.id"
            >{{ baguette.baguetteName }}</option>
          </select>
        </div>
        <div class="col-md-6 mt-2">
          <label for="selectCutter" class="form-label">Cutter</label>
          <select id="selectCutter" class="form-select">
            <option v-if="cutters" selected></option>
            <option v-for="cutter in cutters"
                    :key="cutter.id"
                    :value="cutter.id"
                    :selected="item.cutter.id === cutter.id"
            >{{ cutter.cutterName }}</option>
          </select>
        </div>

        <div class="col-md-2 mt-2">
          <label for="inputRadius" class="form-label">Radius</label>
          <input type="text" class="form-control" id="inputRadius" :value="item.orderDescription.radius" @change="inputOnForm">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputGlass" class="form-label">Glass</label>
          <input type="text" class="form-control" id="inputGlass" :value="item.orderDescription.glass" @change="inputOnForm">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputColor" class="form-label">Color</label>
          <input type="text" class="form-control" id="inputColor" :value="item.orderDescription.color" @change="inputOnForm">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputBinding" class="form-label">Binding</label>
          <input type="text" class="form-control" id="inputBinding" :value="item.orderDescription.binding" @change="inputOnForm">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputWoodMass" class="form-label">Wood Mass</label>
          <input type="text" class="form-control" id="inputWoodMass" :value="item.orderDescription.woodMass" @change="inputOnForm">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputWoodVeneer" class="form-label">Wood Veneer</label>
          <input type="text" class="form-control" id="inputWoodVeneer" :value="item.orderDescription.woodVeneer" @change="inputOnForm">
        </div>

        <div class="mb-3 mt-2">
          <label for="textareaOther" class="form-label">Other</label>
          <textarea class="form-control" id="textareaOther" rows="5" :value="item.other"></textarea>
        </div>
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

      <div class="row">
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrderEditView",
  data() {
    return {
      baguettes: [],
      cutters: [],
      workplaces: [],

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
        timeOfEmployeeOnOrders: [],
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
    this.$store.dispatch('baguette/findAll');
    this.baguettes = this.$store.getters['baguette/getAllItems'];
    this.$store.dispatch('cutter/findAll');
    this.cutters = this.$store.getters['cutter/getAllItems'];
    this.$store.dispatch('workplace/findAll');
    this.workplaces = this.$store.getters['workplace/getAllItems'];
  },
  methods: {
    ...mapActions('order', { addItem: 'add' }),
    sendForm() {
      this.addItem(this.item);
      this.$router.push('/order');
    },
    inputOnForm(event) {
      this.item.numberOrder = event.target.value;
    },
    isSelected(employee) {
      return  this.item.timeOfEmployeeOnOrders.some((item) => item.employee.id === employee.id);
    }
  }
}
</script>

<style scoped>

</style>