import API from "../../API/API";
const api = new API();
const endPoints = "wishlist/post";
export const postWishlistApi = async ( userId,productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,{userId,productId});
      console.log("fetched user in postWishlistApi", response);
      console.log("fetched user in postWishlistApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in postWishlistApi:", error);
      reject(error);
    }
  });
};
