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
    locale: 'en',
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
      const flag = await this.checkEmail(information)
      // console.log(flag)

      if (flag) {
        try {
          let response = 'predifed response'
          if (information.role === 'school') {
            response = await axios.post(`/${information.role}`, information.school_data)
          } else {
            response = await axios.post(`/${information.role}`, information.other_data)  
          }
          return response.status
        } catch (error) {
          return error.response.status
        }
      } else {
        return 999
      }
    },

    async checkEmail(info) {
      console.log('Contacting sch.gr...')
      switch (info.role) {
        case 'school':
          const body = { 'education_level': 'ΔΕΥΤΕΡΟΒΑΘΜΙΑ',
                         'state': 'ΕΝΕΡΓΗ',
                         'email': info.school_data.email }

          const res = await axios.get('https://mm.sch.gr/api/units', { params: { education_level: 'ΔΕΥΤΕΡΟΒΑΘΜΙΑ',
                                                                                 state: 'ΕΝΕΡΓΗ',
                                                                                 email: info.school_data.email } })
            .then((response) => {
              // console.log(response.data.total)
              if (response.data.total === 0) {
                return false
              }
              return true
            }).catch((e) => { console.log(e) })
            return res
        case 'teacher':
          return true
        case 'student':
          return true
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
          .then(response => {this.user.classroom = response.data.success.name;
                             this.user.schoolId = response.data.success.school.id;
                             this.user.schoolName = response.data.success.school.name;
                             this.user.schoolAddress = response.data.success.school.address;
                             this.user.schoolPhone = response.data.success.school.phone;})
          .catch(error => { this.user.classroom = '';
                            this.user.schoolId = ''; })
        
        
      } catch (error) {
        console.log(error)
      }
    }
  }

})
