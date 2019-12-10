import mongoose, { Schema } from 'mongoose'

const postsSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  tags: {
    type: String
  },
  thumbnail: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

postsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      content: this.content,
      tags: this.tags,
      thumbnail: this.thumbnail,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Posts', postsSchema)

export const schema = model.schema
export default model
