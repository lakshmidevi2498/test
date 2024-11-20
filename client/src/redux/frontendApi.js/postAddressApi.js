import API from "../../API/API";
const api = new API();
const endPoints = "address/post";
export const postAddressApi = async (values,userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,{values,userId});
      console.log("fetched user in postAddressApi", response);
      console.log("fetched user in postAddressApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in postAddressApi:", error);
      reject(error);
    }
  });
};
