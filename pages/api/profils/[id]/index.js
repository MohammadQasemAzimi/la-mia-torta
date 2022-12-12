// import cakesController from '../../../../controllers/cakeController'
import db from '../../../../database'

export default async function handler(req, res) {
    if (req.method === "POST") {
        console.log('the request of the form is ', req.body)
        const data = req.body
        const user = JSON.parse(JSON.stringify(data))
        console.log(user,data, "id is", req.query.id)
        await db.User.update(data, { where: { id: req.query.id } })
        res.status(200).redirect(`/`)
    }
}