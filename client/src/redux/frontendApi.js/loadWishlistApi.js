import API from "../../API/API";
const api = new API();
const endPoints = "wishlist/get";
export const loadWishlistApi = async ( userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.get(`${endPoints}?userId=${userId}`);
      console.log("fetched user in loadCartApi", response);
      console.log("fetched user in loadCartApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in loadCartApi:", error);
      reject(error);
    }
  });
};
