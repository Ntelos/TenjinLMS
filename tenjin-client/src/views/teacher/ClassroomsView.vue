<template>
  <main id="TeacherGradesView">
    <h1>{{ $t("menu.classes") }}</h1>
    <br>

    <label>{{ $t("texts.Period") }}: </label>
    <select v-model="selectedYear" @change="getClasses()">
      <option value="2022-23">2022-23</option>
      <option value="2023-24">2023-24</option>
      <option value="2024-25">2024-25</option>
    </select>
    <br><br>

    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>{{ $t("texts.School") }}</th>
          <th>{{ $t("texts.Classroom") }}</th>
        </tr>
      </thead>
      <tr v-for="classroom in classes" v-on:click="selectedClass(classroom)">
        <td>{{ classroom.school.name }}</td>
        <td>{{ classroom.classroom.name }}</td>
      </tr>
    </table>

    <h2>{{ $t("texts.Students of Classroom") }} {{ this.clickedClass.classroom.name }}</h2>
    <br>
    <div v-if="clickedClass.classroom.name === null">
      <p>{{ $t("texts.Select a Classroom") }}</p>
      <br>
    </div>
    <div v-else>
      <label>{{ $t("texts.Add Points") }}: </label>
      <input v-model="addpoints.points" placeholder="points" type="number" />
      <label> {{ $t("texts.to Student") }}: </label>
      <select v-model="addpoints.student">
        <option v-for="student in students" :value="student.email">{{ student.surname }} {{ student.name }}</option>
      </select>
      <button class="but" @click="addPoints()">{{ $t("texts.Add Points") }}</button>
      <br><br>

      <label>{{ $t("texts.Add Absence to Student") }}: </label>
      <select v-model="addabsence.student">
        <option v-for="student in students" :value="student.email">{{ student.surname }} {{ student.name }}</option>
      </select>
      <label> {{ $t("texts.for Teaching") }}: </label>
      <select v-model="addabsence.subject">
        <option v-for="subject in subjects" :value="subject.subject.name">{{ subject.subject.name }}</option>
      </select>
      <button class="but" @click="addAbsence()">{{ $t("texts.Add Absence") }}</button>
      <br><br>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>{{ $t("texts.Surname") }}</th>
            <th>{{ $t("texts.Name") }}</th>
            <th>Email</th>
            <th>{{ $t("texts.Phone") }}</th>
            <th>{{ $t("texts.Points") }}</th>
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
  import { ref, toHandlers } from 'vue'
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
          .then((response) => {
            
            var classes = response.data.success.teachingClassrooms
            var allUniqueClasses = []
            
            var uniqueSchools = Array.from( new Set( classes.reduce( (carry, current) => [...carry, current.school.email], [] ) ) )
            // console.log('Unique School values:', uniqueSchools)

            uniqueSchools.forEach((currentElementSchool, indexSchool, arraySchool) => {
              
              var filteredSchoolsData = classes.filter(obj => { return obj.school.email === currentElementSchool })
              // console.log('Data for', currentElementSchool, filteredSchoolsData)

              var uniqueClasses = Array.from( new Set( filteredSchoolsData.reduce( (carry, current) => [...carry, current.classroom.name], [] ) ) )
              // console.log('Unique Classes of school:', currentElementSchool, uniqueClasses)

              uniqueClasses.forEach((currentElementClass, indexClass, arrayClass) => {
                var uniqueClassData = filteredSchoolsData.find(obj => { return obj.classroom.name === currentElementClass })
                // console.log('Data for', currentElementClass, uniqueClassData)

                allUniqueClasses.push(uniqueClassData)
              })

            })
            
            // console.log('Unique Classes to be shown:', allUniqueClasses)
            this.classes = allUniqueClasses

          }).catch((error) => { console.error(error) })
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