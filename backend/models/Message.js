import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
  },
  { timestamps: true }
)

export default mongoose.model('Message', messageSchema)
