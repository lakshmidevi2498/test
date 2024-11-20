import API from "../../API/API";
const api = new API();
const endPoints = "cart/delete";
export const deleteCartApi = async (userId,productId ) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is delete call in API---->",endPoints);
      const response = await api.delete(`${endPoints}`,{
        userId,productId 
      });
      console.log("fetched user in deleteCartApi", response);
    //   console.log("fetched user in emailLoginApi", response.data.token);
      resolve(response);
   
    } catch (error) {
      console.error("Error in deleteCartApi:", error);
      reject(error);
    }
  });
};
