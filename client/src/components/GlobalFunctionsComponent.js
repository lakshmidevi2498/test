
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
