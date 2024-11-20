import API from "../../API/API";
const api = new API();
const endPoints = "checkout/get";
export const loadCheckoutApi = async ( userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is get call in API---->",endPoints);
      const response = await api.get(`${endPoints}?userId=${userId}`);
      console.log("fetched user in loadCheckoutApi", response);
      console.log("fetched user in loadCheckoutApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in loadCheckoutApi:", error);
      reject(error);
    }
  });
};
