import axios from 'axios'
import { ChipData } from './types'

export interface APIresponce {
  status: number
  error?: string
  message?: string
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
    return { status: resp.status, error: resp.data.error }
  }
  return { status: resp.status }
}

export const userUpdateGenru = async (token: string, tags: ChipData[]) => {
  const resp = await clientAxios.post(
    "/genru",
    tags,
    { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
  )
  if (resp.status !== 204) {
    console.error(resp.data.error)
    return { status: resp.status, error: resp.data.error }
  }
  return { status: resp.status }
}
