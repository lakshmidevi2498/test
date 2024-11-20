import mongoose from 'mongoose';
import checkoutSchema from '../models/checkoutModal.js';
import orderHistorySchema from '../models/OrderHistoryModel.js' 

const ObjectId = mongoose.Types.ObjectId;

export const checkoutPostController = async (req, res) => {
  try {
    const { userId, productId, orderStatus } = req.body;
    console.log("req.body", req.body);

    if (!userId || !productId) {
      return res.status(401).json({ message: "userId and productId are required" });
    }

    const checkoutdata = await checkoutSchema.findOne({ users: userId ,orderStatus: 'pending'});
    console.log("checkoutdata", checkoutdata);

    if (checkoutdata) {
       
      if (!checkoutdata.products.includes(productId)) {
        checkoutdata.products.push(productId);
        checkoutdata.checkoutDate = new Date();

      
        const updatedcheckoutdata = await checkoutdata.save();
        console.log("updatedcheckoutdata",updatedcheckoutdata)
        res.status(200).json({ message: 'Product added to existing checkout data', checkoutdata: updatedcheckoutdata });
      } else {
        res.status(200).json({ message: 'Product already in the checkout data', checkoutdata });
      }
    } else {
      
      const newCheckoutData = new checkoutSchema({
        users: userId,
        products: [productId], 
        orderStatus: orderStatus || 'pending',   
        checkoutDate: new Date(),
      });

      const savedCheckoutData = await newCheckoutData.save();
      res.status(201).json({ message: 'product is added to in your bag!', checkoutdata: savedCheckoutData });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "server error", error });
  }
};



export const checkoutGetController = async (req, res) => {
  try {
    const { userId } = req.query;
    

    const checkoutProducts = await checkoutSchema.findOne({ users: userId,orderStatus: 'pending' })
      .populate('users')
      .populate('products')

    console.log("checkoutProducts",checkoutProducts)
    res.status(201).json({  checkoutProducts });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Server error' });

  }
}



export const checkoutDeleteController = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("req.body in checkoutDeleteController", req.body);

  
    if (!userId || !productId) {
      return res.status(401).json({ message: "userId and productId are required" });
    }

  
    // const productObjectId = new mongoose.Types.ObjectId(productId);

  
    const unCheckedProduct = await checkoutSchema.findOne({ users: userId ,orderStatus:"pending"});
    console.log("unCheckedProduct",unCheckedProduct)
    if (!unCheckedProduct) {
      return res.status(404).json({ message: "Checkout not found for the user" });
    }

    if (!unCheckedProduct.products.includes(productId)) {
      return res.status(400).json({ message: "Product not found in user's checkout list" });
  }

 
  unCheckedProduct.products.pull(productId);
  unCheckedProduct.orderDate = new Date(); 


   
    await unCheckedProduct.save();

  
    const updatedCheckoutData = await checkoutSchema
      .findOne({ users: userId })
      .populate('products');
    
    console.log("updatedCheckoutData", updatedCheckoutData);

 
    res.status(200).json({
      message: 'Product deleted successfully from checkout',
      checkoutData: updatedCheckoutData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




// export const updateCheckoutController = async (req, res) => {
//   try {
//     const { userId, productId } = req.body;
//     console.log("req.body", req.body);

//     if (!userId || !productId) {
//       return res.status(400).json({ message: "User ID and Product ID are required" });
//     }

//     const updatedUser = await checkoutSchema.findOne({ users: userId }).populate('products');
//     console.log("updatedUser", updatedUser);


//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const objectIdProductId = new ObjectId(productId);

    
//     const product = updatedUser.products.find((product) => product._id.equals(objectIdProductId));

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found in user checkout' });
//     }

    
//     product.quantity += 1;
//     console.log("product",product)

    
//     await updatedUser.save();

   
//     // const updatedUserProductsDetails = await updated.populate('products');
//     console.log("updatedUserProductsDetails", updatedUser);

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("error", error);
//     res.status(500).json({ message: "server error", error });
//   }
// };


export const updateSuccessOrderController = async (req, res) => {
  try {
    const { id } = req.query;
    const {price,item}= req.body;
    console.log("req.query",req.query,req.body)

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid or missing order ID' });
    }

    
    const orderToUpdate = await checkoutSchema.findByIdAndUpdate(
      id,
      { orderStatus: 'success' },
      { new: true }
    );

    if (!orderToUpdate) {
      return res.status(404).json({ message: 'Order not found in user checkout' });
    }

    
    // let orderHistory = await orderHistorySchema.findOne({ users: orderToUpdate.users });

    // if (!orderHistory) {
       
      let orderHistory = new orderHistorySchema({
        users: orderToUpdate.users,
        items:item,
        totalAmount:price,
        products: [orderToUpdate.products || []],   
        orders: orderToUpdate._id,
        paymentStatus:"completed",
        shippingStatus:"order_placed",
        orderHistoryDate: new Date(),
      });
    // } 
   
    await orderHistory.save();
    console.log("orderHistory", orderHistory);

    res.status(200).json({ message: 'Order Place successfully!!', order: orderToUpdate });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCheckoutController = async (req,res) => {

}








 