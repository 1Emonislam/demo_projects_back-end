const { createUserService, getUserService } = require('./../services/User.Services')
const createUser = async (req, res, next) => {
  try {
    const { name, email, profilePicture, password } = req.body
    const data = await createUserService({ name, email, profilePicture, password }, next)
    if (!data) throw new Error('User creatation failed!')
    return res.json(data)
  } catch (error) {
    next(error)
  }
}
const getUsers = async (req, res, next) => {
  try {
    const data = await getUserService(req.body, next)
    if (!data) throw new Error('User get failed!')
    return res.json(data)
  } catch (error) {
    next(error)
  }
}
module.exports = { createUser,getUsers }
