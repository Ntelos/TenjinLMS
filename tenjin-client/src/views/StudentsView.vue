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

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Year Level</th>
        </tr>
      </thead>
      <tr v-for="student in students">
        <td>{{ student.student.surname }} {{ student.student.name }}</td>
        <td>{{ student.student.email }}</td>
        <td>{{ student.student.phone }}</td>
        <td>{{ student.yearLevel }}</td>
      </tr>
    </table>

  </main>
</template>

<script setup>
  import Modal from '@/views/Modal.vue'
  import { ref } from 'vue'

  const showModal = ref(false)
</script>

<script>
  import { useStore } from '@/stores/store'
  import axios from 'axios'
  import { useToast } from "vue-toastification"

  export default {

    data() {
      return {
        year: '2023-24',
        students: null,
        form: { email: '', yearLevel: 'A' },
      }
    },

    created() {
      this.getStudents()
    },

    methods: {
      getStudents() {
        const store = useStore()
        const body = { 'year': this.year }
        const config = { headers: { 'auth-token': store.token } }

        axios.post('/school/students', body, config)
          .then(response => this.students = response.data.success.students)
          .catch(error => console.error(error))
      },

      handleSubmit() {
        const store = useStore()
        const body = { 'email': this.form.email,
                       'year': this.year,
                       'yearLevel': this.form.yearLevel }
        const config = { headers: { 'auth-token': store.token } }

        const toast = useToast()

        axios
          .post('/school/student', body, config, {raw: true})
          .then((response) => {
            const res = response.data
            toast.success('Enrolled Student')
            this.getStudents()
          }).catch(() => {
            toast.error('Student with this email does not exist')
          })
      }
    },

  }
</script>