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

/*
    if (this.$store.getters['authorization/isAuthenticated']) {

      if (!this.$store.getters['baguette/getDownloadFlag']) {
        this.$store.dispatch('baguette/changeUrlParam', { pageNo: -1, pageSize: '', sortBy: 'id' }).then(() => {
          this.$store.dispatch('baguette/findAll');
        })
      }
      if (!this.$store.getters['cutter/getDownloadFlag']) {
        this.$store.dispatch('cutter/changeUrlParam', { pageNo: -1, pageSize: '', sortBy: 'id' }).then(() => {
          this.$store.dispatch('cutter/findAll');
        })
      }
      if (!this.$store.getters['employee/getDownloadFlag']) {
        this.$store.dispatch('employee/changeUrlParam', { pageNo: -1, pageSize: '', sortBy: 'id' }).then(() => {
          this.$store.dispatch('employee/findAll');
        })
      }
      if (!this.$store.getters['user/getDownloadFlag']) {
        this.$store.dispatch('user/changeUrlParam', { pageNo: -1, pageSize: '', sortBy: 'id' }).then(() => {
          this.$store.dispatch('user/findAll');
        })
      }
      if (!this.$store.getters['role/getDownloadFlag']) {
        this.$store.dispatch('role/changeUrlParam', { pageNo: -1, pageSize: '', sortBy: 'id' }).then(() => {
          this.$store.dispatch('role/findAll');
        })
      }
      if (!this.$store.getters['workplace/getDownloadFlag']) {
        this.$store.dispatch('workplace/changeUrlParam', { pageNo: -1, pageSize: '', sortBy: 'id' }).then(() => {
          this.$store.dispatch('workplace/findAll');
        })
      }
    }
*/

  }
}
</script>

<style>

</style>
