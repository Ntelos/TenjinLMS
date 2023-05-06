<template>
    <div class="name">
        {{ store.user.name }}
        {{ store.user.surname }}
    </div>
    <div class="email">
        {{ store.user.email }}
    </div>
    <div class="phone">
        {{ store.user.phone }}
    </div>
</template>

<script>
    import { useStore } from '@/stores/store'

    export default {
        setup() {
            const store = useStore()
            return { store }
        }
    }
</script>