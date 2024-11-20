import API from "../../API/API";
const api = new API();
const endPoints = "wishlist/delete";
export const deleteWishlistApi = async (userId,productId ) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is delete call in API---->",endPoints);
      const response = await api.delete(`${endPoints}`,{
        userId,productId 
      });
      console.log("fetched user in deleteWishlistApi", response);
    //   console.log("fetched user in emailLoginApi", response.data.token);
      resolve(response);
   
    } catch (error) {
      console.error("Error in deleteWishlistApi:", error);
      reject(error);
    }
  });
};
