<template>
    <div class="profile_card">
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
            {{ $t("profile.Phone") }}: {{ store.user.phone }}
        </div>
        <div class="points">
            <div v-if="store.user.points !== null">
                {{ $t("profile.Points") }}: {{ store.user.points }}
            </div>
            <div v-else>
                {{ $t("profile.Points") }}: 0
            </div>
        </div>
        <div class="class">
            <div v-if="store.user.classroom !== ''">
                {{ $t("profile.Class") }}: {{ store.user.classroom }}
            </div>
            <div v-else>
                {{ $t("profile.Currently not assigned at a Class") }}
            </div>
        </div>
        <span class="material-icons" id="profile_icon">school</span>
    </div>

    <div class="profile_card">
        <div v-if="store.user.schoolId !== ''">
            <br>
            <h2>{{ $t("profile.Schools Info") }}</h2>
            <br>
            <div>{{ store.user.schoolName }}</div>
            <div>{{ store.user.schoolAddress }}</div>
            <div class="phone_info"><span class="material-icons">local_phone</span>{{ store.user.schoolPhone }}</div>
            <div class="school_img" >
                <img src="@/assets/campus.png" alt="">
            </div>
        </div>
        <div v-else>
            Currently not assigned at a School
            <div class="school_img" >
                <img src="@/assets/campus.png" alt="">
            </div>
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