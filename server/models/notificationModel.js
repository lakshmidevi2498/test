import mongoose from'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  expirationTime: { type: Number },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  },
  token:{ type: String, required: true}
});

export default mongoose.model('Notification', SubscriptionSchema);
