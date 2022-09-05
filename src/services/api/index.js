import instance from './instance'

import authModule from './auth'
import crudModule from './crud'

export default {
    auth: authModule(instance),
    crud: crudModule(instance)
}
