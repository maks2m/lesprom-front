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
      counter: 0
    }
  },

}
</script>

<style>

</style>
