import axios from 'axios'
// import firebase from '../firebase/Firebase'

export interface APIresponce {
  status: number,
  message: Error
}

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

export const userUpdate = async (token: string, uid: string, column: string, src: string | null) => {
  const resp = await clientAxios.put(
    "/user",
    { u: uid, c: column, s: src },
    { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
  )
  if (resp.status !== 204) {
    console.error(resp.data.error)
  }
  return { status: resp.status, message: resp.data.error }
}
