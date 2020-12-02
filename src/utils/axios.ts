import axios from 'axios'
import { ChipData } from './types'

export interface APIresponce {
  status: number
  error?: string
  message?: string
}

interface RequestUser {
  username?: string
  bio?: string
  place?: string
  photoURL?: string | null
  bgURL?: string
  profile?: string
  skill?: string
  genrus?: ChipData[]
  instruments?: ChipData[]
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

export const userUpdate = async (token: string, req: RequestUser) => {
  const resp = await clientAxios.put(
    "/user",
    req,
    { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
  )
  if (resp.status !== 204) {
    console.error(resp.data.error)
    return { status: resp.status, error: resp.data.error }
  }
  return { status: resp.status }
}

export const userUpdateTags = async (token: string, tags: ChipData[], itemName: "genrus" | "instruments") => {
  let url = ''
  if (itemName === "genrus") {
    url = "/genrus"
  } else if (itemName === "instruments") {
    url = "/instruments"
  }
  const resp = await clientAxios.post(
    url,
    tags,
    { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
  )
  if (resp.status !== 204) {
    console.error(resp.data.error)
    return { status: resp.status, error: resp.data.error }
  }
  return { status: resp.status }
}
