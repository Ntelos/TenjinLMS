<template>
    <div class="profile_card">
        <div class="name">
            <br>
            <h2>
                {{ store.user.name }}
            </h2>
        </div>
        <div class="email">
            <br>
            Email: {{ store.user.email }}
        </div>
        <div class="phone">
          {{ $t("profile.Phone") }}: {{ store.user.phone }}
        </div>
        <div class="address">
            <br>
            {{ store.user.address }},
            {{ store.user.town }},
            {{ store.user.district }}
        </div>
        <span class="material-icons" id="profile_icon">domain</span>
        <br>
        <button class="but" id="show-modal" @click="updateInit(); showModal = true">{{ $t("profile.Update Info") }}</button>
        <br><br>
    </div>

    <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false">
        <template #body>
          <form @submit.prevent="updateInfo">
            <div class="title">{{ $t("profile.Update Information") }}</div>

            <label>{{ $t("profile.Name") }}:</label>
            <input type="text" maxlength="50" v-model="form.name">

            <label>Email:</label>
            <input type="email" disabled v-model="form.email">

            <label>{{ $t("profile.Phone") }}:</label>
            <input type="phone" minlength="10" maxlength="10" v-model="form.phone">

            <label>{{ $t("profile.Address") }}:</label>
            <input type="text" maxlength="50" v-model="form.address">

            <div class="submit">
              <button type="submit" @click="showModal = false">{{ $t("profile.Update") }}</button>
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
            email: '', 
            phone: '',
            address: ''
        },
      }
    },

    created() {
        this.updateInit()
    },

    methods: {

        updateInit() {
            const store = useStore()
            store.getProfile('school')
            this.form.name = store.user.name
            this.form.address = store.user.address
            this.form.email = store.user.email  
            this.form.phone = store.user.phone
        },

        updateInfo() {
            const store = useStore()
            const config = { headers: { 'auth-token': store.token } }
            const body = { 'name': this.form.name,
                           'address': this.form.address,
                           'phone': this.form.phone }

            const toast = useToast()

            axios.patch('/school', body, config, {raw: true})
            .then((response) => {
                toast.success('Success')
                store.getProfile('school')
            }).catch(() => { toast.error('Unexpected error occured') })
        }

    }

  }
</script>