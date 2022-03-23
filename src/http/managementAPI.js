import {$authHost} from './index'

//userAPI and studentAPI
export async function registration(type, data) {
  try {
    const {data} = await $authHost.post(`api/${type}/registration`, data)
    return data
  } catch (e) {
    console.log("managementAPI (registration) - ",e.response.data)
  }
}

//userAPI and studentAPI
export async function getAll(type) {
  try {
    const {data} = await $authHost.get(`api/${type}/all`)
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
    return await $authHost.post(`api/${type}/edit/${id}`, data)
  }catch (e) {
    console.log("managementAPI (edit) - ", e.response.data)
  }

}

//userAPI
export async function setUserPassword(id, data) {
  try {
    return await $authHost.post(`api/user/password-set/${id}`, data)
  } catch (e) {
    console.log("managementAPI (setUserPassword) - ", e.response.data)
  }
}

//userAPI and studentAPI
export async function remove(type, id) {
  try {
    return await $authHost.delete(`api/${type}/remove/${id}`)
  } catch (e) {
    console.log("managementAPI (remove) - ", e.response.data)
  }
}







