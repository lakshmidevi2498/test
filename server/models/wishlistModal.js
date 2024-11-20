import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    wishlistrDate: { type: Date, default: Date.now },
})
export default mongoose.model('Wishlist',wishlistSchema)