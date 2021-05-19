import { API } from '../api'


const getAll = params => {
    return API.get("/activities", {params})
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const getAllOptions = params => {
    return API.get('/activities/all', { params })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const create = data => {
    return API.post('/activities', data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const retrieve = id => {
    return API.get(`/activities/${id}`)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const update = (id, data) => {
    return API.patch(`/activities/${id}`, data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const destroy = id => {
    return API.delete(`/activities/${id}`)
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
