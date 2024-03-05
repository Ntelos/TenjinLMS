<template>
    <aside :class="`${isExpanded ? 'expanded' : ''}`">
        <div class="logo">
            <img src="@/assets/logo.png" alt="Tenjin logo">
        </div>

        <div class="menu-toggle-wrap" @click="toggleMenu">
            <button class="menu-toggle">
                <span class="material-icons">keyboard_double_arrow_right</span>
            </button>
        </div>

        <h3 class="menu-title">Menu</h3>
        <div class="menu">
            <NavigationMenu/>
        </div>

        <div class="lang-toggle">
            <div>
                <button @click="$i18n.locale='en'">EN</button>
            </div>
            <div>
                <button @click="$i18n.locale='gr'">ΕΛ</button>
            </div>
        </div>
    </aside>
</template>

<script setup>
    import NavigationMenu from '@/components/NavigationMenu.vue'
    import { ref } from 'vue'

    const isExpanded = ref(localStorage.getItem("expanded") === "true")

    const toggleMenu = () => {
        isExpanded.value = !isExpanded.value

        localStorage.setItem("expanded", isExpanded.value)
    }
</script>

<style lang="scss">
  @import "@/styles/sidebar.scss";
</style>