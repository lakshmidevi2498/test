import orderSchema from'../models/cartModal.js' 


export const cartController = async (req,res) => {

try {
  const {userId,productId} = req.body;

  if (!productId || !userId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

 
  let order = await orderSchema.findOne({ userId });

  if (order) {
    
    if (!order.productId.includes(productId)) {
      order.productId.push(productId);
      order.orderDate = new Date();  

      const updatedOrder = await order.save();
      res.status(200).json({ message: 'Product added to existing cart', order: updatedOrder });
    } else {
      res.status(200).json({ message: 'Product already in the order', order });
    }
  } else {
     
    order = new orderSchema({ userId, productId: [productId], orderDate: new Date() });
    const newOrder = await order.save();
    res.status(201).json({ message: 'product is added to you cart!', order: newOrder });
  }
} catch (error) {
  console.error("Error:", error);
  res.status(500).json({ message: 'Server error' });
}
 }

 export const getCartController = async( req ,res) => {

  try {
    const {userId} = req.query;
    console.log("userId",userId)

    const cartProducts = await orderSchema.findOne({userId})
    .populate('userId')
    .populate('productId')

    // console.log("cartProducts",cartProducts)
    res.status(201).json({  cartProducts });
    
  } catch (error) {
    console.error("Error:", error);
  res.status(500).json({ message: 'Server error' });
    
  }

 }
 export const deleteCartController = async (req, res) => {
  const { userId, productId } = req.body; 

  console.log("req.body in deleteCartController", req.body); 

  
  if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required" });
  }

  try {
     
      const deletedItem = await orderSchema.findOne({ userId });
      console.log("deletedItem",deletedItem)

      if (!deletedItem) {
          return res.status(404).json({ message: "Order not found" });
      }

       
      if (!deletedItem.productId.includes(productId)) {
          return res.status(400).json({ message: "Product not found in order" });
      }

     
      deletedItem.productId.pull(productId);
      deletedItem.orderDate = new Date(); 

       
      const updatedOrder = await deletedItem.save();

      res.status(200).json({   order: updatedOrder });
  } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Server error" });
  }
};
 