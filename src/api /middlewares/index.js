const UserModel = require('../models/User.Model')

const isAuthorized = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization
    if (!bearer) {
      res.status(404)
      throw 'Authorization Token not provided!'
    }
    const token = bearer.split(' ')[1] || req?.cookies?.jwt
    const user = await UserModel.findById(token)
      .lean()
    if (!user) {
      res.status(404)
      throw 'Please Login Before access this page!'
    }

    req.user = user
    next()
  } catch (err) {
    console.log(err)
    return res.status(400).send({
      error: `Authorization Failed!`,
      message: err.message || err,
    })
  }
}

module.exports = isAuthorized;