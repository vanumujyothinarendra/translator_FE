import API from "./api";

export const registerUser = async (data: any) => {
  return API.post("register/", data);
};

export const loginUser = async (data: any) => {
  return API.post("login/", data);
};

export const forgotPassword = async (email: string) => {
  return API.post("forgot-password/", { email });
};

export const resetPassword = async (data: any) => {
  return API.post("reset-password/", data);
};