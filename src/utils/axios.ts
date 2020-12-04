import axios from 'axios'
import firebase from "../firebase/Firebase";
import { ChipData, PortfolioState } from './types'

export interface APIresponce {
  status: number
  error?: string
  data?: any
  message?: string
}

interface RequestUser {
  username?: string
  bio?: string
  place?: string
  photoURL?: string
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

const APIauthrization: () => Promise<string | null> = async () => {
  let user = firebase.auth().currentUser

  if (user) {
    const idToken = await user.getIdToken(true).catch((err) => {
      console.error(err)
      return null
    })
    return idToken
  } else {
    return null
  }
}

export const userUpdate = async (req: RequestUser) => {
  let token = await APIauthrization()
  if (!token) return { status: 401, message: "You must logged in" }

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

export const userUpdateTags = async (tags: ChipData[], itemName: "genrus" | "instruments") => {
  let token = await APIauthrization()
  if (!token) return { status: 401, message: "You must logged in" }

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

export const tagsSearch = async (keyword: string, itemName: "genrus" | "instruments") => {
  let token = await APIauthrization()
  if (!token) return { status: 401, message: "You must logged in" }

  let url = ''
  if (itemName === "genrus") {
    url = "/genrus/search"
  } else if (itemName === "instruments") {
    url = "/instruments/search"
  }
  const resp = await clientAxios.post(
    url,
    { keyword: keyword },
    { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
  )
  if (resp.status !== 200) {
    return { status: resp.status, error: resp.data.error }
  }
  return { status: resp.status, data: resp.data }
}

export const userUpdatePortfolios = async (portfolio: PortfolioState) => {
  let token = await APIauthrization()
  if (!token) return { status: 401, message: "You must logged in" }

  const resp = await clientAxios.post("/me/portfolios",
    portfolio,
    { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
  )
  if (resp.status !== 204) {
    return { status: resp.status, error: resp.data.error }
  }
  return { status: resp.status }
}

export const userGetPortfolios = async (userID: string) => {
  let token = await APIauthrization()
  if (!token) return { status: 401, message: "You must logged in" }

  const resp = await clientAxios.get(
    `/users/${userID}/portfolios`,
    { headers: { 'Authorization': 'Bearer ' + token }, withCredentials: true }
  )
  if (resp.status !== 200) {
    console.error(resp.data.error)
    return { status: resp.status, error: resp.data.error }
  }
  return { status: resp.status, data: resp.data }
}
