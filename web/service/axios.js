
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();

const axiosInstance = axios.create({
  baseURL: `https://${process.env.SHOP}/admin/api/${process.env.GRAPHQL_API_VERSION}/graphql.json`,
  headers: {
    "Content-Type": "application/json",
    // "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
  },
});

export const apiConnector = async (method, bodyData = null, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
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