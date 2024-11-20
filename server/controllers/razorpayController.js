import Razorpay from 'razorpay';
import crypto from 'crypto';

export const razorpayOrderController = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        const { amount, currency, receipt } = req.body;  

        console.log("Received in req.body:", { amount, currency, receipt });

        const options = {
            amount,       
            currency,
            receipt,
            payment_capture: 1,   
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ message: "Order creation failed" });
        }

        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


    
    
   
       




export const razorpayOrderValidateController = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.body;

    // console.log("Received data:", req.body); 
 
 
    const orderIdPaymentIdString = `${razorpay_order_id}|${razorpay_payment_id}`;
    console.log("String being hashed:", orderIdPaymentIdString);  

    
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(orderIdPaymentIdString);
    const digest = sha.digest("hex");
    console.log("Generated Digest:", digest); 

  
    if (digest !== razorpay_signature) {
        console.error("Signature mismatch: Transaction is not legal.");
        return res.status(500).send({ message: "Transaction is not legal" });
    }

 
    res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    });
};







// module.exports = {razorpayOrderValidateController ,razorpayOrderController }