import {$authHost} from "./index";


export async function attachStudent(userId, studentId) {
  const {data} = await $authHost.put('api/groups/', {userId, studentId})
  return data
}

export async function remove(groupId) {
  const {data} = await $authHost.delete(`api/groups/${groupId}`)
  return data
}

export async function getListGroups(id){
  const {data} = await $authHost.post('api/groups/list', {id})
  return data
}

export async function getGroups(userId) {
  const {data} = await $authHost.get(`api/groups/${userId}`)
  return data
}