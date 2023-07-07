const mongoose = require('mongoose')
const { Schema } = mongoose
const BlogSchema = new Schema(
  {
    title: { type: String, required: [true, 'Name is Required!'] },
    description: {
      type: String,
      required: [true, 'Description is Required!'],
    },
    state: { type: String, default: null },
    meta_description: { type: String, default: '' },
    is_active: { type: Boolean, default: true },
    show_in_home: { type: Boolean, default: true },
    slug: { type: String, default: '' },
    tags: { type: Array, default: [] },
    is_editor_picks: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, toJSON: { virtuals: true } },
)
const BlogModel = mongoose.model('Blog', BlogSchema)
module.exports = BlogModel
