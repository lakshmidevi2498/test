import API from "../../API/API";
const api = new API();
const endPoints = "admin";
export const adminLoginApi = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is get call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,user);
      console.log("fetched user in adminLoginApi", response);
      console.log("fetched user in adminLoginApi", response.data.token);
      resolve(response);
   
    } catch (error) {
      console.error("Error in adminLoginApi:", error);
      reject(error);
    }
  });
};
