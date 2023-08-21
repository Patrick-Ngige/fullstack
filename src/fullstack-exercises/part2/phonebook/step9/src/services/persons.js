import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const crud = {
    getAll: getAll, 
    create: create, 
    update: update, 
    remove: remove,
}

export default crud