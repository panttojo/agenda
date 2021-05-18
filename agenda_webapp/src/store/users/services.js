import { API } from '../api'


const getAll = params => {
    return API.get("/users", {params})
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const getAllOptions = params => {
    return API.get('/users/all', { params })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const create = data => {
    return API.post('/users', data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const retrieve = id => {
    return API.get(`/users/${id}`)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const update = (id, data) => {
    return API.patch(`/users/${id}`, data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const destroy = id => {
    return API.delete(`/users/${id}`)
        .then(response => response)
        .catch(error => {
            throw error
        })
}


const services = {
    getAll,
    getAllOptions,
    create,
    retrieve,
    update,
    destroy,
}

export default services
