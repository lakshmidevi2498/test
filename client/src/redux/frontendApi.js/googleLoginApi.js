import API from "../../API/API";
const api = new API();
const endPoints = "auth/google";
 
export const googleLoginApi = () => {
  return new Promise((resolve, reject) => {
  
    const authWindow = window.open("http://localhost:5050/auth/google", "_self");

 
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:3000") return;  

      const { user, token, error } = event.data;

      if (user && token) {
        resolve({ user, token });
      } else {
        reject(error || "Google sign-in failed");
      }

      authWindow.close();
    });
  });
};

