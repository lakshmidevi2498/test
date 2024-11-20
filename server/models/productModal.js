import mongoose from 'mongoose';
 const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
     },
     image:{
        type:String    
     },
     price:{
        type:Number,
        required:true
     },
     quantity:{
        type:Number,
        required:true
     },
     type:{
        type:String,
        required:true
     }

})
export default mongoose.model('Product',productSchema)
 