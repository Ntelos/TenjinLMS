<template>
    <!-- General -->
    <router-link class="button" :to="{ name: 'home' }">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
    </router-link>

    <router-link v-if="store.authenticated" class="button" :to="{ name: 'profile' }">
        <span class="material-icons">badge</span>
        <span class="text">Profile</span>
    </router-link>

    <!-- Students -->
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

    <!-- Schools -->
    <router-link v-if="store.role === 'school'" class="button" :to="{ name: 'students' }">
        <span class="material-icons">groups_2</span>
        <span class="text">Students</span>
    </router-link>

    <router-link v-if="store.role === 'school'" class="button" :to="{ name: 'teachers' }">
        <span class="material-icons">manage_accounts</span>
        <span class="text">Teachers</span>
    </router-link>

    <router-link v-if="store.role === 'school'" class="button" :to="{ name: 'classes' }">
        <span class="material-icons">list_alt</span>
        <span class="text">Classes</span>
    </router-link>

    <router-link v-if="store.role === 'school'" class="button" :to="{ name: 'allsubjects' }">
        <span class="material-icons">menu_book</span>
        <span class="text">Subjects</span>
    </router-link>

    <!-- Teachers -->
    <router-link v-if="store.role === 'teacher'" class="button" :to="{ name: 'teachings' }">
        <span class="material-icons">list_alt</span>
        <span class="text">Teachings</span>
    </router-link>

    <router-link v-if="store.role === 'teacher'" class="button" :to="{ name: 'classrooms' }">
        <span class="material-icons">people_alt</span>
        <span class="text">Classes</span>
    </router-link>

    <router-link v-if="store.role === 'teacher'" class="button" :to="{ name: 'teachergrades' }">
        <span class="material-icons">file_copy</span>
        <span class="text">Grades</span>
    </router-link>

    <!-- General -->
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