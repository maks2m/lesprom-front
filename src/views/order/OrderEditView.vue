<template>
  <div class="container">
    <div v-if="isNewItem">
      <h1>Новый заказ</h1>
    </div>
    <div v-else>
      <h1>Редактирование заказа</h1>
    </div>

    <hr>

    <form class="g-3" @submit.prevent="sendForm($event)">
      <div class="row">
        <div class="col-md-12"><h4>Основное</h4></div>
        <!--
                <div class="col-md-12 mt-2" v-show="!isNewItem">
                  <label for="inputId" class="form-label">ID</label>
                  <input type="text" class="form-control" disabled readonly id="inputId" :value="item.id">
                </div>
        -->

        <div class="col-md-3 mt-2">
          <label for="inputNumberOrder" class="form-label">Номер заказа</label>
          <input type="text"
                 class="form-control"
                 id="inputNumberOrder"
                 v-model="item.numberOrder">
        </div>
        <div class="col-md-3 mt-2">
          <label for="inputNumberOrderOther" class="form-label">Номер заказа (другое)</label>
          <input type="text"
                 class="form-control"
                 id="inputNumberOrderOther"
                 v-model="item.numberOrderOther">
        </div>
        <div class="col-md-3 mt-2">
          <label for="inputStartDate" class="form-label">Дата начала</label>
          <input type="date"
                 class="form-control"
                 id="inputStartDate"
                 v-model="_startDate">
        </div>
        <div class="col-md-3 mt-2">
          <label for="inputFinishDate" class="form-label">Дата окончания</label>
          <input type="date"
                 class="form-control"
                 id="inputFinishDate"
                 v-model="_finishDate">
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-md-12"><h4>Другое</h4></div>

        <div class="col-md-6 mt-2" v-if="baguetteDownloadFlag && (orderDownloadFlag || orderDownloadPageableFlag || downloadOnceItem)">
          <label for="selectBaguette" class="form-label">Багет</label>
          <select id="selectBaguette"
                  class="form-select"
                  multiple
                  v-model="item.baguettes">
            <option disabled value="">Выберите вариант</option>
            <option v-for="baguette in baguettes"
                    :key="baguette.id"
                    :value="baguette"
                    :selected="item.baguettes.some((baguetteItem) => baguetteItem.id === baguette.id)"
            >{{ baguette.baguetteName }}
            </option>
          </select>
        </div>
        <div class="col-md-6 mt-2" v-if="cuttersDownloadFlag && (orderDownloadFlag || orderDownloadPageableFlag || downloadOnceItem)">
          <label for="selectCutter" class="form-label">Фреза</label>
          <select id="selectCutter"
                  class="form-select"
                  multiple
                  v-model="item.cutters">
            <option disabled value="">Выберите вариант</option>
            <option v-for="cutter in cutters"
                    :key="cutter.id"
                    :value="cutter"
                    :selected="item.cutters.some((cutterItem) => cutterItem.id === cutter.id)"
            >{{ cutter.cutterName }}
            </option>
          </select>
        </div>

        <div class="col-md-4 mt-2">
          <label for="inputDuty" class="form-label">Задолжность</label>
          <input type="text"
                 class="form-control"
                 id="inputDuty"
                 v-model="item.duty">
        </div>
        <div class="col-md-4 mt-2">
          <label for="inputColor" class="form-label">Цвет</label>
          <input type="text"
                 class="form-control"
                 id="inputColor"
                 v-model="item.color">
        </div>
        <div class="col-md-4 mt-2">
          <label for="inputGlass" class="form-label">Стекло</label>
          <input type="text"
                 class="form-control"
                 id="inputGlass"
                 v-model="item.glass">
        </div>
        <div class="col-md-4 mt-2">
          <label for="inputBinding" class="form-label">Переплет</label>
          <input type="text"
                 class="form-control"
                 id="inputBinding"
                 v-model="item.binding">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputRadius" class="form-label">Радиус</label>
          <input type="text"
                 class="form-control"
                 id="inputRadius"
                 v-model="item.radius">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputWoodMass" class="form-label">Массив</label>
          <input type="text"
                 class="form-control"
                 id="inputWoodMass"
                 v-model="item.woodMass">
        </div>
        <div class="col-md-2 mt-2">
          <label for="inputWoodVeneer" class="form-label">Шпон</label>
          <input type="text"
                 class="form-control"
                 id="inputWoodVeneer"
                 v-model="item.woodVeneer">
        </div>

        <div class="mb-3 mt-2">
          <label for="textareaOther" class="form-label">Примечание</label>
          <textarea class="form-control"
                    id="textareaOther"
                    rows="5"
                    v-model="item.notes"></textarea>
        </div>

      </div>

      <hr>

      <div class="row">
        <div class="col-12">
          <button type="submit" class="btn btn-primary m-1">Сохранить</button>
          <button type="button" class="btn btn-danger m-1" @click="cansel">Отмена</button>
        </div>
      </div>
    </form>
  </div>

  <br>

</template>

<script>
import {mapGetters, mapActions} from "vuex";
import moment from "moment";
import cloneDeep from "lodash.clonedeep";

export default {
  name: "OrderEditView",
  data() {
    return {
      downloadOnceItem: false,
      item: {
        id: '',
        numberOrder: '',
        numberOrderOther: '',
        startDate: '',
        finishDate: '',
        duty: '',
        radius: '',
        glass: '',
        binding: '',
        woodVeneer: '',
        woodMass: '',
        color: '',
        cutters: [],
        baguettes: [],
        notes: ''
      }
    }
  },
  computed: {
    ...mapGetters('order', {orderDownloadFlag: "getDownloadFlag", orderDownloadPageableFlag: "getDownloadPageableFlag",}),
    ...mapGetters('baguette', {baguettes: 'getAllItems', baguetteDownloadFlag: "getDownloadFlag"}),
    ...mapGetters('cutter', {cutters: 'getAllItems', cuttersDownloadFlag: "getDownloadFlag"}),
    orderId() {
      if (!this.isNewItem) return Number(this.$route.params.id);
    },
    isNewItem() {
      return this.$route.params.id === 'new'
    },
    _startDate: {
      get() {
        if (this.item.startDate !== '')
          return moment(this.item.startDate).format('YYYY-MM-DD');
      },
      set(value) {
        this.item.startDate = Date.parse(value);
      },
    },

    _finishDate: {
      get() {
        if (this.item.finishDate !== '')
          return moment(this.item.startDate).format('YYYY-MM-DD');
      },
      set(value) {
        this.item.finishDate = Date.parse(value);
      },
    }
  },
  methods: {
    ...mapActions('order', {addItem: 'addPageable'}),
    sendForm() {
      this.addItem(this.item).then(() => {
        this.$store.dispatch('technologicalProcess/changeDownloadFlag', false);
      });
      this.$router.go(-1);
    },
    cansel() {
      this.$router.go(-1);
    },
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['baguette/getDownloadFlag']) this.$store.dispatch('baguette/findAll');
      if (!this.$store.getters['cutter/getDownloadFlag']) this.$store.dispatch('cutter/findAll');
      if (!this.isNewItem) {
        if (this.$store.getters['order/getDownloadFlag']) {
          this.item = cloneDeep(this.$store.getters['order/getOneItem'](this.orderId));
        } else if (this.$store.getters['order/getDownloadPageableFlag']) {
          this.item = cloneDeep(this.$store.getters['order/getOneItemPageable'](this.orderId));
        } else {
          this.$store.dispatch('order/findOnePageable', this.orderId).then((data) => {
            this.downloadOnceItem = true;
            this.item = cloneDeep(data);
          });
        }
      }
    }
  },
}
</script>

<style scoped>

</style>