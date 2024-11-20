// import User from './models/userSchemaModal'; 
// import bcrypt from 'bcrypt';

// const DEFAULT_ADMIN = {
//     email: 'admin@gmail.com',
//     password: '123456',  
// };

 
// export const authenticate = async (email, password) => {
//     console.log("Attempting to log in with email:", email);
    
     
//     if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//         return Promise.resolve(DEFAULT_ADMIN);
//     }

     
//     const user = await User.findOne({ email });
//     if (user && await user.comparePassword(password)) {
//         return Promise.resolve(user);
//     }
    
//     return null;  
// };

// // Optionally create a default admin user in the database
// export const createDefaultAdmin = async () => {
//     const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN.email });
//     if (!existingAdmin) {
//         const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
//         await User.create({
//             name: 'Admin',
//             email: DEFAULT_ADMIN.email,
//             password: hashedPassword,
//             provider: 'local',
//             isAdmin: true,  
//         });
//         console.log('Default admin created in database');
//     }
// };
