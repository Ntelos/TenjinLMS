<template>
  <main id="ClassroomsView">
    <h1>Teachings</h1>
    <br>

    <label>Period: </label>
    <select v-model="selectedYear" @change="getTeachings()">
      <option value="2022-23">2022-23</option>
      <option value="2023-24">2023-24</option>
      <option value="2024-25">2024-25</option>
    </select>
    <br><br>

    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>School</th>
          <th>Classroom</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tr v-for="teaching in teachings" v-on:click="selectedTeaching(teaching)">
        <td>{{ teaching.school.name }}</td>
        <td>{{ teaching.classroom.name }}</td>
        <td>{{ teaching.subject.name }}</td>
      </tr>
    </table>

    <h2>Grades of Teaching {{ this.clickedTeaching.subject.name }} {{ this.clickedTeaching.classroom.name }} {{ this.clickedTeaching.school.name }}</h2>
    <br>
    <div v-if="clickedTeaching.subject.name === null">
      <p>Select a Teaching</p>
      <br>
    </div>
    <div v-else>
      <button class="but" id="show-modal" @click="showModal = true">Submit/Update Grade</button>
      <br><br>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Grade</th>
            <th>Date</th>
          </tr>
        </thead>
        <tr v-for="student in students">
          <td>{{ student.surname }} {{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ getGrade(student.email) }}</td>
          <td>{{ getDate(student.email) }}</td>
        </tr>
      </table>
      <br>
    </div>

    <Teleport to="body">
      <modal :show="showModal" @close="showModal = false">
        <template #body>
          <form @submit.prevent="addGrade">
            <div class="title">Submit/Update Grade</div>

            <label>Student:</label>
            <select v-model="form.student" required>
              <option v-for="student in students" :value="student.email">{{ student.surname }} {{ student.name }}</option>
            </select>

            <label>Grade:</label>
            <input type="number" maxlength="2" min="0" max="20" step="0.5" required v-model="form.grade">

            <div class="submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </template>
      </modal>
    </Teleport>

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
        selectedYear: '2023-24',
        teachings: null,
        clickedTeaching: { subject: { name: null }, classroom: {name: null }, school: {email: null} },
        studentGrades: null,
        students: null,
        form: { student: '', grade: '0' },
      }
    },

    created() {
      this.getTeachings()
    },

    methods: {
      getTeachings() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.selectedYear }

        this.teachings = null
        this.clickedTeaching.subject.name = null
        this.clickedTeaching.classroom.name = null
        this.clickedTeaching.school.email = null
        this.studentGrades = null
        this.students = null
        
        axios.post('/teacher/subjects', body, config)
          .then(response => this.teachings = response.data.success.teachings)
          .catch(error => console.error(error))
      },

      selectedTeaching(teaching) {
        this.studentGrades = null
        this.students = null
        this.clickedTeaching = teaching
        this.getStudentsGradesofTeaching(teaching)
      },

      getStudentsGradesofTeaching(teaching) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.selectedYear,
                       'schoolEmail': teaching.school.email,
                       'subject': teaching.subject.name,
                       'classroom': teaching.classroom.name }
        
        axios.post('/teacher/teaching/grades', body, config)
          .then((response) => {
            this.studentGrades = response.data.success.teachingInfo.Grade
            this.students = response.data.success.teachingInfo.classroom.Student
          }).catch(() => { error => console.error(error) })
      },

      getGrade(studentEmail) {
        let result = this.studentGrades.filter(obj => {
          return obj.student.email === studentEmail
        })
        if (result[0]) {
          return result[0].grade
        } else {
          return ''
        }
      },

      getDate(studentEmail) {
        let result = this.studentGrades.filter(obj => {
          return obj.student.email === studentEmail
        })
        if (result[0]) {
          return result[0].date
        } else {
          return ''
        }
      },

      addGrade() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'studentEmail': this.form.student,
                       'year': this.selectedYear,
                       'schoolEmail': this.clickedTeaching.school.email,
                       'classroom': this.clickedTeaching.classroom.name,
                       'subject': this.clickedTeaching.subject.name,
                       'grade': this.form.grade }

        const toast = useToast()

        axios.post('/teacher/student/grade', body, config, {raw: true})
          .then((response) => {
            toast.success('Success')
            this.getStudentsGradesofTeaching(this.clickedTeaching)
          }).catch(() => { toast.error('Unexpected error occured') })

        this.form.student = ''
        this.form.grade = '0'
      },
    }

  }
</script>