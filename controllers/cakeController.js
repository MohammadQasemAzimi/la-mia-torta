
import db from '../database'

const cakesController = {
  
  all: async () => {
    const cakes = await db.Cake.findAll()
    const parsedCakes = JSON.parse(JSON.stringify(cakes))
    return parsedCakes
  },
  find: async (id) => {
    const cake = await db.Cake.findByPk(id)
    const parsedCake = JSON.parse(JSON.stringify(cake))
    return parsedCake
  },
  create: async (data) => {
    console.log(db.models)
    const cake = await db.Cake.create(data)
    return JSON.parse(JSON.stringify(cake))
  },
  
  update: async (id, data) => {
    const cake = await db.Cake.findByPk(id)
    cake.update(data)
    return JSON.parse(JSON.stringify(cake))
  },


  delete: async (data) => {
    console.log(db.models)
    const cake = await db.Cake.delete(data)
    return JSON.parse(JSON.stringify(cake))
  },


 
  
}

export default cakesController
