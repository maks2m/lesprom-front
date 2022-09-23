import instance from '@/services/api/instance'

import authModule from '@/services/api/auth'
import crudModule from '@/services/api/crud'
import orderSpecialCrudModule from "@/services/api/order/orderSpecialCrud";

export default {
    auth: authModule(instance),
    crud: crudModule(instance),
    orderSpecialCrud: orderSpecialCrudModule(instance)
}
