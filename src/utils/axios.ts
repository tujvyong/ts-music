import axios from 'axios'
// import firebase from '../firebase/Firebase'

export const clientAxios = axios.create({
  baseURL: "http://localhost/",
  headers: {
    "Content-Type": "application/json"
  }
})

clientAxios.interceptors.response.use(
  response => response,
  error => error.response || error
)
