import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

//userAPI
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

export async function setUserPassword(id, data) {
  const result = await $authHost.post(`api/user/password-set/${id}`, data)
  return result
}

//userAPI and studentAPI
export async function registration(type, data) {
  try{
    const res = await $authHost.post(`api/${type}/registration`, data)
    return res.data
  }catch (e) {
    console.log(e.response.data)
  }
}

export async function get(type, id) {
  const {data} = await $authHost.get(`api/${type}/${id}`)
  return data
}

export async function getAll(type) {
  try{
    const {data} = await $authHost.get(`api/${type}/all`)
    return data
  }catch (e) {
    console.log(e.response.data)
  }
}

export async function edit(type, id, data) {
  const result = await $authHost.post(`api/${type}/edit/${id}`, data)
  return result
}

export async function remove(type, id) {
  const result = await $authHost.delete(`api/${type}/remove/${id}`)
  return result
}