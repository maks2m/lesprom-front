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
    if (localStorage.getItem('user')) {
      this.$store.dispatch('authorization/setUser', JSON.parse(localStorage.getItem('user')));
    }
  },
}
</script>

<style>

</style>
