import { defineStore } from 'pinia'
import axios from 'axios'
import jwt from 'vue-jwt-decode'

export const useStore = defineStore('user', { 
  
  state: () => ({
    authenticated: false,
    id: '',
    role: '',
    email: '',
    token: '',
    user: Object //{name:'', surname:'', email:'', phone:'', points:'', classroomId:'', address:'', town:'', district:''}
  }),
  
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/login', credentials)
        this.token = response.data.success.token

        const decoded_token = jwt.decode(this.token)
        this.id = decoded_token.id
        this.role = decoded_token.role
        this.authenticated = true

        this.getProfile(this.role)

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },

    logout() {
      this.$reset()
    },

    async register(information) {
      try {
        let response = 'predifed response'
        if (information.role === 'school') {
          response = await axios.post(`/${information.role}`, information.school_data)
        } else {
          response = await axios.post(`/${information.role}`, information.other_data)  
        }
        console.log(response)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },

    async getProfile(role) {
      try {
        const config = {
          headers: { 'auth-token': this.token }
        }
        const response = await axios.get(`/${role}`, config)
        this.user = response.data.success
      } catch (error) {
        console.log(error)
      }
    },

    async getStudentPoints() {
      try {
        const config = {
          headers: { 'auth-token': this.token }
        }
        const response = await axios.get('/student/points', config)
        this.user.points = response.data.success.points
      } catch (error) {
        console.log(error)
      }
    },

    async getStudentClassroom() {
      try {
        const config = {
          headers: { 'auth-token': this.token }
        }
        const response = await axios.get('/student/classroom', config)
        this.user.classroom = response.data.success.classroom.name
        // console.log(this.user.classroom)
      } catch (error) {
        console.log(error)
      }
    }
  }

})
