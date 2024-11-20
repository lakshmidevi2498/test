import API from "../../API/API";
const api = new API();
const endPoints = "checkout";
export const deleteOrderApi = async ( id,price ,item) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is get call in API---->",endPoints);
      const response = await api.delete(`${endPoints}?id=${id}`,{price ,item});
      console.log("fetched user in deleteOrderApi", response);
      console.log("fetched user in deleteOrderApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in deleteOrderApi:", error);
      reject(error);
    }
  });
};
