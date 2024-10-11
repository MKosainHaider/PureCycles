import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  subcategories: [subcategorySchema] // Add subcategories as an array
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
