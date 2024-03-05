<template>
    <!-- General -->
    <router-link class="button" :to="{ name: 'home' }">
        <span class="material-icons">home</span>
        <span class="text">{{ $t("menu.home") }}</span>
    </router-link>

    <router-link v-if="store.authenticated" class="button" :to="{ name: 'profile' }">
        <span class="material-icons">badge</span>
        <span class="text">{{ $t("menu.profile") }}</span>
    </router-link>

    <!-- Students -->
    <router-link v-if="store.role === 'student'" class="button" :to="{ name: 'grades' }">
        <span class="material-icons">library_books</span>
        <span class="text">{{ $t("menu.grades") }}</span>
    </router-link>

    <router-link v-if="store.role === 'student'" class="button" :to="{ name: 'absences' }">
        <span class="material-icons">directions_run</span>
        <span class="text">{{ $t("menu.absences") }}</span>
    </router-link>

    <router-link v-if="store.role === 'student'" class="button" :to="{ name: 'subjects' }">
        <span class="material-icons">menu_book</span>
        <span class="text">{{ $t("menu.subjects") }}</span>
    </router-link>

    <router-link v-if="store.role === 'student'" class="button" :to="{ name: 'tasks' }">
        <span class="material-icons">pending_actions</span>
        <span class="text">{{ $t("menu.tasks") }}</span>
    </router-link>

    <!-- Schools -->
    <router-link v-if="store.role === 'school'" class="button" :to="{ name: 'students' }">
        <span class="material-icons">groups_2</span>
        <span class="text">{{ $t("menu.students") }}</span>
    </router-link>

    <router-link v-if="store.role === 'school'" class="button" :to="{ name: 'teachers' }">
        <span class="material-icons">manage_accounts</span>
        <span class="text">{{ $t("menu.teachers") }}</span>
    </router-link>

    <router-link v-if="store.role === 'school'" class="button" :to="{ name: 'classes' }">
        <span class="material-icons">list_alt</span>
        <span class="text">{{ $t("menu.classes") }}</span>
    </router-link>

    <router-link v-if="store.role === 'school'" class="button" :to="{ name: 'allsubjects' }">
        <span class="material-icons">menu_book</span>
        <span class="text">{{ $t("menu.subjects") }}</span>
    </router-link>

    <!-- Teachers -->
    <router-link v-if="store.role === 'teacher'" class="button" :to="{ name: 'teachings' }">
        <span class="material-icons">list_alt</span>
        <span class="text">{{ $t("menu.teachings") }}</span>
    </router-link>

    <router-link v-if="store.role === 'teacher'" class="button" :to="{ name: 'classrooms' }">
        <span class="material-icons">people_alt</span>
        <span class="text">{{ $t("menu.classes") }}</span>
    </router-link>

    <router-link v-if="store.role === 'teacher'" class="button" :to="{ name: 'teachergrades' }">
        <span class="material-icons">file_copy</span>
        <span class="text">{{ $t("menu.grades") }}</span>
    </router-link>

    <!-- General -->
    <router-link v-if="!store.authenticated" class="button" :to="{ name: 'login' }">
        <span class="material-icons">login</span>
        <span class="text">{{ $t("menu.login") }}</span>
    </router-link>

    <a href="#" v-if="store.authenticated" class="button" @click.prevent="logout">
        <span class="material-icons">logout</span>
        <span class="text">{{ $t("menu.logout") }}</span>
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