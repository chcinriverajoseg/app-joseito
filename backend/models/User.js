import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    age: Number,
    gender: String,
    interests: [String],
    bio: String,
    profileImage: String,

   likesGiven: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
likesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }], // 👈 agrega esto
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

export default mongoose.model('User', userSchema)
