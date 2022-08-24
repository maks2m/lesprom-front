<template>
  <app-header/>
  <div style="padding-top: 60px">
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'


export default {
  components: {
    AppHeader
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  created() {
    if (localStorage.getItem('user')) {
      this.$store.dispatch('authorization/setUser', JSON.parse(localStorage.getItem('user')));
    }
    if (!this.$store.getters['baguette/getDownloadFlag']) this.$store.dispatch('baguette/findAll');
    if (!this.$store.getters['cutter/getDownloadFlag']) this.$store.dispatch('cutter/findAll');
    if (!this.$store.getters['workplace/getDownloadFlag']) this.$store.dispatch('workplace/findAll');
    if (!this.$store.getters['employee/getDownloadFlag']) this.$store.dispatch('employee/findAll');
    if (!this.$store.getters['timeOfEmployeeOnOrder/getDownloadFlag']) this.$store.dispatch('timeOfEmployeeOnOrder/findAll');
  }
}
</script>

<style>

</style>
