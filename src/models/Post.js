const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  url: {
    type: String,
    trim: true,
  },
  canonical: String,
  mainImageURL: String,
  keywords: String,
  source: String,
  createdBy: { type: Schema.Types.ObjectId, role: String, ref: 'User'},
  sme: [{ type: Schema.Types.ObjectId, role: String, ref:'User' }],
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
}
);

const Curated = mongoose.model('Curated', postSchema);
module.exports = Curated;