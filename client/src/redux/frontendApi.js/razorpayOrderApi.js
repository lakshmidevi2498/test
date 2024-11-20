import API from "../../API/API";
const api = new API();
const endPoints = "order";

export const razorpayOrderApi = async (data) => {   
  return new Promise(async (resolve, reject) => {
    try {
      console.log("This is a post call in API---->", endPoints);
      const response = await api.post(
        endPoints, 
        data,  
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Fetched data in razorpayOrderApi:", response);
      console.log("Response data:", response.data);
      resolve(response);
    } catch (error) {
      console.error("Error in razorpayOrderApi:", error);
      reject(error);
    }
  });
};
