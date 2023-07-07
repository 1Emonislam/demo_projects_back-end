const CategoryModel = require('../models/Category.Model')

const createCategoryService = async (body, next) => {
  try {
    const data = await CategoryModel.create(body)
    return { isSuccess: true, data }
  } catch (error) {
    next(error)
  }
}
const getCategoryService = async (body, next) => {
  try {
    const { q, page = 1, limit = 50 } = body
    const finders = q
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { slug: { $regex: search, $options: 'i' } },
          ],
        }
      : {}
    const data = await CategoryModel.find(finders)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()
      .select('-__v -id')
    const size = await CategoryModel.find(finders).count()
    const totalPages = Math.ceil(size / limit)
    return { isSuccess: true, size, totalPages, limit, data }
  } catch (error) {
    next(error)
  }
}
module.exports = {
  createCategoryService,
  getCategoryService,
}
