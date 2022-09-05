import api from '../services/api/index'

export default {
    install: (app, options) => {
        app.config.globalProperties.$api = api
    }
}
