import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export async function login (email, password) {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data)
  return jwt_decode(data)
}

export async function check () {
  try{
    const {data} = await $authHost.post('api/user/auth')
    localStorage.setItem('token', data)
    return jwt_decode(data)
  }catch (e) {
    console.log(e.response.data)
  }
}

export async function registration(user) {
  try{
    const {data} = await $authHost.post(`api/user/registration`, user)
    return data
  }catch (e) {
    console.log(e.response.data)
  }
}

export async function getUser(id) {
  const {data} = await $authHost.get(`api/user/${id}`)
  return data
}

export async function getAll () {
  try{
    const {data} = await $authHost.get('api/user/all')
    return data
  }catch (e) {
    console.log(e.response.data)
  }
}

export async function editUser(id, data) {
    const result = await $authHost.post(`api/user/edit/${id}`, data)
    return result
}