import {$authHost} from "./index";

export async function getListStudents(){
  try {
    const {data} = await $authHost.get(`api/students/list`)
    return data
  }catch (e) {
    console.log("studentAPI (getListStudents) - ",e.response.data)
  }
}