import {$authHost} from "./index";


export async function attachStudent(userId, studentId) {
  const {data} = await $authHost.post('api/group/attach', {userId, studentId})
  return data
}

export async function unAttachStudent(groupId) {
  const {data} = await $authHost.post('api/group/unAttach', {groupId})
  return data
}

export async function getGroups(userId) {
  const {data} = await $authHost.get(`api/group/getGroups?userId=${userId}`)
  console.log(data)
  return data
}