import mongoose from 'mongoose';

const oderHistorySchema = new mongoose.Schema({
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    items:Number,
  totalAmount: Number,
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'] },
  shippingStatus: { type: String, enum: ['order_placed',   'shipped', 'out_for_delivery', 'delivered','cancelled'] }, 
  shippedDate:{ type: Date, default: null },
  outfordeliveryDate:{ type: Date, default: null },
  deliveredDate:{ type: Date, default: null },
  cancelledDate:{ type: Date, default: null },
  cancelledReason:{ type: String, default: null },
  orderedStatus:{type: String, enum: ['processing', 'completed', 'cancelled'] , default:"processing"},
    orders:{type: mongoose.Schema.Types.ObjectId, ref: 'Checkout'},
    oderHistoryDate: { type: Date, default: Date.now },
})
export default mongoose.model('OrderHistory',oderHistorySchema)




