<template>
  <main id="StudentsView">
    <h1>Students</h1>
    <br>

    <label>Period: </label>
    <select v-model="year" @change="getStudents()">
      <option value="2022-23">2022-23</option>
      <option value="2023-24">2023-24</option>
      <option value="2024-25">2024-25</option>
    </select>

    <br><br>
    <button class="but" id="show-modal" @click="showModal = true">Enroll Student</button>
    <br><br>

    <Teleport to="body">
      <modal :show="showModal" @close="showModal = false">
        <template #body>
          <form @submit.prevent="handleSubmit">
            <div class="title">Enroll a Student</div>

            <label>Email:</label>
            <input type="email" maxlength="50" required v-model="form.email">

            <label>Year Level:</label>
            <select v-model="form.yearLevel">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>

            <div class="submit" @click="showModal = false">
              <button type="submit">Enroll</button>
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
          <th>Year Level</th>
        </tr>
      </thead>
      <tr v-for="student in students"  v-on:click="clickStudent(student)">
        <td>{{ student.student.surname }} {{ student.student.name }}</td>
        <td>{{ student.student.email }}</td>
        <td>{{ student.student.phone }}</td>
        <td>{{ student.yearLevel }}</td>
      </tr>
    </table>

    <h2>Absences of Student {{ absences.student }}</h2>
    <br>
    <div v-if="absences.student == null">
      <p>Select a Student</p>
      <br>
    </div>
    <div v-else>
      <h3>Total Absences: {{ absences.count }}</h3>
      <br>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Subject</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tr v-for="absence in absences.absences">
          <td>{{ absence.date }}</td>
          <td>{{ absence.teaching.subject.name }}</td>
          <td>{{ absence.teaching.teacher.surname }} {{ absence.teaching.teacher.name }}</td>
        </tr>
      </table>
      <br>
    </div>

    <h2>Grades of Student {{ grades.student }}</h2>
    <br>
    <div v-if="grades.student == null">
      <p>Select a Student</p>
      <br>
    </div>
    <div v-else>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Grade</th>
            <th>Teacher</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tr v-for="grade in grades.grades">
          <td>{{ grade.teaching.subject.name }}</td>
          <td>{{ grade.grade }}</td>
          <td>{{ grade.teaching.teacher.surname }} {{ grade.teaching.teacher.name }}</td>
          <td>{{ grade.date }}</td>
        </tr>
      </table>
      <br>
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
  import { useToast } from 'vue-toastification'
  import axios from 'axios'

  export default {

    data() {
      return {
        year: '2023-24',
        students: null,
        form: { email: '', yearLevel: 'A' },
        absences: { student: null, count: null, absences: null },
        grades: { student: null, grades: null }
      }
    },

    created() {
      this.getStudents()
    },

    methods: {
      getStudents() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year }

        axios.post('/school/students', body, config)
          .then(response => this.students = response.data.success.students)
          .catch(error => console.error(error))
      },

      handleSubmit() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'email': this.form.email,
                       'year': this.year,
                       'yearLevel': this.form.yearLevel }

        const toast = useToast()

        axios.post('/school/student', body, config, {raw: true})
          .then((response) => {
            toast.success('Enrolled Student')
            this.getStudents()
          }).catch(() => { toast.error('Student with this email does not exist') })
      },

      clickStudent(student) {
        this.getAbsences(student.student.email)
        this.getGrades(student.student.email)
      },

      getAbsences(email) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year,
                       'email': email }

        axios.post('/school/students/absences', body, config)
          .then(response => this.absences = response.data.success)
          .catch(error => console.error(error))
      },

      getGrades(email) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.year,
                       'email': email }

        axios.post('/school/students/grades', body, config)
          .then(response => this.grades = response.data.success)
          .catch(error => console.error(error))
      }
    },

  }
</script>