const {
  createBlogPostService,
  getBlogPostService,
  updateBlogPostService,
} = require('../services/Blog.Services')
const createBlogPost = async (req, res, next) => {
  try {
    req.body.author = req?.user?._id
    const data = await createBlogPostService(req.body, next)
    if (!data) throw new Error('Blog Post creatation failed!')
    return res.json(data)
  } catch (error) {
    next(error)
  }
}
const getBlogPosts = async (req, res, next) => {
  try {
    req.body.userId = req?.user?._id
    const data = await getBlogPostService(req.body, next)
    if (!data) throw new Error('Blog Posts get failed!')
    return res.json(data)
  } catch (error) {
    next(error)
  }
}
const updateBlogPosts = async (req, res, next) => {
  try {
    req.body.blogId = req?.params?.id
    const data = await updateBlogPostService(req.body, next)
    if (!data) throw new Error('Blog Posts update failed!')
    return res.json(data)
  } catch (error) {
    next(error)
  }
}
module.exports = { createBlogPost, getBlogPosts, updateBlogPosts }
