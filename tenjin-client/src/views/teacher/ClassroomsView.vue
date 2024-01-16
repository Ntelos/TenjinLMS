<template>
  <main id="TeacherGradesView">
    <h1>Classes</h1>
    <br>

    <label>Period: </label>
    <select v-model="selectedYear" @change="getClasses()">
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
        </tr>
      </thead>
      <tr v-for="classroom in classes" v-on:click="selectedClass(classroom)">
        <td>{{ classroom.school.name }}</td>
        <td>{{ classroom.classroom.name }}</td>
      </tr>
    </table>

    <h2>Students of Classroom {{ this.clickedClass.classroom.name }}</h2>
    <br>
    <div v-if="clickedClass.classroom.name === null">
      <p>Select a Classroom</p>
      <br>
    </div>
    <div v-else>
      <label>Add Points: </label>
      <input v-model="addpoints.points" placeholder="points" type="number" />
      <label> to Student: </label>
      <select v-model="addpoints.student">
        <option v-for="student in students" :value="student.email">{{ student.surname }} {{ student.name }}</option>
      </select>
      <button class="but" @click="addPoints()">Add Points</button>
      <br><br>

      <label>Add Absence to Student: </label>
      <select v-model="addabsence.student">
        <option v-for="student in students" :value="student.email">{{ student.surname }} {{ student.name }}</option>
      </select>
      <label> for Teaching: </label>
      <select v-model="addabsence.subject">
        <option v-for="subject in subjects" :value="subject.subject.name">{{ subject.subject.name }}</option>
      </select>
      <button class="but" @click="addAbsence()">Add Absence</button>
      <br><br>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Surname</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Points</th>
          </tr>
        </thead>
        <tr v-for="student in students">
          <td>{{ student.surname }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
          <td>{{ student.points }}</td>
        </tr>
      </table>
      <br>
    </div>

  </main>  
</template>

<script setup>
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
        classes: null,
        clickedClass: { classroom: {name: null }, school: {email: null} },
        students: null,
        addpoints: { points: 0, student: '' },
        subjects: { name: '' },
        addabsence: { student: '', subject: '' }
      }
    },

    created() {
      this.getClasses()
    },

    methods: {
      getClasses() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.selectedYear }

        this.classes = null
        this.clickedClass.classroom.name = null
        this.clickedClass.school.email = null
        this.students = null
        this.subjects = null
        
        axios.post('/teacher/classrooms', body, config)
          .then(response => this.classes = response.data.success.teachingClassrooms)
          .catch(error => console.error(error))
      },

      selectedClass(classroom) {
        this.students = null
        this.subjects = null
        this.clickedClass = classroom
        this.getStudentsofClass(classroom)
      },

      getStudentsofClass(classroom) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.selectedYear,
                       'schoolEmail': classroom.school.email,
                       'classroomName': classroom.classroom.name }
        
        axios.post('/teacher/classroom/students', body, config)
          .then(response => this.students = response.data.success.students.Student)
          .catch(error => console.error(error))

        this.getTeachingsofClass(classroom)
      },

      getTeachingsofClass(classroom) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.selectedYear,
                       'schoolEmail': classroom.school.email,
                       'classroomName': classroom.classroom.name }
        
        axios.post('/teacher/classroom/teachings', body, config)
          .then(response => this.subjects = response.data.success.subjects)
          .catch(error => console.error(error))
      },

      addPoints() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'email': this.addpoints.student,
                       'points': Number(this.addpoints.points) }

        const toast = useToast()
        console.log(this.clickedClass)

        axios.post('/teacher/student/points', body, config, {raw: true})
          .then((response) => {
            toast.success('Points were Added')
            this.getStudentsofClass(this.clickedClass)
          }).catch(() => { toast.error('There was an error') })

        this.addpoints.addpoints = ''
        this.addpoints.points = 0
      },

      addAbsence() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'studentEmail': this.addabsence.student,
                       'year': this.selectedYear,
                       'schoolEmail': this.clickedClass.school.email,
                       'classroom': this.clickedClass.classroom.name,
                       'subject': this.addabsence.subject }

        const toast = useToast()

        axios.post('/teacher/student/absence', body, config, {raw: true})
          .then((response) => {
            toast.success('Absence was Added')
            this.getStudentsofClass(this.clickedClass)
          }).catch(() => { toast.error('There was an error') })

        this.addabsence.student = ''
        this.addabsence.subject = ''
      }

    }

  }
</script>