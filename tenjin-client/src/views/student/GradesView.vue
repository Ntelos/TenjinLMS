<template>
  <main id="GradesView">
    <h1>{{ $t("menu.grades") }}</h1>

    <br>
    <label>{{ $t("texts.Period") }}: </label>
    <select v-model="year" @change="onChange()">
        <option value="2022-23">2022-23</option>
        <option value="2023-24">2023-24</option>
    </select>
    <br><br>
    
    <!-- <table class="table table-bordered">
			<thead>
				<tr>
					<th>{{ $t("texts.Grade") }}</th>
          <th>{{ $t("texts.Year Level") }}</th>
					<th>{{ $t("texts.Subject") }}</th>
					<th>{{ $t("texts.Teacher") }}</th>
				</tr>
			</thead>
			<tr v-for="d in datax">
				<td>{{ d.grade }}</td>
        <td>{{ d.teaching.subject.yearLevel }}</td>
        <td>{{ d.teaching.subject.name }}</td>
        <td>{{ d.teaching.teacher.surname }} {{ d.teaching.teacher.name }}</td>
			</tr>
		</table> -->

    <div class="card grade" v-for="d in datax">
      <div class="card-child">
        <p><b>{{ d.teaching.subject.name }}</b></p>
        <p>{{ $t("texts.Year Level") }}: {{ d.teaching.subject.yearLevel }}</p>
        <p>{{ d.teaching.teacher.surname }} {{ d.teaching.teacher.name }}</p>
      </div>
      <div class="card-child" id="grade">
        <p>{{ $t("texts.Grade") }}: {{ d.grade }}</p>
      </div>
    </div>

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