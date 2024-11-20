import API from "../../API/API";
const api = new API();
const endPoints = "save-subscription";
export const saveSubscriptionApi = async (subscription) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,{subscription});
      console.log("fetched user in saveSubscriptionApi", response);
      console.log("fetched user in saveSubscriptionApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in saveSubscriptionApi:", error);
      reject(error);
    }
  });
};
