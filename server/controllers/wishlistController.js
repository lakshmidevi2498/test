import wishlistSchema from '../models/wishlistModal.js';


export const postWishlist = async(req,res) => {
    try {
        const {userId , productId} = req.body;
        console.log("req.body",req.body)
        if(!userId || !productId){
            res.status(401).json({message:"userId and productId are required"})
        }
        const wishlist = await wishlistSchema.findOne({userId})
        if (wishlist) {
    
            if (!wishlist.productId.includes(productId)) {
              wishlist.productId.push(productId);
              wishlist.wishlistrDate = new Date();  
        
              const updatedwishlist = await wishlist.save();
              res.status(200).json({ message: 'Product added to existing wishlist', wishlist: updatedwishlist });
            } else {
              res.status(200).json({ message: 'Product already in the wishlist', wishlist });
            }
          } else {
             
            const wishlist = new wishlistSchema({ userId, productId: [productId], wishlistDate: new Date() });
            const newWishlist = await wishlist.save();
            res.status(201).json({ message: 'Product added to wishlist successfully!', wishlist: newWishlist });
          }
        
    } catch (error) {
        console.log("error",error)
        res.status(500).json({message:"server error",error})
        
    }

}
export const getWishlist = async (req,res) => {
    try {
        const {userId} = req.query;
        console.log("req.query",req.query)
        const wishlistData = await wishlistSchema.findOne({userId})
        .populate('userId')
        .populate('productId')
        // console.log("wishlistData",wishlistData)
    res.status(201).json({ wishlistData });

        
    } catch (error) {
        console.log("error",error)
        res.status(500).json({message:"server error",error})
        
    }

}

export const deleteWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("req.body", req.body);

    if (!userId || !productId) {
      return res.status(401).json({ message: "userId and productId are required" });
    }

    const wishlist = await wishlistSchema.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const productInWishlist = wishlist.productId.find((id) => id.toString() === productId);
    if (!productInWishlist) {
      return res.status(400).json({ message: "Product not found in wishlist" });
    }
 
    wishlist.productId.pull(productId);
    wishlist.orderDate = new Date();  

    
    await wishlist.save();

 
    const updatedWishlist = await wishlistSchema
      .findOne({ userId })
      .populate('productId');  
      console.log("updatedWishlist",updatedWishlist)

    res.status(200).json({
      message: 'Product deleted from wishlist successfully',
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
 