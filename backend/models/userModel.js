import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'super admin'], // Limit role to specific values
    default: 'user' // Set 'user' as the default role
  }
});

const User = mongoose.model('User', userSchema);
export default User;
