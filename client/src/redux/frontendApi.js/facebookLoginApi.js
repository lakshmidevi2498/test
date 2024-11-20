import API from "../../API/API";
const api = new API(); 
export const facebookLoginApi = async (user) => {
  return new Promise((resolve, reject) => {
  
    const authWindow = window.open("https://test-3ahx.onrender.com/auth/facebook", "_self");

 
    window.addEventListener("message", (event) => {
      if (event.origin !== "https://test-1-ekpw.onrender.com") return;  

      const { user, token, error } = event.data;

      if (user && token) {
        resolve({ user, token });
      } else {
        reject(error || "facrbook sign-in failed");
      }

      authWindow.close();
    });
  });
};
