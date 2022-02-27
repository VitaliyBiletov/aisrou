import {$authHost} from "./index";


export async function getDiagnostics(studentId) {
  const {data} = await $authHost.get(`api/diagnostic/get?studentId=${studentId}`)
  return data
}

export async function createDiagnostic(studentId) {
  const res = await $authHost.post(`api/diagnostic/create`, {studentId})
  return res
}

export async function removeDiagnostic(diagId) {
  const res = await $authHost.post(`api/diagnostic/remove`, {diagId})
  return res
}