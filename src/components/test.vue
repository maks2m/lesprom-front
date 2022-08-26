<template>
  <div class="btn btn-primary" @click="sorted">test</div>
  {{this_items}}
</template>

<script>
export default {
  name: "test",
  props: {
    items: {
      value: Array,
      default: () => [],
    }
  },
  data() {
    return {
      this_items: [],
    }
  },
  methods: {
    sorted() {
      //return this.items.sort((a, b) => a.color > b.color ? 1 : -1 );
      this.this_items = this.items.sort((a, b) => a.radius > b.radius ? 1 : -1 );
    }
  }
}
</script>

<style scoped>

</style>