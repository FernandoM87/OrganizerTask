<template>
  <div>
    <nav class="bg-blue-500 p-4">
      <ul class="flex space-x-4 text-white">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
export default{
  name: 'App',
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px;
}
</style>
