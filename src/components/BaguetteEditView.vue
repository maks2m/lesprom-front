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
        <label for="inputFullName" class="form-label">Baguette name</label>
        <input type="text" class="form-control" id="inputFullName" :value="item.baguetteName" @change="inputOnForm">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "BaguetteEditView",
  data() {
    return {
      item: {
        id: '',
        baguetteName: '',
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
      this.item = Object.assign({}, this.$store.getters['baguette/getOneItem'](Number(this.$route.params.id)));
    }
  },
  methods: {
    ...mapActions('baguette', { addItem: 'add' }),
    sendForm() {
      this.addItem(this.item);
      this.$router.push('/baguette');
    },
    inputOnForm(event) {
      this.item.baguetteName = event.target.value;
    }

  }
}
</script>

<style scoped>

</style>