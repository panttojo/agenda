import { API } from '../api'


const getAll = params => {
    return API.get("/customers", {params})
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const getAllOptions = params => {
    return API.get('/customers/all', { params })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const create = data => {
    return API.post('/customers', data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const retrieve = id => {
    return API.get(`/customers/${id}`)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const update = (id, data) => {
    return API.patch(`/customers/${id}`, data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const destroy = id => {
    return API.delete(`/customers/${id}`)
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
