import {$authHost} from "./index";

export async function getStudents(type){
  const {data} = await $authHost.get(`api/student/all${type ? '?type='+type : '' }`)
  return data
}

export async function getListStudents(){
  const {data} = await $authHost.get(`api/student/list`)
  return data
}