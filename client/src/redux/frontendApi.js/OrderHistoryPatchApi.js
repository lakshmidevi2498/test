import API from "../../API/API";
const api = new API();
const endPoints = "order/update";
export const OrderHistorypatchApi = async ( id ,body) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.put(`${endPoints}?id=${id}`,{body});
      console.log("fetched user in OrderHistorypatchApi", response);
      console.log("fetched user in OrderHistorypatchApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in OrderHistorypatchApi:", error);
      reject(error);
    }
  });
};
