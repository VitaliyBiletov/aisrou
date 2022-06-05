import {$authHost} from './index'

//userAPI and studentAPI
export async function registration(type, data) {
    const res = await $authHost.put(`api/${type}/`, data)
    return res.data
}

//userAPI and studentAPI
export async function getAll(type) {
  try {
    const {data} = await $authHost.get(`api/${type}/`)
    return data
  } catch (e) {
    console.log("managementAPI (getAll) - ", e.response.data)
  }
}

//userAPI and studentAPI
export async function get(type, id) {
  try {
    const {data} = await $authHost.get(`api/${type}/${id}`)
    return data
  } catch (e) {
    console.log("managementAPI (get) - ", e.response.data)
  }
}

//userAPI and studentAPI
export async function edit(type, id, data) {
  try {
    return await $authHost.put(`api/${type}/${id}`, data)
  }catch (e) {
    console.log("managementAPI (edit) - ", e.response.data)
  }

}

//userAPI
export async function setUserPassword(data) {
  try {
    return await $authHost.post(`api/users/password/`, data)
  } catch (e) {
    console.log("managementAPI (setUserPassword) - ", e.response.data)
  }
}

//userAPI and studentAPI
export async function remove(type, id) {
  try {
    return await $authHost.delete(`api/${type}/${id}`)
  } catch (e) {
    console.log("managementAPI (remove) - ", e.response.data)
  }
}







