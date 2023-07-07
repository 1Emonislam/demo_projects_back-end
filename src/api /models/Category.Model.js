const mongoose = require('mongoose')
const { Schema } = mongoose
const CategorySchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is Required!'] },
    slug: {
      type: String,
      required: [true, 'Slug is Required!'],
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, toJSON: { virtuals: true } },
)
const CategoryModel = mongoose.model('Category', CategorySchema)
module.exports = CategoryModel
