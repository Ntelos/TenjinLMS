<template>
  <main id="TasksView">
    <h1>{{ $t("menu.tasks") }}</h1>

    <br>
    <label>{{ $t("texts.Period") }}: {{ year }}</label>
    <br><br>

    <label>{{ $t("texts.Subject") }}: </label>
    <select v-model="subject" @change="onChange()">
      <option v-for="s in subjects.Teaching" :value="s">{{s.subject.name}}</option>
    </select>
    <br><br>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>{{ $t("texts.Description") }}</th>
          <th>{{ $t("texts.Points") }}</th>
          <th>{{ $t("texts.Active") }}</th>
          <th>{{ $t("texts.Date") }}</th>
        </tr>
      </thead>
      <tr v-for="d in datax">
        <td>{{ d.comment }}</td>
        <td>{{ d.points }}</td>
        <td>{{ d.active }}</td>
        <td>{{ d.date }}</td>
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
        subject: null,
        subjects: { Teaching: null },
        datax: null
      }
    },

    created() {
      const store = useStore()
      const body = { 'year': this.year }
      const config = { headers: { 'auth-token': store.token } }
      
      axios.post('/student/subjects', body, config)
        .then(response => this.subjects = response.data.success)
        .catch(error => console.error(error))
    },

    methods: {
      onChange() {
        const store = useStore()
        const body = { 'year': this.year,
                       'subject': this.subject.subject.name }
        const config = { headers: { 'auth-token': store.token } }

        axios.post('/student/subject/tasks', body, config)
          .then(response => this.datax = response.data.success)
          .catch(error => console.error(error))
      }
    }

  }
</script>