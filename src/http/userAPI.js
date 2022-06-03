//userAPI
import {$host, $authHost} from "./index";
import jwt_decode from "jwt-decode";

export async function login(email, password) {
  const {data} = await $host.post('api/users/login', {email, password})
  localStorage.setItem('token', data)
  return jwt_decode(data)
}

export async function getListUsers(){
  try {
    const {data} = await $authHost.get(`api/users/list`, {})
    return data
  } catch (e) {
    console.log("userAPI (getListUsers) - ",e.response.data)
  }
}

export async function check() {
  try {
    const {data} = await $authHost.post('api/users/auth')
    localStorage.setItem('token', data)
    return jwt_decode(data)
  } catch (e) {
    console.log("userAPI (check) - ",e.response.data)
  }
}