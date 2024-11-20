import API from "../../API/API";
const api = new API();
const endPoints = "send-notification";
export const sendNotificationApi = async ( body) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,{body});
      console.log("fetched user in sendNotificationApi", response);
      console.log("fetched user in sendNotificationApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in sendNotificationApi:", error);
      reject(error);
    }
  });
};
