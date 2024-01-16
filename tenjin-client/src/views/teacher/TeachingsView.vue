<template>
  <main id="TeachingsView">
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
          <th>Year Level</th>
          <th>Hours/Week</th>
        </tr>
      </thead>
      <tr v-for="teaching in teachings" v-on:click="selectedTeaching(teaching)">
        <td>{{ teaching.school.name }}</td>
        <td>{{ teaching.classroom.name }}</td>
        <td>{{ teaching.subject.name }}</td>
        <td>{{ teaching.subject.yearLevel }}</td>
        <td>{{ teaching.subject.weeklyHours }}</td>
      </tr>
    </table>

    <h2>Tasks of Teaching {{ this.clickedTeaching.subject.name }} {{ this.clickedTeaching.classroom.name }}</h2>
    <br>
    <div v-if="clickedTeaching.subject.name === null">
      <p>Select a Teaching</p>
      <br>
    </div>
    <div v-else>
      <button class="but" id="show-modal" @click="showModal = true">Add new Task</button>
      <br><br>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Task</th>
            <th>Points</th>
            <th>Active</th>
            <th>Date</th>
          </tr>
        </thead>
        <tr v-for="task in tasks">
          <td>{{ task.comment }}</td>
          <td>{{ task.points }}</td>
          <td>{{ task.active }}</td>
          <td>{{ task.date }}</td>
        </tr>
      </table>
      <br>
    </div>

    <Teleport to="body">
      <modal :show="showModal" @close="showModal = false">
        <template #body>
          <form @submit.prevent="handleSubmit">
            <div class="title">Add a new Task</div>

            <label>Task:</label>
            <input type="text" maxlength="300" required v-model="form.task">

            <label>Points:</label>
            <input type="number" maxlength="4" required v-model="form.points">

            <div class="submit" @click="showModal = false">
              <button type="submit">Add</button>
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
        tasks: null,
        form: { task: '', points: '' },
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
        this.tasks = null
        
        axios.post('/teacher/subjects', body, config)
          .then(response => this.teachings = response.data.success.teachings)
          .catch(error => console.error(error))
      },

      selectedTeaching(teaching) {
        this.tasks = null
        this.clickedTeaching = teaching
        this.getTasksOfTeachings(teaching)
      },

      getTasksOfTeachings(teaching) {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'year': this.selectedYear,
                       'schoolEmail': teaching.school.email,
                       'subjectName': teaching.subject.name,
                       'classroomName': teaching.classroom.name }
        
        axios.post('/teacher/subject/tasks', body, config)
          .then(response => this.tasks = response.data.success.Task)
          .catch(error => console.error(error))
      },

      handleSubmit() {
        const store = useStore()
        const config = { headers: { 'auth-token': store.token } }
        const body = { 'comment': this.form.task,
                       'points': this.form.points,
                       'schoolEmail': this.clickedTeaching.school.email,
                       'year': this.selectedYear,
                       'subjectName': this.clickedTeaching.subject.name,
                       'classroomName': this.clickedTeaching.classroom.name }

        const toast = useToast()

        axios.post('/teacher/subject/task', body, config, {raw: true})
          .then((response) => {
            toast.success('Added Task')
            this.getTasksOfTeachings(this.clickedTeaching)
          }).catch(() => { toast.error('Task was not added due to an error') })

        this.form.task = ''
        this.form.point = ''
      },
    }

  }
</script>