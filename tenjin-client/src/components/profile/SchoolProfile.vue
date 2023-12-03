<template>
    <div class="name">
        <br>
        <h2>
            {{ store.user.name }}
        </h2>
    </div>
    <div class="address">
        <br>
        Address:
        {{ store.user.address }},
        {{ store.user.town }},
        {{ store.user.district }}
    </div>
    <div class="phone">
        Phone: {{ store.user.phone }}
    </div>
    <div class="email">
        Email: {{ store.user.email }}
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