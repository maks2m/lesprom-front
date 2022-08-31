<template>
 <test :items="getAllItems" />
</template>

<script>
import test from "@/components/test";
import {mapGetters} from "vuex";

export default {
  name: "TestView",
  components: {
    test
  },
  computed: {
    ...mapGetters('order', { getAllItems: 'getAllItems' }),
  },
}
</script>

<style scoped>

</style>