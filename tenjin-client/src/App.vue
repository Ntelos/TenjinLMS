<template>
  <div class="app">
    <GenericSidebar/>
    <router-view/>
  </div>
</template>

<script setup>
  import GenericSidebar from '@/components/GenericSidebar.vue'
</script>

<style lang="scss">
  @import "@/styles/app.scss";
</style>