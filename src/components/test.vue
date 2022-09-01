<template>
  <div class="btn btn-primary" @click="sorted">test</div>
  {{items}}
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
  computed: {
    items: {
      get() {
        return this.$store.getters['cutter/getAllItems'];
      },
      set(value) {
        this.$store.dispatch('cutter/add', value);
      }
    }
  },
  methods: {
    sorted() {
      //return this.items.sort((a, b) => a.color > b.color ? 1 : -1 );
      //this.this_items = this.items.sort((a, b) => a.radius > b.radius ? 1 : -1 );
    }
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {
      if (!this.$store.getters['cutter/getDownloadFlag']) this.$store.dispatch('cutter/findAll');
    }
  }
}
</script>

<style scoped>

</style>