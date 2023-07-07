const express = require('express');
const { createCategory,getCategory } = require('../controllers/category.controllers');
const isAuthorized = require('../middlewares');
const router = express.Router()
router.post('/',isAuthorized,createCategory)
router.get('/',isAuthorized,getCategory)
module.exports =router;