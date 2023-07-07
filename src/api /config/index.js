const mongoose = require('mongoose')

const { db_uri } = process.env
const dbConnected = async () => {
  try {
    await mongoose.connect(db_uri)
    console.log('database successfully connected')
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = dbConnected
