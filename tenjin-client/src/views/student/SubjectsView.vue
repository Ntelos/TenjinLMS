<template>
  <main id="SubjectsView">
    <h1>Subjects</h1>

    <br>
    <label>Period: </label>
    <select v-model="year" @change="onChange()">
        <option value="2022-23">2022-23</option>
        <option value="2023-24">2023-24</option>
    </select>
    <br><br>

    <label>Year Level: {{ datax.yearLevel }}</label>
    <br><br>
    
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Hours/Week</th>
          <th>Teacher</th>
        </tr>
      </thead>
      <tr v-for="d in datax.Teaching">
        <td>{{ d.subject.name }}</td>
        <td>{{ d.subject.weeklyHours }}</td>
        <td>{{ d.teacher.name }} {{ d.teacher.surname }}</td>
      </tr>
    </table>

  </main>
</template>

<script>
  import { useStore } from '@/stores/store'
  import axios from 'axios'

  export default {

    data() {
      return {
        year: '2023-24',
        datax: { yearLevel: null, Teaching: null }
      }
    },

    created() {
      const store = useStore()
      const body = { 'year': this.year }
      const config = { headers: { 'auth-token': store.token } }

      axios.post('/student/subjects', body, config)
        .then(response => this.datax = response.data.success)
        .catch(error => console.error(error))
    },

    methods: {
      onChange() {
        const store = useStore()
        const body = { 'year': this.year }
        const config = { headers: { 'auth-token': store.token } }

        axios.post('/student/subjects', body, config)
          .then(response => this.datax = response.data.success)
          .catch(error => console.error(error))
      }
    }

  }
</script>