import cakesController from '../../../../controllers/cakeController'

export default async function handler(req, res) {
    console.log('the methode is :',req.method)
    if(req.method === 'POST'){
        const cake = await cakesController.update(req.query.id, req.body)
    return res.status(200).redirect(`/cakes/${cake.id}`)
    }
    res.status(200).json({msg: req.method})
}