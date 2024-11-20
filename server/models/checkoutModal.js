import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema({
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orderStatus: {
        type: String,
        enum: ['success', 'pending', 'failed'],  
        default: 'pending', 
    },
    checkoutDate: { type: Date, default: Date.now },
});

export default mongoose.model('Checkout', checkoutSchema);
