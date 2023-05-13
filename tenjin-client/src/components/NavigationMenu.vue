<template>
    <router-link class="button" :to="{ name: 'home' }">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
    </router-link>

    <router-link v-if="store.authenticated" class="button" :to="{ name: 'profile' }">
        <span class="material-icons">badge</span>
        <span class="text">Profile</span>
    </router-link>

    <router-link v-if="store.role === 'student'" class="button" :to="{ name: 'grades' }">
        <span class="material-icons">library_books</span>
        <span class="text">Grades</span>
    </router-link>

    <router-link v-if="store.role === 'student'" class="button" :to="{ name: 'absences' }">
        <span class="material-icons">directions_run</span>
        <span class="text">Absences</span>
    </router-link>

    <router-link v-if="store.role === 'student'" class="button" :to="{ name: 'subjects' }">
        <span class="material-icons">menu_book</span>
        <span class="text">Subjects</span>
    </router-link>

    <router-link v-if="store.role === 'student'" class="button" :to="{ name: 'tasks' }">
        <span class="material-icons">pending_actions</span>
        <span class="text">Tasks</span>
    </router-link>

    <router-link v-if="!store.authenticated" class="button" :to="{ name: 'login' }">
        <span class="material-icons">login</span>
        <span class="text">Login</span>
    </router-link>

    <a href="#" v-if="store.authenticated" class="button" @click.prevent="logout">
        <span class="material-icons">logout</span>
        <span class="text">Logout</span>
    </a>
   
</template>

<script>
    import { useToast } from "vue-toastification";
    import { useStore } from '@/stores/store'

    export default {
        setup() {
            const store = useStore()
            const toast = useToast();
            return { store, toast }
        },

        methods: {
            logout() {
                this.store.logout()
                this.$router.replace({name: 'home'})
                this.toast.info("Logged Out!")
            }
        }
    }
</script>