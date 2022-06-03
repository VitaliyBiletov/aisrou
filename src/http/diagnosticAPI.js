import {$authHost} from "./index";


export async function getDiagnostics(studentId) {
  const {data} = await $authHost.get(`api/diagnostics/get?studentId=${studentId}`)
  return data
}

export async function getDiagnosticsList(studentId) {
  const {data} = await $authHost.get(`api/diagnostics/list?studentId=${studentId}`)
  return data
}

export async function createDiagnostic(userId, studentId, date, typeId, classNumber, tasks) {
  const res = await $authHost.post(`api/diagnostics/create`, {userId, studentId, typeId, date, classNumber, tasks})
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

export async function getDiagnostic(diagId) {
    const res = await $authHost.get(`api/diagnostics/${diagId}`)
    return res
}

export async function compare(diagId1, diagId2) {
  const res = await $authHost.get(`api/diagnostics/compare?id1=${diagId1}&id2=${diagId2}`)
  return res
}

export async function getResults(year, classNumber) {
  const res = await $authHost.post(`api/diagnostics/results`, {year, classNumber})
  return res
}