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
        <td class="subject_button"><span v-on:click="clickSubject(d)" @click="showModalInfo = true">{{ d.subject.name }}</span></td>
        <td>{{ d.subject.weeklyHours }}</td>
        <td>{{ d.teacher.name }} {{ d.teacher.surname }}</td>
      </tr>
    </table>

    <Teleport to="body">
      <ModalInfo :show="showModalInfo" @close="showModalInfo = false">
        <template #body>
          <h2>{{ clicked_subject.name }}</h2>
          <br>
          <label>{{ clicked_subject.description }}</label>
        </template>
      </ModalInfo>
    </Teleport>

  </main>
</template>

<script setup>
  import ModalInfo from '@/views/ModalInfo.vue'
  import { ref } from 'vue'
  const showModalInfo = ref(false)
</script>

<script>
  import { useStore } from '@/stores/store'
  import axios from 'axios'

  export default {

    data() {
      return {
        year: '2023-24',
        datax: { yearLevel: null, Teaching: null },
        clicked_subject: { name: '', description: '' }
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
      },

      clickSubject(d) {
        this.clicked_subject.name = d.subject.name
        this.clicked_subject.description = d.subject.description
      }
    }

  }
</script>