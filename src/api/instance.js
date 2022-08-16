import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: false,
    headers: {
        accept: 'application/json',
    },
})

export default instance
