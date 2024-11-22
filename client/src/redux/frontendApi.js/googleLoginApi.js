import API from "../../API/API";
const api = new API();
const endPoints = "auth/google";
 
export const googleLoginApi = () => {
  return new Promise((resolve, reject) => {
  
    const authWindow = window.open("https://test-3ahx.onrender.com/auth/google", "_self");
    // console.log("authWindow",authWindow)

 
    window.addEventListener("message", (event) => {
      if (event.origin !== "https://test-1-ekpw.onrender.com") return;  

      const { user, token, error } = event.data;
      console.log("event.data",event.data)

      if (user && token) {
        resolve({ user, token });
      } else {
        reject(error || "Google sign-in failed");
      }

      authWindow.close();
    });
  });
};

