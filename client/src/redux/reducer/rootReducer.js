import { combineReducers } from "redux";

import { loadProductsDataReducer } from "./loadProductsDataReducer";
import { emailLoginReducer } from "./emailLoginReducer";
import { emailSignupReducer } from "./emailSignupReducer";
import { googleLoginReducer } from "./googleLoginReducer";
import { postCartReducer } from "./postCartReducer";
import { loadCartReducer } from "./loadCartReducer";
import { deleteCartReducer } from "./deleteCartReducer";
import { postWishlistReducer } from "./postWishlistReducer";
import { loadWishlistReducer } from "./loadWishlistReducer";
import { deleteWishlistReducer } from "./deleteWishlistReducer";
import { postCheckoutReducer } from "./postCheckoutReducer";
import { loadCheckoutReducer } from "./loadCheckoutReducer";
import { deleteCheckoutReducer } from "./deleteCheckoutReducer";
import { postAddressReducer } from "./postAddressReducer";
import { loadAddresssReducer } from "./loadAddressReducer";
import { loadOrderHistoryReducer } from "./loadOrderHistoryReducer";
import { loadProfileReducer } from "./loadProfileReducer";
import { razorpayOrderReducer } from "./razorpayOrderReducer";
import { razorpayOrderValidateReducer } from "./razorpayOrderValidateReducer";
import { deleteOrderReducer } from "./deleteOrderReducer"; 
import {orderHistoryPatchReducer} from "./orderHistoryPatchReducer"
import { saveSubscriptionReducer } from "./saveSubscriptionReducer";
import { sendNotificationReducer } from "./sendNotificationReducer";
import { adminLoginReducer } from "./adminLoginReducer";

export const rootReducer = combineReducers(
    {
        loadproductsdata:loadProductsDataReducer,
        loadusersdata:emailLoginReducer,
        postuserdata:emailSignupReducer,
        googleuserdata:googleLoginReducer,
        postcartproducts:postCartReducer,
        loadcartproducts:loadCartReducer,
        deleetcartproducts:deleteCartReducer,
        postwishlist:postWishlistReducer,
        loadwishlist:loadWishlistReducer,
        deletewishlist:deleteWishlistReducer,
        postcheckout:postCheckoutReducer,
        loadcheckout:loadCheckoutReducer,
        deletecheckout:deleteCheckoutReducer,
        postAddress:postAddressReducer,
        loadAddress:loadAddresssReducer,
        loadOrderhistory:loadOrderHistoryReducer,
        loadprofile:loadProfileReducer,
        razopayorder:razorpayOrderReducer,
        razorpayordervalidate:razorpayOrderValidateReducer,
        deleteorder:deleteOrderReducer ,
        patchorderhistory:orderHistoryPatchReducer,
        savesubscription:saveSubscriptionReducer,
        sendnotification:sendNotificationReducer,
        adminloginreducer:adminLoginReducer, 
  
})