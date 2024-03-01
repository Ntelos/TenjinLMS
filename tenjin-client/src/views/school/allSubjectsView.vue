<template>
  <main id="allSubjectsView">

    <h1>Subjects</h1>
    <br>
    <label>Maintain all Subjects</label>

    <br><br>
    <button class="but" id="show-modal" @click="showModal = true">Add a Subject</button>
    <br><br>

    <Teleport to="body">
      <modal :show="showModal" @close="showModal = false">
        <template #body>
          <form @submit.prevent="addSubject">
            <div class="title">Add a Subject</div>

            <label>Name:</label>
            <input type="text" minlength="3" maxlength="35" required v-model="form.name">

            <label>Description:</label>
            <input type="text" maxlength="100" v-model="form.description">

            <label>Level:</label>
            <select v-model="form.yearLevel">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>

            <label>Weekly Hours:</label>
            <input type="number" min="1" v-model="form.weeklyHours">

            <div class="submit" @click="showModal = false">
              <button type="submit">Add</button>
            </div>
          </form>
        </template>
      </modal>
    </Teleport>
    
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Weekly Hours</th>
        </tr>
      </thead>
      <tr v-for="subject in subjects">
        <td class="subject_button"><span v-on:click="clickSubject(subject)" @click="showModalInfo = true">{{ subject.name }}</span></td>
        <td>{{ subject.yearLevel }}</td>
        <td>{{ subject.weeklyHours }}</td>
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
  import Modal from '@/views/Modal.vue'
  import ModalInfo from '@/views/ModalInfo.vue'
  import { ref } from 'vue'
  const showModal = ref(false)
  const showModalInfo = ref(false)
</script>

<script>
  import { useStore } from '@/stores/store'
  import { useToast } from "vue-toastification"
  import axios from 'axios'

  export default {
    data() {
      return {
        form: { name: '', description: '', yearLevel: 'A', weeklyHours: '' },
        subjects: null,
        clicked_subject: { name: '', description: '' }
      }
    },

    created() {
      this.getSubjects()
    },

    methods: {
      getSubjects() {
        axios.get('/subjects')
          .then(response => this.subjects = response.data.subjects)
          .catch(error => console.error(error))
      },

      addSubject() {
        const store = useStore()
        const toast = useToast()

        const config = { headers: { 'auth-token': store.token } }
        
        const body = { 'name': this.form.name,
                       'description': this.form.description,
                       'yearLevel': this.form.yearLevel,
                       'weeklyHours': this.form.weeklyHours }

        axios.post('/subject', body, config, {raw: true})
          .then((response) => {
            toast.success('Subject was added')
            this.form.name = ''
            this.form.description = ''
            this.form.yearLevel = ''
            this.form.weeklyHours = ''
            this.getSubjects()
          }).catch(() => {
            toast.error('Unexpected error occured')
          })
      },

      clickSubject(subject) {
        this.clicked_subject.name = subject.name
        this.clicked_subject.description = subject.description
      }
    },

  }
</script>