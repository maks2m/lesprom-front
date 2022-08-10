<template>
  <app-header/>
  <router-view style="padding-top: 70px"/>
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
