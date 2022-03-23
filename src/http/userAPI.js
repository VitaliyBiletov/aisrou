//userAPI
import {$host, $authHost} from "./index";
import jwt_decode from "jwt-decode";

export async function login(email, password) {
  try {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data)
    return jwt_decode(data)
  }catch (e) {
    console.log("userAPI (login) - ",e.response.data)
  }
}

export async function getListUsers(){
  try {
    const {data} = await $authHost.get(`api/user/list`, {})
    return data
  } catch (e) {
    console.log("userAPI (getListUsers) - ",e.response.data)
  }
}

export async function check() {
  try {
    const {data} = await $authHost.post('api/user/auth')
    localStorage.setItem('token', data)
    return jwt_decode(data)
  } catch (e) {
    console.log("userAPI (check) - ",e.response.data)
  }
}