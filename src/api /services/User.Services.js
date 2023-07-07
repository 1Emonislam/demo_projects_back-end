const UserModel = require('../models/User.Model')

const createUserService = async (body, next) => {
  try {
    const exist = await UserModel.exists({ email: body.email })
    if (exist) throw new Error('User already exists!')
    const data = await UserModel.create(body)
    return { isSuccess: true, data }
  } catch (error) {
    next(error)
  }
}
const getUserService = async (body, next) => {
  try {
    const { q, page = 1, limit = 50 } = body
    const finders = q
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {}
    const data = await UserModel.find(finders)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()
      .select('-__v -id -password')
    const count = await UserModel.find(finders).count()
    const totalPages = Math.ceil(count / limit)
    return { isSuccess: true, size: count, limit, totalPages, data }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUserService,
  getUserService,
}
