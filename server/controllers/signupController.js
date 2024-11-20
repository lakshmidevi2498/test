import userSchemaModal from "../models/userSchemaModal.js"; 
import jwt from 'jsonwebtoken'; 
// const googleSchemaModal = require('../models/googleSchemaModal')
// const facebookSchemaModal = require('../models/facebookSchemaModal')

export const signupController = async (req, res) => {
    try {
        const { fname, lname, email, password, phone, gender ,role} = req.body;

         
        if (!fname || !lname || !email || !password || !phone || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const name = fname + " " + lname; 
        console.log("name", name);
        const userRole = role === 'admin' ? 'admin' : 'user';

        const newUser = new userSchemaModal({ name, email, password, phone, gender,provider: 'local',role: userRole });
        await newUser.save();  

        const token = newUser.generateAuthToken();  
        // console.log("token", token);

        res.status(201).json({ message: 'Registered successfully!', token, newUser });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("req.body", req.body);

         
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExist = await userSchemaModal.findOne({ email });
        console.log("userExist",userExist)

      
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
 
        const isMatch = await userExist.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                _id: userExist._id,
            }
        };
 
        jwt.sign(payload, 'secretkey', { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            // console.log("token", token); 
            return res.json({ message:"login successfull",token,userExist });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const signupProfileController = async (req, res) => {
    try {
        // console.log("req.user in signupProfileController", req.user); 
         

        
        const userFromEmailPassword = await userSchemaModal.findById(req.user._id);
        // console.log("userFromEmailPassword in signupProfileController",userFromEmailPassword)
        if (userFromEmailPassword) {
            return res.json(userFromEmailPassword);
        }
   

        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const signinProfileController = async (req, res) => {
    try {
        console.log("req.user in signinProfileController", req.user); 

        let user;
        const userFromEmailPassword = await userSchemaModal.findById(req.user._id);
        // console.log("userFromEmailPassword in signupProfileController",userFromEmailPassword)
        if (userFromEmailPassword) {
            return res.json(userFromEmailPassword);
        }   

        
        if (req.user && req.user.user) {
            user = await userSchemaModal.findById(req.user.user._id);
            // console.log("userFromEmailPassword in signinProfileController", user);
        }

         
        if (!user && req.user) {
            user = await userSchemaModal.findById(req.user.user.id);
            // console.log("userFromGoogle in signinProfileController", user);
        }

         
        if (!user && req.user) {
            user = await userSchemaModal.findById(req.user.user.id);
            // console.log("userFromFacebook in signinProfileController", user);
        }

         
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


 
