import axios from "axios"

const hostname = 'https://todolist-go-back.appspot.com'
// const hostname = 'http://localhost:8020'

axios.defaults.baseURL = hostname

export function GetAll() {
  return axios.get("/tasks").then(x => x.data)
}

export function Get(id) {
  return axios.get("/tasks/"+id).then(x => x.data)
}

export function Create(obj) {
  return axios.post("/tasks", JSON.stringify(obj)).then(res => res.data)
}

export function Update(id, obj) {
  return axios.put("/tasks/" + id, JSON.stringify(obj)).then(res => res.data)
}

export function Delete(id) {
  return axios.delete("/tasks/"+id)
}

export function DeleteAll() {
  return axios.delete("/tasks")
}
