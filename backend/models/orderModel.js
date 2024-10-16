import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Completed', 'Cancelled'] },
  deliveryDetails: {
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
