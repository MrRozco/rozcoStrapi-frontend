// src/lib/strapi.js
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function fetchFromStrapi(endpoint, queryParams = {}) {
  const sp = new URLSearchParams();

  const flatten = (obj, prefix = '') => {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}[${k}]` : k;
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        flatten(v, key);
      } else {
        sp.append(key, String(v));
      }
    }
  };
  flatten(queryParams);

  const url = `${API_URL}/api/${endpoint}?${sp.toString()}`;
  console.log('Strapi →', url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 86400 }, // Cache fetch requests for 24 hours
  });

  if (!res.ok) {
    console.error(`Strapi error: ${res.status} - ${url}`);
    throw new Error(`Strapi ${res.status}`);
  }
  return res.json();
}