const axios = require("axios");
const NodeCache = require("node-cache");

const BASE_URL = "https://gnews.io/api/v4";
const API_KEY = process.env.GNEWS_API_KEY;

const DEFAULT_PARAMS = {
  category: "general",
  lang: "en",
  country: "us",
  max: 10,
};

const newsCache = new NodeCache({
  stdTTL: 60 * 5, // Cache for 5 minutes
  useClones: false, 
});

const fetchTopArticles = async ({ lang, category, country, max }) => {
  const cacheKey = `top-articles-${lang}-${category}-${country}-${max}`;
  const cachedArticles = newsCache.get(cacheKey);

  if (cachedArticles) {
    return cachedArticles;
  }

  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      category: category || DEFAULT_PARAMS.category,
      lang: lang || DEFAULT_PARAMS.lang,
      country: country || DEFAULT_PARAMS.country,
      max: max || DEFAULT_PARAMS.max,
      apikey: API_KEY,
    },
  });

  newsCache.set(cacheKey, response.data.articles);
  return response.data.articles;
};

const searchArticles = async (query) => {
  const cacheKey = `search-articles-${query}`;
  const cachedArticles = newsCache.get(cacheKey);
  console.log("cacheKey:", newsCache.keys());
  if (cachedArticles) {
    return cachedArticles;
  }

  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      q: query,
      lang: DEFAULT_PARAMS.lang,
      country: DEFAULT_PARAMS.country,
      max: DEFAULT_PARAMS.max,
      apikey: API_KEY,
    },
  });
  newsCache.set(cacheKey, response.data.articles);

  return response.data.articles;
};

module.exports = {
  searchArticles,
  fetchTopArticles,
    newsCache,
    
};
