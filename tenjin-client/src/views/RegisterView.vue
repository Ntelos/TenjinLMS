<template>

  <main id="RegisterView">

    <form @submit.prevent="handleSubmit">

        <div class="title">Register</div>

        <label>Register as a:</label>
        <select v-model="form.role">
            <option value="school">School</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
        </select>

        <div v-if="form.role === 'school'">
            <label>Name:</label>
            <input type="text" minlength="3" maxlength="100" required v-model="form.school_data.name">

            <label>District:</label>
            <select v-model="form.school_data.district">
                <option value="Νομός Αθηνών">Νομός Αθηνών</option>
                <option value="Νομός Αιτωλοακαρνανίας">Νομός Αιτωλοακαρνανίας</option>
                <option value="Νομός Ανατολικής Αττικής">Νομός Ανατολικής Αττικής</option>
                <option value="Νομός Αργολίδας">Νομός Αργολίδας</option>
                <option value="Νομός Αρκαδίας">Νομός Αρκαδίας</option>
                <option value="Νομός Άρτας">Νομός Άρτας</option>
                <option value="Νομός Αχαΐας">Νομός Αχαΐας</option>
                <option value="Νομός Βοιωτίας">Νομός Βοιωτίας</option>
                <option value="Νομός Γρεβενών">Νομός Γρεβενών</option>
                <option value="Νομός Δράμας">Νομός Δράμας</option>
                <option value="Νομός Δυτικής Αττικής">Νομός Δυτικής Αττικής</option>
                <option value="Νομός Δωδεκανήσου">Νομός Δωδεκανήσου</option>
                <option value="Νομός Έβρου">Νομός Έβρου</option>
                <option value="Νομός Ευβοίας">Νομός Ευβοίας</option>
                <option value="Νομός Ευρυτανίας">Νομός Ευρυτανίας</option>
                <option value="Νομός Ζακύνθου">Νομός Ζακύνθου</option>
                <option value="Νομός Ηλείας">Νομός Ηλείας</option>
                <option value="Νομός Ημαθίας">Νομός Ημαθίας</option>
                <option value="Νομός Ηρακλείου">Νομός Ηρακλείου</option>
                <option value="Νομός Θεσπρωτίας">Νομός Θεσπρωτίας</option>
                <option value="Νομός Θεσσαλονίκης">Νομός Θεσσαλονίκης</option>
                <option value="Νομός Ιωαννίνων">Νομός Ιωαννίνων</option>
                <option value="Νομός Καβάλας">Νομός Καβάλας</option>
                <option value="Νομός Καρδίτσας">Νομός Καρδίτσας</option>
                <option value="Νομός Καστοριάς">Νομός Καστοριάς</option>
                <option value="Νομός Κέρκυρας">Νομός Κέρκυρας</option>
                <option value="Νομός Κεφαλληνίας">Νομός Κεφαλληνίας</option>
                <option value="Νομός Κιλκίς">Νομός Κιλκίς</option>
                <option value="Νομός Κοζάνης">Νομός Κοζάνης</option>
                <option value="Νομός Κορινθίας">Νομός Κορινθίας</option>
                <option value="Νομός Κυκλάδων">Νομός Κυκλάδων</option>
                <option value="Νομός Λακωνίας">Νομός Λακωνίας</option>
                <option value="Νομός Λάρισας">Νομός Λάρισας</option>
                <option value="Νομός Λασιθίου">Νομός Λασιθίου</option>
                <option value="Νομός Λέσβου">Νομός Λέσβου</option>
                <option value="Νομός Λευκάδας">Νομός Λευκάδας</option>
                <option value="Νομός Μαγνησίας">Νομός Μαγνησίας</option>
                <option value="Νομός Μεσσηνίας">Νομός Μεσσηνίας</option>
                <option value="Νομός Ξάνθης">Νομός Ξάνθης</option>
                <option value="Νομός Πειραιά">Νομός Πειραιά</option>
                <option value="Νομός Πέλλας">Νομός Πέλλας</option>
                <option value="Νομός Πιερίας">Νομός Πιερίας</option>
                <option value="Νομός Πρέβεζας">Νομός Πρέβεζας</option>
                <option value="Νομός Ρεθύμνης">Νομός Ρεθύμνης</option>
                <option value="Νομός Ροδόπης">Νομός Ροδόπης</option>
                <option value="Νομός Σάμου">Νομός Σάμου</option>
                <option value="Νομός Σερρών">Νομός Σερρών</option>
                <option value="Νομός Τρικάλων">Νομός Τρικάλων</option>
                <option value="Νομός Φθιώτιδας">Νομός Φθιώτιδας</option>
                <option value="Νομός Φλώρινας">Νομός Φλώρινας</option>
                <option value="Νομός Φωκίδας">Νομός Φωκίδας</option>
                <option value="Νομός Χαλκιδικής">Νομός Χαλκιδικής</option>
                <option value="Νομός Χανίων">Νομός Χανίων</option>
                <option value="Νομός Χίου">Νομός Χίου</option>
            </select>

            <label>Town:</label>
            <input type="text" minlength="3" maxlength="50" required v-model="form.school_data.town">

            <label>Address:</label>
            <input type="text" minlength="3" maxlength="100" required v-model="form.school_data.address">

            <label>Email:</label>
            <input type="email" minlength="6" maxlength="50" required v-model="form.school_data.email">

            <label>Password:</label>
            <input type="password" minlength="6" maxlength="30" required v-model="form.school_data.password">

            <label>Phone:</label>
            <input type="tel" minlength="10" maxlength="10" required v-model="form.school_data.phone">
        </div>


        <div v-else>
            <label>Name:</label>
            <input type="text" minlength="3" maxlength="50" required v-model="form.other_data.name">

            <label>Surname:</label>
            <input type="text" minlength="3" maxlength="50" required v-model="form.other_data.surname">

            <label>Email:</label>
            <input type="email" minlength="6" maxlength="50" required v-model="form.other_data.email">

            <label>Password:</label>
            <input type="password" minlength="6" maxlength="30" required v-model="form.other_data.password">

            <label>Phone:</label>
            <input type="tel" minlength="10" maxlength="10" required v-model="form.other_data.phone">
        </div>

        <div class="submit" >
            <button :disabled="isButtonDisabled" type="submit">Register</button>
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
    const toast = useToast()
    return { store, toast }
  },

  data() {
      return {
          form: {
            role: 'school',
            school_data: {
                name: '',
                district: 'Νομός Αθηνών',
                town: '',
                address: '',
                email: '',
                password: '',
                phone: ''
            },
            other_data: {
                name: '',
                surname: '',
                email: '',
                password: '',
                phone: ''
            },
          },
          isButtonDisabled: false
      }
  },

  methods: {
    async handleSubmit() {
      this.isButtonDisabled = true
      this.toast.warning('Contacting Πανελλήνιο Σχολικό Δίκτυο, might take some time')
      const status = await this.store.register(this.form)

      switch (status) {
        case 201:
          this.toast.success('Register action was successful!')
          this.isButtonDisabled = false
          this.$router.replace({ name: 'login' })
          break
        case 400:
          this.toast.error('Password must be stronger')
          this.isButtonDisabled = false
          break
        case 409:
          this.toast.error('Name or Email already in use')
          this.isButtonDisabled = false
          break
        case 999:
          this.toast.error(`Email not in Greek School's Network`)
          this.isButtonDisabled = false
          break
        default:
          this.toast.error('Register action was not successful')
          this.isButtonDisabled = false
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/form.scss";
</style>