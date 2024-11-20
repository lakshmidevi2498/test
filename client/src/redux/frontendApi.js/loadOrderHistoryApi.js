import API from "../../API/API";
const api = new API();
const endPoints = "orderhistory";
export const loadOrderHistoryApi = async ( userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.get(`${endPoints}?userId=${userId}`);
      console.log("fetched user in loadOrderHistoryApi", response);
      console.log("fetched user in loadOrderHistoryApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in loadOrderHistoryApi:", error);
      reject(error);
    }
  });
};
