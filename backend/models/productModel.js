import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  sale: { type: Number, default: 0 }, // Percentage discount, default 0 means no discount
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  categoryName: { type: String },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  subcategoryName: { type: String },
  discountedPrice: { type: Number }
});

productSchema.pre('save', function (next) {
  if (this.sale > 0) {
    this.discountedPrice = this.price - (this.price * this.sale / 100); // Calculate the discounted price
  } else {
    this.discountedPrice = this.price; // No discount, original price
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
