<template>
    <div class="name">
        <br>
        <h2>
            {{ store.user.name }}
            {{ store.user.surname }}
        </h2>
    </div>
    <div class="email">
        <br>
        Email: {{ store.user.email }}
    </div>
    <div class="phone">
        Phone: {{ store.user.phone }}
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