<template>
  <main id="TeachersView">
    <h1>Teachers</h1>
    <br>
    <label>Period: </label>
    <select v-model="year" @change="getTeachers(), getClasses()">
        <option value="2022-23">2022-23</option>
        <option value="2023-24">2023-24</option>
        <option value="2024-25">2024-25</option>
    </select>
    <br><br>
    <button class="but" id="show-modal" @click="showModal = true">Employ Teacher</button>
    <br><br>

    <Teleport to="body">
      <modal :show="showModal" @close="showModal = false">
        <template #body>
          <form @submit.prevent="employTeacher">

            <div class="title">Employ a Teacher</div>

            <label>Email:</label>
            <input type="email" maxlength="50" required v-model="form.email">

            <div class="submit" @click="showModal = false">
                <button type="submit">Employ</button>
            </div>
          </form>
        </template>
      </modal>
    </Teleport>

    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tr v-for="teacher in teachers" v-on:click="clickTeacher(teacher)">
        <td>{{ teacher.teacher.surname }} {{ teacher.teacher.name }}</td>
        <td>{{ teacher.teacher.email }}</td>
        <td>{{ teacher.teacher.phone }}</td>
      </tr>
    </table>

    <h2>Teachings of Teacher {{ clickedTeacher.surname }} {{ clickedTeacher.name }}</h2>
    <br>
    <div v-if="teachings == null">
      <p>Select a Teacher</p>
    </div>
    <div v-else>
      <label>Subject: </label>
      <input v-model="teaching.subject" placeholder="subject name" />
      <label> to Class: </label>
      <select v-model="teaching.class">
        <option v-for="classs in classes" :value="classs.name"> {{ classs.name }}</option>
      </select>
      <button class="but" @click="assignTeaching()">Assign new Teaching</button>
      <br><br>
      <table class="table table-bordered">
      <thead>
        <tr>
          <th>Class</th>
          <th>Subject</th>
          <th>Hours/Week</th>
        </tr>
      </thead>
      <tr v-for="teaching in teachings">
        <td>{{ teaching.classroom.name }}</td>
        <td>{{ teaching.subject.name }}</td>
        <td>{{ teaching.subject.weeklyHours }}</td>
      </tr>
    </table>
    </div>
    
  </main>
</template>

<script setup>
  import Modal from '@/views/Modal.vue'
  import { ref } from 'vue'
  const showModal = ref(false)
</script>

<script>
  import { useStore } from '@/stores/store'
  import { useToast } from "vue-toastification"
  import axios from 'axios'

  export default {

    data() {
      return {
        year: '2023-24',
        teachers: null,
        clickedTeacher: { email: null, name: null, surname: null },
        teachings: null,
        form: { email: '' },
        teaching: { subject: '', class: '' },
        classes: null
      }
    },

    created() {
      this.getTeachers()
      this.getClasses()
    },

    methods: {
      getTeachers() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year }

        this.teachings = null
        this.clickedTeacher.email = null
        this.clickedTeacher.name = null
        this.clickedTeacher.surname = null
        this.subject = null

        axios.post('/school/teachers', body, config)
          .then(response => this.teachers = response.data.success.teachers)
          .catch(error => console.error(error))
      },

      getClasses() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year }

        axios.post('/school/classrooms', body, config)
          .then(response => this.classes = response.data.success.classrooms)
          .catch(error => console.error(error))
      },

      employTeacher() {
        const store = useStore()
        const toast = useToast()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'email': this.form.email,
                       'year': this.year }
        
        axios.post('/school/teacher', body, config, {raw: true})
          .then((response) => {
            toast.success('Employed Teacher')
            this.getTeachers()
          }).catch(() => { toast.error('Teacher with this email does not exist') })
      },

      clickTeacher(teacher) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year,
                       'teacherEmail': teacher.teacher.email }

        this.clickedTeacher = teacher.teacher
        this.subject = null

        axios.post('/school/teachings', body, config)
          .then(response => this.teachings = response.data.success.teachings)
          .catch(error => console.error(error))
      },

      getTeachings(teacherEmail) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year,
                       'teacherEmail': teacherEmail }

        this.subject = null

        axios.post('/school/teachings', body, config)
          .then(response => this.teachings = response.data.success.teachings)
          .catch(error => console.error(error))
      },

      assignTeaching() {
        const store = useStore()
        const toast = useToast()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year,
                       'teacherEmail': this.clickedTeacher.email,
                       'subject': this.teaching.subject,
                       'classroom': this.teaching.class }
        
        axios.post('/school/teaching', body, config)
          .then((response) => {
            toast.success('Teaching Assigned')
            this.getTeachings(this.clickedTeacher.email)
          }).catch(() => { toast.error('Something went wrong') })

        this.teaching.subject = null
        this.teaching.class = null
      }
    }

  }
</script>