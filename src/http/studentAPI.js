import {$authHost} from "./index";

export async function getStudents(){
  const {data} = await $authHost.get('api/student/all')
  return data
}