import ordersController from '../../../../controllers/orderController'
import db from '../../../../database'
import { authOptions } from '../../auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    if (req.method === "POST") {
        
        const session = await unstable_getServerSession(req, res, authOptions)
        const {id} = await ordersController.confirm(req.query.id)
        // changing to confirmed for the status
         //req.body gives the cakeid
        res.status(200).redirect(`/orders/${id}/payment`)
        
    }
    
}

