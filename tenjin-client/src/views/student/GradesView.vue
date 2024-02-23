<template>
  <main id="GradesView">
    <h1>Grades</h1>

    <br>
    <label>Period: </label>
    <select v-model="year" @change="onChange()">
        <option value="2022-23">2022-23</option>
        <option value="2023-24">2023-24</option>
    </select>
    <br><br>
    
    <table class="table table-bordered">
			<thead>
				<tr>
					<th>Grade</th>
          <th>Year Level</th>
					<th>Subject</th>
					<th>Teacher</th>
				</tr>
			</thead>
			<tr v-for="d in datax">
				<td>{{ d.grade }}</td>
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
        datax: null
      }
    },

    created() {
      const store = useStore()
      const body = { 'year': this.year }
      const config = { headers: { 'auth-token': store.token } }

      axios.post('/student/grades', body, config)
        .then(response => this.datax = response.data.success)
        .catch(error => console.error(error))
    },

    methods: {
      onChange() {
        const store = useStore()
        const body = { 'year': this.year }
        const config = { headers: { 'auth-token': store.token } }

        axios.post('/student/grades', body, config)
          .then(response => this.datax = response.data.success)
          .catch(error => console.error(error))
      }
    }

  }
</script>