import {$authHost} from "./index";


export async function attachStudent(userId, studentId) {
  const {data} = await $authHost.post('api/group/attach', {userId, studentId})
  return data
}

export async function remove(groupId) {
  const {data} = await $authHost.post('api/group/unAttach', {groupId})
  return data
}

export async function getGroups(userId) {
  const {data} = await $authHost.get(`api/group/${userId}`)
  return data
}