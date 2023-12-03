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
    <div class="points">
        <div v-if="store.user.points !== null">
            Points: {{ store.user.points }}
        </div>
        <div v-else>
            Points: 0
        </div>
    </div>
    <div class="class">
        <div v-if="store.user.classroom !== null">
            Class: {{ store.user.classroom }}
        </div>
        <div v-else>
            Currently not assigned at a Class
        </div>
    </div>
</template>

<script>
    import { useStore } from '@/stores/store'

    export default {
        setup() {
            const store = useStore()
            store.getStudentPoints()
            store.getStudentClassroom()
            return { store }
        },
    }
</script>