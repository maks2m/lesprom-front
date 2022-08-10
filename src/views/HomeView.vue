<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <img class="mx-auto d-block" alt="Vue logo" src="../assets/logo.png">
        <app-home />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHome from '@/components/Home'

export default {
  name: 'HomeView',
  components: {
    AppHome
  }
}
</script>
