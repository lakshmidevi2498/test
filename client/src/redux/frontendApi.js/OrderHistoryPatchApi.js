import API from "../../API/API";
const api = new API();
const endPoints = "order/update";
export const OrderHistorypatchApi = async (token, id ,body) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->", endPoints);
      console.log("this is post call in API---->", id ,"fghj",token);
      // console.log("this is post call in API---->", token);
      
      
      const response = await api.put(
        `${endPoints}?id=${id}`,
        body,  
        {
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("fetched user in OrderHistorypatchApi", response);
      resolve(response);
    } catch (error) {
      console.error("Error in OrderHistorypatchApi:", error);
      reject(error);
    }
  });
};

