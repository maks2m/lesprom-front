<template>
<!-- <test :items="'getAllItems'" />-->
  <div class="btn" @click="testMethod">test</div>
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

  },
  methods: {
    testMethod() {
      console.log(this.$store.getters['technologicalProcess/getDownloadFlag']);
    }
  },
  created() {
    if (this.$store.getters['authorization/isAuthenticated']) {

    }
  }
}
</script>

<style scoped>

</style>