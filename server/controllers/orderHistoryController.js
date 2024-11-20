import orderHistorySchema from'../models/OrderHistoryModel.js'
import mongoose from 'mongoose'


export const getOrderHistoryController = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("req.query", req.query);

    if (!userId) {
      return res.json({ message: "userId is required" });
    }

    
    const orderHistory = await orderHistorySchema.find({ users: userId });
    console.log("orderHistory", orderHistory);

    if (!orderHistory || orderHistory.length === 0) {
      return res.json({ message: "You don't have any orders yet" });
    }

    
    const orderDetails = await Promise.all(
      orderHistory.map(order =>
        order.populate({
          path: 'orders',
          populate: {
            path: 'products',
            model: 'Product',
          },
        })
      )
    );

    res.status(200).json({
      // message: "Order history fetched successfully",
      orderDetails,
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "server error", error });
  }
};

export const updateOrderHistoryController = async (req, res) => {
  try {
    const { orderedStatus, selectedReason ,shippingStatus} = req.body.body;
    const { id } = req.query;
    console.log("req.body", req.body.body, req.query);

    if (!orderedStatus) {
      return res.status(400).json({ message: "orderedStatus is required" });
    }

    const updated = await orderHistorySchema.findById(id);
    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    updated.orderedStatus = orderedStatus;
    if (orderedStatus === "cancelled") {
      updated.cancelledDate = new Date();
      updated.cancelledReason = selectedReason;
      updated.shippingStatus =shippingStatus
    }

    await updated.save();

    res.status(200).json({ message: " Your Order cancelled successfully", updated });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error });
  }
};


  