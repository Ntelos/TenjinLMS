<template>

  <main id="LoginView">

    <form @submit.prevent="handleSubmit">

      <div class="title">{{ $t("home.Login") }}</div>

      <label>Email:</label>
      <input type="email" minlength="6" maxlength="50" required v-model="form.email">

      <label>{{ $t("home.Password") }}:</label>
      <input type="password" minlength="6" maxlength="30" required v-model="form.password">

      <div class="submit" >
          <button type="submit">{{ $t("home.Login") }}</button>
      </div>

      <div class="goto">
        <span @click="gotoRegister">{{ $t("home.Register") }}</span>
      </div>

    </form>

  </main>
  
</template>


<script>
  import { useToast } from "vue-toastification"
  import { useStore } from '@/stores/store'

  export default {
    name: 'LoginView',

    setup() {
      const store = useStore()
      const toast = useToast();
      return { store, toast }
    },

    data() {
        return {
            form: {
              email: '',
              password: ''
            },
        }
    },

    methods: {
      async handleSubmit() {
        const success_flag = await this.store.login(this.form)
        
        if (success_flag) {
          this.toast.success('Login was successful!')
          this.$router.replace({ name: 'profile' })
        } else {
          this.toast.error('Login was not successful!')
        }
      },

      gotoRegister() {
        this.$router.replace({ 
            name: 'register' 
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/styles/form.scss";
</style>