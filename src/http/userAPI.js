//userAPI
import {$host, $authHost} from "./index";
import jwt_decode from "jwt-decode";

export async function login(email, password) {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data)
  return jwt_decode(data)
}

export async function getUsers(){
  const {data} = await $authHost.get(`api/user/all`)
  return data
}

export async function getListUsers(){
  const {data} = await $authHost.get(`api/user/list`, {})
  return data
}

export async function check() {
  try {
    const {data} = await $authHost.post('api/user/auth')
    localStorage.setItem('token', data)
    return jwt_decode(data)
  } catch (e) {
    console.log(e.response.data)
  }
}