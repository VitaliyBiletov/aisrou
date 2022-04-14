import {$authHost} from "./index";


export async function getDiagnostics(studentId) {
  const {data} = await $authHost.get(`api/diagnostics/get?studentId=${studentId}`)
  return data
}

export async function createDiagnostic(userId, studentId, date, typeId, classNumber) {
  const res = await $authHost.post(`api/diagnostics/create`, {userId, studentId, typeId, date, classNumber})
  return res
}

export async function tasksLoading(id) {
  const {data} = await $authHost.get(`api/diagnostics/tasks/${id}`)
  return data
}

export async function saveDiagnostic(data) {
  const res = await $authHost.post(`api/diagnostics/save`, {data})
  return res
}

export async function getTypes() {
  const res = await $authHost.get(`api/diagnostics/types`)
  return res
}

export async function removeDiagnostic(diagId) {
  const res = await $authHost.delete(`api/diagnostics/remove/${diagId}`)
  return res
}

export async function getDiagnostic(diagId) {
    const res = await $authHost.get(`api/diagnostics/${diagId}`)
    return res
}