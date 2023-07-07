const BlogModel = require('../models/Blog.Model')

const createBlogPostService = async (body, next) => {
  try {
    const data = await BlogModel.create(body)
    return { isSuccess: true, data }
  } catch (error) {
    next(error)
  }
}

const getBlogPostService = async (body, next) => {
  try {
    const { q, page = 1, limit = 50, userId } = body
    const finders = q
      ? {
          author: userId,
          $or: [
            { meta_description: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { title: { $regex: search, $options: 'i' } },
          ],
        }
      : { author: userId }
    const data = await BlogModel.find(finders)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({ path: 'author', select: '_id name profilePicture email createdAt updatedAt' })
      .populate({ path: 'category', select: '_id name slug createdAt updatedAt' })
      .lean()
      .select('-__v -id')
    const size = await BlogModel.find(finders).count()
    const totalPages = Math.ceil(size / limit)
    return { isSuccess: true, size, limit, totalPages, data }
  } catch (error) {
    next(error)
  }
}

const updateBlogPostService = async (body, next) => {
  try {
    const data = await BlogModel.findByIdAndUpdate(
      {
        _id: body?.blogId,
      },
      body,
      { new: true },
    )
    if (!data) throw new Error('Blog post update failed!')
    return { isSuccess: true, message: 'Blog post update successfully!', data }
  } catch (error) {
    next(error)
  }
}
module.exports = {
  createBlogPostService,
  getBlogPostService,
  updateBlogPostService,
}
