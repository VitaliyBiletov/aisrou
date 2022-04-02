import {$authHost} from "./index";


export async function getDiagnostics(studentId) {
  const {data} = await $authHost.get(`api/diagnostic/get?studentId=${studentId}`)
  return data
}

export async function createDiagnostic(userId, studentId, date, typeId, classNumber) {
  const res = await $authHost.post(`api/diagnostic/create`, {userId, studentId, typeId, date, classNumber})
  return res
}

export async function saveDiagnostic(data) {
  const res = await $authHost.post(`api/diagnostic/save`, {data})
  return res
}

export async function getTypes() {
  const res = await $authHost.get(`api/diagnostic/types`)
  return res
}

export async function removeDiagnostic(diagId) {
  const res = await $authHost.delete(`api/diagnostic/remove/${diagId}`)
  return res
}

export async function getDiagnostic(diagId) {
    const res = await $authHost.get(`api/diagnostic/${diagId}`)
    return res
}