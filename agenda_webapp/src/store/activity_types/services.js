import { API } from '../api'


const getAll = params => {
    return API.get("/activity-types", {params})
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const getAllOptions = params => {
    return API.get('/activity-types/all', { params })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const create = data => {
    return API.post('/activity-types', data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const retrieve = id => {
    return API.get(`/activity-types/${id}`)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const update = (id, data) => {
    return API.patch(`/activity-types/${id}`, data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const destroy = id => {
    return API.delete(`/activity-types/${id}`)
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
