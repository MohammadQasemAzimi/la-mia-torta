import cakeController from '../../../controllers/cakeController'
import db from '../../../database'
export default async function handler(req, res) {
    if (req.method === "POST") {
        // TODO take the title and description from the request body
        const { name, description, price, location, imageUrl } = req.body
        const user = await db.User.findOne({where:{email:req.body.email}})
        const UserId = user.id
        const cake = await cakeController.create({
            name, description, price, location, imageUrl, UserId
        })
        res.status(200).redirect(`/bakers`);
    }
    // the redirect metod sends the user to the specified path
}
