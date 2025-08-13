import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'ngrok-skip-browser-warning': 'any-value-works'
  },
});

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error?.response?.data || error;
  }
};