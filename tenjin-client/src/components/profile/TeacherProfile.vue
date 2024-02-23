<template>
    <div class="profile_card">
        <div class="name">
            <br>
            <h2>
                {{ store.user.name }}
                {{ store.user.surname }}
            </h2>
        </div>
        <div class="email">
            <br>
            Email: {{ store.user.email }}
        </div>
        <div class="phone">
            Phone: {{ store.user.phone }}
        </div>
        <span class="material-icons" id="profile_icon">work_outline</span>
        <br>
        <button class="but" id="show-modal" @click="updateInit(); showModal = true">Update Info</button>
        <br><br>
    </div>

    <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false">
        <template #body>
          <form @submit.prevent="updateInfo">
            <div class="title">Update your Information</div>

            <label>Name:</label>
            <input type="text" maxlength="50" v-model="form.name">

            <label>Surname:</label>
            <input type="text" maxlength="50" v-model="form.surname">

            <label>Email:</label>
            <input type="email" disabled v-model="form.email">

            <label>Phone:</label>
            <input type="phone" minlength="10" maxlength="10" v-model="form.phone">

            <div class="submit">
              <button type="submit" @click="showModal = false">Update</button>
            </div>
          </form>
        </template>
      </Modal>
    </Teleport>
</template>

<script setup>
    import { useStore } from '@/stores/store'
    import Modal from '@/views/Modal.vue'
    import { ref } from 'vue'

    const store = useStore()
    const showModal = ref(false)
</script>

<script>
  import { useStore } from '@/stores/store'
  import { useToast } from 'vue-toastification'
  import axios from 'axios'

  export default {

    data() {
      return {
        form: { 
            name: '', 
            surname: '', 
            email: '', 
            phone: '' 
        },
      }
    },

    created() {
        this.updateInit()
    },

    methods: {

        updateInit() {
            const store = useStore()
            store.getProfile('teacher')
            this.form.name = store.user.name
            this.form.surname = store.user.surname
            this.form.email = store.user.email  
            this.form.phone = store.user.phone
        },

        updateInfo() {
            const store = useStore()
            const config = { headers: { 'auth-token': store.token } }
            const body = { 'name': this.form.name,
                           'surname': this.form.surname,
                           'phone': this.form.phone }

            const toast = useToast()

            axios.patch('/teacher', body, config, {raw: true})
            .then((response) => {
                toast.success('Success')
                store.getProfile('teacher')
            }).catch(() => { toast.error('Unexpected error occured') })
        }

    }

  }
</script>