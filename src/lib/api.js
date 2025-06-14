import axios from 'axios';
import qs from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function fetchFromStrapi(endpoint, queryParams = {}) {
  let queryString = qs.stringify(queryParams, { encodeValuesOnly: true });
  queryString = queryString.replace(/%2A/g, '*');
  const url = `${API_URL}/api/${endpoint}?${queryString}`;
  console.log(`Fetching from: ${url}`);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from Strapi: ${endpoint}`, error.response?.status, error.message);
    return null;
  }
}