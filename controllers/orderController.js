import db from '../database'

const ordersController = {
  
  all: async () => {
    const orders = await db.Order.findAll()
    const parsedOrders = JSON.parse(JSON.stringify(orders))
    return parsedOrders
  },
  find: async (id) => {
    const order = await db.Order.findByPk(id)
    const parsedOrder = JSON.parse(JSON.stringify(order))
    return parsedOrder
  },
  create: async (data) => {
    
    const order = await db.Order.create({
       UserId, CakeId,status:"done"
    })
    return JSON.parse(JSON.stringify(order))
  }  
}

export default ordersController