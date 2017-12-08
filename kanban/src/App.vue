<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <NavBar/>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/TheNavbar'
export default {
  components: {
    'NavBar': NavBar
  },
  name: 'app'
}
</script>

<style>
body {
  margin: 0px
}
</style>
