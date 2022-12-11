//import ordersController from '../../../controllers/orderController'


export default async function handler(req, res) {
    console.log('the body from api is :',req.body)
    
    // Take the orders info from the request body
    /* const{UserId, CakeId, status} = req.body
    console.log(UserId, CakeId, status) */
    
     /*  const order = await ordersController.create({
        UserId, CakeId, status}) */
    // the redirect metod sends the user to the specified path
    res.status(200).redirect(`/order`);
  }