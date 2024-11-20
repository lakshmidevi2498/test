import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orderDate: { type: Date, default: Date.now },
})
export default mongoose.model('Order',cartSchema)