import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  rating: Number,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
