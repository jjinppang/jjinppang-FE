import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "https://www.pre-onboarding-selection-task.shop/auth/signin",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password, confirmPassword) => {
  try {
    const response = await axios.post(
      "https://www.pre-onboarding-selection-task.shop/auth/signup",
      {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};