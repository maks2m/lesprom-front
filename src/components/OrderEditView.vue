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
          <input type="text"
                 class="form-control"
                 id="inputFullName"
                 :value="item.numberOrder"
                 @change="inputOnForm($event.target.value, 'numberOrder')">
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
          <input type="date"
                 class="form-control"
                 id="inputStartDate"
                 :value="item.startDate"
                 @change="inputOnForm($event.target.value, 'startDate')">
        </div>
        <div class="col-md-4 mt-2">
          <label for="inputFinishDate" class="form-label">Finish Date</label>
          <input type="date"
                 class="form-control"
                 id="inputFinishDate"
                 :value="item.finishDate"
                 @change="inputOnForm($event.target.value, 'finishDate')">
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-12"><h4>Workplace</h4></div>

        <div class="col-md-3 mt-2" v-for="workplace in workplaces" :key="workplace.id">
          <label for="selectWorkplace" class="form-label">{{ workplace.nameWorkplace }}</label>
          <select id="selectWorkplace"
                  class="form-select"
                  multiple
                  @change="inputOnForm($event.target.options, 'timeOfEmployeeOnOrders.employee', workplace.id)">
            <option v-for="employee in workplace.employees"
                    :key="employee.id"
                    :value="employee.id"
                    :selected="this.item.timeOfEmployeeOnOrders.some((timeOfEmployeeOnOrder) => timeOfEmployeeOnOrder.employee.id === employee.id)"
            >{{ employee.fullName }}</option>
          </select>
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-12"><h4>Others</h4></div>

        <div class="col-md-6 mt-2">
          <label for="selectBaguette" class="form-label">Baguette</label>
          <select id="selectBaguette"
                  class="form-select"
                  @change="inputOnForm($event.target.value, 'baguette')">
            <option v-if="isNewItem" selected></option>
            <option v-for="baguette in baguettes"
                    :key="baguette.id"
                    :value="baguette.id"
                    :selected="item.baguette.id === baguette.id"
            >{{ baguette.baguetteName }}</option>
          </select>
        </div>
        <div class="col-md-6 mt-2">
          <label for="selectCutter" class="form-label">Cutter</label>
          <select id="selectCutter"
                  class="form-select"
                  @change="inputOnForm($event.target.value, 'cutter')">
            <option v-if="isNewItem" selected></option>
            <option v-for="cutter in cutters"
                    :key="cutter.id"
                    :value="cutter.id"
                    :selected="item.cutter.id === cutter.id"
            >{{ cutter.cutterName }}</option>
          </select>
        </div>

        <div class="col-md-2 mt-2">
          <label for="inputRadius" class="form-label">Radius</label>
          <input type="text"
                 class="form-control"
                 id="inputRadius"
                 :value="item.orderDescription.radius"
                 @change="inputOnForm($event.target.value, 'orderDescription.radius')">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputGlass" class="form-label">Glass</label>
          <input type="text"
                 class="form-control"
                 id="inputGlass"
                 :value="item.orderDescription.glass"
                 @change="inputOnForm($event.target.value, 'orderDescription.glass')">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputColor" class="form-label">Color</label>
          <input type="text"
                 class="form-control"
                 id="inputColor"
                 :value="item.orderDescription.color"
                 @change="inputOnForm($event.target.value, 'orderDescription.color')">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputBinding" class="form-label">Binding</label>
          <input type="text"
                 class="form-control"
                 id="inputBinding"
                 :value="item.orderDescription.binding"
                 @change="inputOnForm($event.target.value, 'orderDescription.binding')">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputWoodMass" class="form-label">Wood Mass</label>
          <input type="text"
                 class="form-control"
                 id="inputWoodMass"
                 :value="item.orderDescription.woodMass"
                 @change="inputOnForm($event.target.value, 'orderDescription.woodMass')">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputWoodVeneer" class="form-label">Wood Veneer</label>
          <input type="text"
                 class="form-control"
                 id="inputWoodVeneer"
                 :value="item.orderDescription.woodVeneer"
                 @change="inputOnForm($event.target.value, 'orderDescription.woodVeneer')">
        </div>

        <div class="mb-3 mt-2">
          <label for="textareaOther" class="form-label">Other</label>
          <textarea class="form-control"
                    id="textareaOther"
                    rows="5"
                    :value="item.other"
                    @change="inputOnForm($event.target.value, 'other')"></textarea>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Save</button>
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
      employees: [],

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
  created() {
    this.$store.dispatch('baguette/findAll');
    this.$store.dispatch('cutter/findAll');
    this.$store.dispatch('workplace/findAll');
    this.$store.dispatch('employee/findAll');
  },
  mounted() {
    if(!this.isNewItem) {
      this.item = Object.assign({}, this.$store.getters['order/getOneItem'](Number(this.$route.params.id)));
    }
    this.baguettes = this.$store.getters['baguette/getAllItems'];
    this.cutters = this.$store.getters['cutter/getAllItems'];
    this.workplaces = this.$store.getters['workplace/getAllItems'];
    this.employees = this.$store.getters['employee/getAllItems'];
  },
  methods: {
    ...mapActions('order', { addItem: 'add' }),
    sendForm() {
      this.addItem(this.item);
      this.$router.push('/order');
    },
    inputOnForm(value, key1, key2) {
      switch (key1) {
        case 'numberOrder': this.item.numberOrder = value; break;
        case 'numberOrderOther': this.item.numberOrderOther = value; break;
        case 'duty': this.item.duty = value; break;
        case 'startDate': this.item.startDate = value; break;
        case 'finishDate': this.item.finishDate = value; break;
        case 'cutter': this.item.cutter = this.cutters.find(c => c.id.toString() === value); break;
        case 'baguette': this.item.baguette = this.baguettes.find(b => b.id.toString() === value); break;

        case 'timeOfEmployeeOnOrders.employee': {
          //console.log(value);
          let arr = [];
          Object.values(value).find(s => {
            if (s.selected) {
              arr.push(this.employees.find(e => e.id.toString() === s.value));
            }
          })
          //this.item.timeOfEmployeeOnOrders
          //const employee = this.employees.find(e => e.id.toString() === value);
          //console.log(employee);
          //this.item.baguette = value;
          break;
        }

        case 'orderDescription.radius': this.item.orderDescription.radius = value; break;
        case 'orderDescription.glass': this.item.orderDescription.glass = value; break;
        case 'orderDescription.binding': this.item.orderDescription.binding = value; break;
        case 'orderDescription.woodVeneer': this.item.orderDescription.woodVeneer = value; break;
        case 'orderDescription.woodMass': this.item.orderDescription.woodMass = value; break;
        case 'orderDescription.color': this.item.orderDescription.color = value; break;
        case 'other': this.item.other = value; break;
      }
    },
    isSelected(employee) {
      return  this.item.timeOfEmployeeOnOrders.some((item) => item.employee.id === employee.id);
    }
  }
}
</script>

<style scoped>

</style>