import addressSchema from '../models/AddressModal.js'

export const postAddressController = async (req, res) => {


    try {
        const { values, userId } = req.body;
        if (!values || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const { fname, lname, email, number, address, city, pincode, district, country } = values;

        
        if (!fname || !lname || !email || !number || !address || !city || !pincode || !district || !country) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const name = `${lname} ${fname}`;
        const addressDetails = new addressSchema({ name, email, number, address, city, pincode, district, country, userId });

        await addressDetails.save();

        res.status(201).json({ message: "Address is added successfully", addressDetails });
    } catch (error) {
        res.status(500).json({ message: "server error" });
        console.log("error", error);
    }
};

export const getAddressController = async (req,res) => {
    try {
        const {userId} = req.query
        console.log("req.params",req.query)
        if (!userId ) {
            return res.status(401).json({ message: "userId is required" });
          }

        const userAddress = await addressSchema.find({userId})
        .populate('userId')
        console.log("userAddress",userAddress)
       
        
    res.status(201).json({ userAddress });


        
    } catch (error) {
        res.status(500).json({ message: "server error" });
        console.log("error", error);    
    }
} 