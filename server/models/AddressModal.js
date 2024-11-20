import mongoose from 'mongoose';

 
const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  
        required: true,
        ref: 'User'  
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    number: {
        type: String,  
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Address', addressSchema); 
 
