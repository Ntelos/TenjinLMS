<template>
  <main id="ProfileView">
    <h1>{{ $t("pagetitles.profile") }}</h1>
    <div v-if="store.role === 'school'">
      <SchoolProfile/>
    </div>
    <div v-else-if="store.role === 'teacher'">
      <TeacherProfile/>
    </div>
    <div v-else-if="store.role === 'student'">
      <StudentProfile/>
    </div>
  </main>
</template>

<script>
import SchoolProfile from '@/components/profile/SchoolProfile.vue'
import TeacherProfile from '@/components/profile/TeacherProfile.vue'
import StudentProfile from '@/components/profile/StudentProfile.vue'
import { useStore } from '@/stores/store'

    export default {
        components: {
          SchoolProfile,
          TeacherProfile,
          StudentProfile,
        },

        setup() {
            const store = useStore()
            return { store }
        }
    }
</script>
