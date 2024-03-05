<template>
    <main id="AbsencesView">
      <h1>{{ $t("menu.absences") }}</h1>
  
      <br>
      <label>{{ $t("texts.Period") }}: </label>
      <select v-model="year" @change="onChange()">
          <option value="2022-23">2022-23</option>
          <option value="2023-24">2023-24</option>
      </select>
      <br><br>

      <label>{{ $t("texts.Total Absences") }}: {{ datax.count }}</label>
      <br><br>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>{{ $t("texts.Date") }}</th>
            <th>{{ $t("texts.Year Level") }}</th>
            <th>{{ $t("texts.Subject") }}</th>
            <th>{{ $t("texts.Teacher") }}</th>
          </tr>
        </thead>
        <tr v-for="d in datax.absences">
          <td>{{ d.date }}</td>
          <td>{{ d.teaching.subject.yearLevel }}</td>
          <td>{{ d.teaching.subject.name }}</td>
          <td>{{ d.teaching.teacher.surname }} {{ d.teaching.teacher.name }}</td>
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
          datax: { count: null, absences: null }
        }
      },

      created() {
        const store = useStore()
        const body = { 'year': this.year }
        const config = { headers: { 'auth-token': store.token } }
  
        axios.post('/student/absences', body, config)
          .then(response => this.datax = response.data.success)
          .catch(error => console.error(error))
      },
  
      methods: {
        onChange() {
          const store = useStore()
          const body = { 'year': this.year }
          const config = { headers: { 'auth-token': store.token } }
  
          axios.post('/student/absences', body, config)
            .then(response => this.datax = response.data.success)
            .catch(error => console.error(error))
        }
      }
  
    }
  </script>