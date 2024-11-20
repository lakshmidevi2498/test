

import API from "../../API/API";
const api = new API();
const endPoints = "order/validate";
export const razorpayOrderValidateApi = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,{body,
        headers: {
                    "Content-Type": "application/json"
                }
      });
      console.log("fetched user in razorpayOrderValidateApi", response);
      console.log("fetched user in razorpayOrderValidateApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in razorpayOrderValidateApi:", error);
      reject(error);
    }
  });
};
