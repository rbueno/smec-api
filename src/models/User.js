const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 70,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
  },
  password: {
    type: String,
    minLength: 8,
    trim: true,
    required: true,
  },
  role: {
    type: [String],
    enum: ['ordinary', 'sme'],
    default: 'ordinary',
  },
  smeProfile: {
    status: { type: String, enum: ['refused', 'review in progress', 'approved', 'not allowed'], default: 'not allowed'},
    id: String,
    lastName: String,
    firstName: String,
    createdAt: Date,
    updatedAt: Date,
  },
  curated: [{ type: Schema.Types.ObjectId, role: String, ref:'Curated' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

const User = mongoose.model('User', userSchema);
module.exports = User;