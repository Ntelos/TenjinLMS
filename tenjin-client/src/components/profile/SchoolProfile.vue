<template>
  <div class="name">
        {{ store.user.name }}
    </div>
    <div class="address">
        {{ store.user.address }},
        {{ store.user.town }},
        {{ store.user.district }}
    </div>
    <div class="phone">
        {{ store.user.phone }}
    </div>
    <div class="email">
        {{ store.user.email }}
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