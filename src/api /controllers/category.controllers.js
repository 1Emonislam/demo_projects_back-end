const { createCategoryService, getCategoryService } = require('../services/Category.Services')
const createCategory = async (req, res, next) => {
  try {
    req.body.user = req.user?._id
    const data = await createCategoryService(req.body, next)
    if (!data) throw new Error('Category create failed!')
    return res.json(data)
  } catch (error) {
    next(error)
  }
}
const getCategory = async (req, res, next) => {
  try {
    const data = await getCategoryService(req.body, next)
    if (!data) throw new Error('Category get failed!')
    return res.json(data)
  } catch (error) {
    next(error)
  }
}
module.exports = { createCategory, getCategory }
