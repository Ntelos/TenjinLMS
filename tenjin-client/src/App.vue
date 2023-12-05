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
  @import "@/styles/table.scss";
  @import "@/styles/modal.scss";
  @import "@/styles/form.scss";
</style>