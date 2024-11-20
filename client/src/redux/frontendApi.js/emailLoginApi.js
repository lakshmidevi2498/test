import API from "../../API/API";
const api = new API();
const endPoints = "user/signin";
export const emailLoginApi = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is get call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,user);
      console.log("fetched user in emailLoginApi", response);
      console.log("fetched user in emailLoginApi", response.data.token);
      resolve(response);
   
    } catch (error) {
      console.error("Error in loadProductsDataApi:", error);
      reject(error);
    }
  });
};
