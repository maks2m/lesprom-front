import axios from 'axios'
import store from '@/store/index.js'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: false,
    headers: {
        accept: 'application/json',
    },
})

export default instance
