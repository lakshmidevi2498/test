
export const getUserId = () => {
    const socialUserId = localStorage.getItem("socialUserId");
    const signupUserId = localStorage.getItem("signupUserId");
    const signinUserId = localStorage.getItem("signinUserId");
    
    if (socialUserId !== null && socialUserId !== "null") {
        return socialUserId;
    } else if (signupUserId !== null) {
        return signupUserId;
    } else if (signinUserId !== null) {
        return signinUserId;
    } else {
        return null;
    }
};

export const getToken = () => {
    const token = localStorage.getItem("Token");
    const googleToken = localStorage.getItem("googleToken"); 
    
    if (token !== null ) {
        return token;
    } else if (googleToken !== null) {
        return googleToken;
    }  else {
        return null;
    }
};
