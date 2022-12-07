import db from '../database'
const { Op } = require("sequelize");
const userController = {
    getone: async (email, password) => {
        const user = await db.User.findOne({
            where: {
                [Op.and]: [
                    { email: email },
                    { password: password },
                ]
            }
        })
        const parsedUser = await JSON.parse(JSON.stringify(user))
        return parsedUser
    }
}

export default userController
