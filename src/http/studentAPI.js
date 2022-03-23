import {$authHost} from "./index";

export async function getListStudents(){
  try {
    const {data} = await $authHost.get(`api/student/list`)
    return data
  }catch (e) {
    console.log("studentAPI (getListStudents) - ",e.response.data)
  }
}