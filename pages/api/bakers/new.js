import cakeController from '../../../controllers/cakeController'

export default async function handler(req, res) {
    // TODO take the title and description from the request body
    const{name, description, price, location, imageUrl} = req.body
    const UserId = 1
     console.log(name, description, price, location, imageUrl)
      const cake = await cakeController.create({
        name, description, price, location, imageUrl,UserId})
    // the redirect metod sends the user to the specified path
    res.status(200).redirect(`/baker`);
  }