import '@babel/register'
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import bcrypt from 'bcrypt';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import signupRoute from './routes/signupRoute.js';
import signinRoute from './routes/signinRoute.js';
import facebookRoute from './routes/facebookRoute.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import wishlistRoute from './routes/wishlistRoute.js';
import checkoutRoute from './routes/checkoutRoute.js';
import addressRoute from './routes/addressRoute.js';
import razorpayRoute from './routes/razorpayRoute.js';
import orderHistoryRoute from './routes/orderHistoryRoute.js';
import webpush from 'web-push';
import notificationRoute from './routes/notificationRoute.js'
import {ComponentLoader} from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
  CustomDashboard: componentLoader.add('LogoutButton', './components/LogoutButton'),
}

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT' ],
  credentials: true,
}));
app.use(passport.initialize());
app.use(session({
  secret: 'session-key',
  resave: false,
  saveUninitialized: true,
}));

const apiKeys = {
  publicKey: 'BCoZetIZDVC9nbAkQmdXdLwXwXyEIYeuq1xpJ4Cnqc-TJdf3w9bkbD0JGu4v1kx7uuqBMHnKQPlkIaWPu5Er2uI',
  privateKey: 'Piwyy7draXGvTt-3NotAU2XvdOGronca3JtyorLp6N8'
};

webpush.setVapidDetails(
  'mailto:lakshmidevivalapudasu@gmail.com',
  apiKeys.publicKey,
  apiKeys.privateKey
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  retryWrites: true,
  w: 'majority',
  family: 4,
})
  .then(() => {
    console.log("DB is connected successfully");
    // createDefaultAdmin();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


 



AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});
 
const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: '/adminpanel',
  options:{
    properties:{
      type:'button',
      components:{
        component:Components.Components,
      }
    },
  },
 
  componentLoader
});


const adminRouter = AdminJSExpress.buildRouter(adminJs)
app.use(adminJs.options.rootPath, adminRouter);

// Routes
app.use('/signup', signupRoute);
app.use('/user', signupRoute);
app.use('/auth', signinRoute);
app.use('/auth', facebookRoute);
app.use('/api/user', signupRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/wishlist', wishlistRoute);
app.use('/checkout', checkoutRoute);
app.use('/address', addressRoute);
app.use('/order', razorpayRoute);
app.use('/orderhistory',orderHistoryRoute)
app.use('/buynow',checkoutRoute)
app.use('/order',orderHistoryRoute)
app.use('/save-subscription',notificationRoute)
app.use('/',notificationRoute)

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ message: 'Logout error' });
    }
    res.clearCookie('connect.sid');
    res.status(200).send({ message: 'Logged out successfully' });
  });
});

 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

 
// async function createDefaultAdmin() {
//   const User = mongoose.model('User'); 
//   const existingAdmin = await User.findOne({ email: 'admin@example.com' });

//   if (!existingAdmin) { 
//     await User.create({
//       name: 'Admin',
//       email: 'admin@gmail.com.com',
//       password: '123456',
//       provider: 'local',
//       isAdmin: true,
//     });
//     console.log('Default admin created in database');
//   }
// }
