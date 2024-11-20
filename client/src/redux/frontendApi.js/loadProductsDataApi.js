import API from "../../API/API";
const api = new API();
const endPoints = "products";
export const loadProductsDataApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is get call in API---->",endPoints);
      const response = await api.get(`${endPoints}`);
      console.log("fetched data in loadProductsDataApi", response);
      resolve(response);
   
    } catch (error) {
      console.error("Error in loadProductsDataApi:", error);
      reject(error);
    }
  });
};
