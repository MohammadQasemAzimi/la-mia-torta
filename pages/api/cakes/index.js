import cakeController from '../../../controllers/cakeController'

export default async function handler(req, res) {
    if (req.method === "POST") {
        // TODO take the title and description from the request body
        const { name, description, price, location, imageUrl } = req.body
        console.log('the request from the form', req.body)
        const UserId = 1
        const cake = await cakeController.create({
            name, description, price, location, imageUrl, UserId
        })
        res.status(200).redirect(`/bakers`);
    }
    // the redirect metod sends the user to the specified path

}