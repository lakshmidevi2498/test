import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String },

  googleId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },

  provider: { type: String, enum: ['local', 'google', 'facebook'], required: true },

  avatar: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  
 
  role: { type: String, enum: ['admin', 'user'], default: 'user', },  
});

 
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

 
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

 
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, provider: this.provider, isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
};

export default mongoose.model('User', userSchema);
