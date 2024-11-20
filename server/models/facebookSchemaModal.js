import mongoose from 'mongoose';

const facebookSchema = new mongoose.Schema({
  facebookId: { type: String, required: true, unique: true },
  username: { type: String },
  email: { type: String, unique: true }, 
  profilePicture: { type: String } 
});

export default mongoose.model("FacebookUser", facebookSchema);
