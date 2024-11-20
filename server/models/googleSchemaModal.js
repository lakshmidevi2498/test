import mongoose from 'mongoose';

const googleSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  username: { type: String },
  avatar: { type: String },
  email:{type:String,required: true, unique: true}
});

export default mongoose.model("GoogleUser", googleSchema);
