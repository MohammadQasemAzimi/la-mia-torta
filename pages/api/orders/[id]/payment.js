import ordersController from "../../../../controllers/orderController"

export default async function handler(req, res) {
    
    if (req.method === "GET") {
        
        const {id} = await ordersController.paid(req.query.id)
        // changing to confirmed for the status
         //req.body gives the cakeid
        res.status(200).redirect('/')
        
    }
    
}