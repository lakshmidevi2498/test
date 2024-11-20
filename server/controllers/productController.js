import productSchema from '../models/productModal.js';
import axios from 'axios'; 


export const addProductController = async( req,res) => {
    try {
        const { name, price, image,quantity ,type} = req.body;
        // console.log("req.body", req.body);
        
        if (!name || !price || !image || !quantity || !type) {
          return res.status(400).json({ message: 'All fields are required' });
        }
       
        const response = await axios.get(image, { responseType: 'arraybuffer' }); 
    
       
        const base64Image = `data:${response.headers['content-type']};base64,${Buffer.from(response.data).toString('base64')}`;
        // console.log("base64Image",base64Image);
       
        const productDetails = new productSchema({ name, price, image: base64Image,quantity,type });
        // console.log("productDetails",productDetails);
        await productDetails.save();
    
        res.status(201).json({   productDetails });
      } catch (error) {
        console.log("Error in products controller", error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
}

export const getProductController = async ( req,res) => {
    try {
        const productsData = await productSchema.find(); 
        res.status(200).json(productsData);
      } catch (error) {
        console.log("Error in products controller", error);
        res.status(500).json({  error: error.message });
      }

 } 