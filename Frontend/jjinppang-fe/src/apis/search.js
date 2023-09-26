// api.js
import axios from "axios";

const BASE_URL = "http://52.79.161.114/apidummy";

export const search = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};
