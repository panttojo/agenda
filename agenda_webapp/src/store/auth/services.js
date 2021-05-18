import { API } from "../api"


const login = user => {
    return API.post("/auth/login", user)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const logout = () => {
    return API.post("/auth/logout")
        .then(response => response)
        .catch(error => {
            throw error
        })
}


const services = {
    login,
    logout,
}

export default services
