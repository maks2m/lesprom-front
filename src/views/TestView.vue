<template>
<!--  <pagination
      :totalPages="9"
      :perPage="9"
      :maxVisibleButtons="5"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
  />-->

  <input type="number" placeholder="number" v-model="number">
  <a class="button_style" :href="'https://www.google.com/search?q=' + number">send</a>
</template>

<script>

export default {
  name: "TestView",
  data () {
    return {
      number: 50
    };
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
    }
  }
}
</script>

<style scoped>
.button_style {
  display: inline-block; /* Строчно-блочный элемент */
  background: #8C959D; /* Серый цвет фона */
  color: #fff; /* Белый цвет текста */
  padding: 3px 20px; /* Поля вокруг текста */
  text-decoration: none; /* Убираем подчёркивание */
  border-radius: 3px; /* Скругляем уголки */
}
</style>