import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique category name
  description: { type: String, required: true } // Description of the category
}, {
  timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

export default mongoose.model('Category', categorySchema);
