import API from "../../API/API";
const api = new API();
const endPoints = "api/user/signin/profile";
export const loadProfileApi = async ( token) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.get(`${endPoints}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetched user in loadProfileApi", response);
      console.log("fetched user in loadProfileApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in loadProfileApi:", error);
      reject(error);
    }
  });
};
