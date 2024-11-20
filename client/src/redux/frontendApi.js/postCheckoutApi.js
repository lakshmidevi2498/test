import API from "../../API/API";
const api = new API();
const endPoints = "checkout/post";
export const postCheckoutApi = async (userId,productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,{userId,productId});
      console.log("fetched user in postCheckoutApi", response);
      console.log("fetched user in postCheckoutApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in postCheckoutApi:", error);
      reject(error);
    }
  });
};
