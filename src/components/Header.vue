<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">LESPROM</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/order">Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/baguette">Baguettes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cutter">Cutters</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/workplace">Workplaces</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/employee">Employees</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user">Users</router-link>
          </li>
          <li  class="nav-item">
            <router-link class="nav-link" to="/role">Roles</router-link>
          </li>
        </ul>
        <span class="navbar-text ms-2 me-2" >Username</span>
        <form>
          <button class="btn btn-sm btn-outline-secondary" type="submit">Sign Out</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped>

</style>