const express = require('express')
const { createBlogPost, getBlogPosts, updateBlogPosts } = require('../controllers/blog.controllers')
const isAuthorized = require('../middlewares')
const router = express.Router()
router.post('/', isAuthorized, createBlogPost)
router.get('/', isAuthorized, getBlogPosts)
router.put('/:id', isAuthorized, updateBlogPosts)
module.exports = router
