<template>
  <main id="ClassesView">
    <h1>{{ $t("menu.classes") }}</h1>
    <br>

    <label>{{ $t("texts.Period") }}: </label>
    <select v-model="year" @change="getClasses()">
      <option value="2022-23">2022-23</option>
      <option value="2023-24">2023-24</option>
      <option value="2024-25">2024-25</option>
    </select>

    <br><br>
    <button class="but" id="show-modal" @click="showModal = true">{{ $t("texts.Add a Class") }}</button>
    <br><br>

    <Teleport to="body">
      <modal :show="showModal" @close="showModal = false">
        <template #body>
          <form @submit.prevent="addClass">
            <div class="title">{{ $t("texts.Add a Class") }}</div>

            <label>{{ $t("texts.Name") }}:</label>
            <input type="text" minlength="2" maxlength="2" required v-model="form.name">

            <label>{{ $t("texts.Year Level") }}:</label>
            <select v-model="form.yearLevel">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>

            <div class="submit" @click="showModal = false">
              <button type="submit">{{ $t("texts.Submit") }}</button>
            </div>
          </form>
        </template>
      </modal>
    </Teleport>
    
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>{{ $t("texts.Name") }}</th>
          <th>{{ $t("texts.Year Level") }}</th>
          <th>{{ $t("texts.Students") }}</th>
          <th>{{ $t("texts.Teachings") }}</th>
        </tr>
      </thead>
      <tr v-for="classroom in classrooms" v-on:click="clickClass(classroom)">
        <td>{{ classroom.name }}</td>
        <td>{{ classroom.yearLevel }}</td>
        <td>{{ classroom._count.Student }}/20</td>
        <td>{{ classroom._count.Teaching }}</td>
      </tr>
    </table>
    <br>

    <h2>{{ $t("texts.Students of Class") }} {{ clicked_classroom.name }}</h2>
    <br>
    <div v-if="classroom_students == null">
      <p>{{ $t("texts.Select a Class") }}</p>
    </div>
    <div v-else>
      <label>{{ $t("texts.Student") }}: </label>
      <select v-model="student.email">
        <option v-for="student in unassigned_students" :value="student.student.email">{{student.student.surname}} {{student.student.name}} ({{ student.yearLevel }})</option>
      </select>
      <button class="but" @click="assignStudent()">{{ $t("texts.Assign") }}</button>
      <br><br>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>{{ $t("texts.Name") }}</th>
            <th>Email</th>
            <th>{{ $t("texts.Phone") }}</th>
          </tr>
        </thead>
        <tr v-for="student in classroom_students">
          <td>{{ student.surname }} {{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
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
        form: { name: '', yearLevel: 'A' },
        classrooms: null,
        clicked_classroom: { name: '', yearLevel: '' },
        classroom_students: null,
        unassigned_students: null,
        student: { email: '' }
      }
    },

    created() {
      this.getClasses()
    },

    methods: {
      getClasses(do_not_refresh_flag) {
        const store = useStore()
        const body = { 'year': this.year }
        const config = { headers: { 'auth-token': store.token } }

        if (do_not_refresh_flag != 'X') {
          this.classroom_students = null
          this.clicked_classroom.name = ''
          this.clicked_classroom.yearLevel = ''
        }

        axios.post('/school/classrooms', body, config)
          .then(response => this.classrooms = response.data.success.classrooms)
          .catch(error => console.error(error))
      },

      addClass() {
        const store = useStore()
        const body = { 'name': this.form.name,
                       'year': this.year,
                       'yearLevel': this.form.yearLevel }
        const config = { headers: { 'auth-token': store.token } }

        const toast = useToast()

        axios.post('/school/classroom', body, config, {raw: true})
          .then((response) => {
            const res = response.data
            toast.success('Class added')
            this.getClasses()
            
          }).catch(() => {
            toast.error('Unexpected error occured')
          })
      },

      getUnassignedStudents() {
        const store = useStore()
        const body = { 'year': this.year,
                       'yearLevel': this.clicked_classroom.yearLevel }
        const config = { headers: { 'auth-token': store.token } }

        axios.post('/school/students/unassigned', body, config)
          .then(response => this.unassigned_students = response.data.success.Enrollment)
          .catch(error => console.error(error))
      },

      assignStudent() {
        const store = useStore()
        const body = { 'classroom': this.clicked_classroom.name,
                       'studentEmail': this.student.email,
                       'year': this.year }
        const config = { headers: { 'auth-token': store.token } }
        const toast = useToast()

        axios.post('/school/classrooms/student', body, config)
          .then((response) => {
            const res = response.data
            // console.log(res)
            if (res.success.issue === 'Max Capacity') {
              toast.error('This Class is full')
            } else {
              toast.success('Student assigned to Class')
              this.getClasses('X')
              this.clickClass(this.clicked_classroom)
            }

          }).catch(() => {
            toast.error('Unexpected error occured')
          })
      },

      clickClass(classroom) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year,
                       'name': classroom.name }

        this.clicked_classroom = classroom
        this.getUnassignedStudents()

        axios.post('/school/classrooms/students', body, config)
          .then(response => this.classroom_students = response.data.success.Student)
          .catch(error => console.error(error))
      }
    },

  }
</script>