const axios = require("axios");

const BASE_URL = "https://gnews.io/api/v4";
const API_KEY = process.env.GNEWS_API_KEY;

const DEFAULT_PARAMS = {
  category: "general",
  lang: "en",
  country: "us",
  max: 10,
};

const fetchTopArticles = async ({ lang, category, country, max }) => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      category: category || DEFAULT_PARAMS.category,
      lang: lang || DEFAULT_PARAMS.lang,
      country: country || DEFAULT_PARAMS.country,
      max: max || DEFAULT_PARAMS.max,
      apikey: API_KEY,
    },
  });

  return response.data.articles;
};

const searchArticles = async (query) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      q: query,
      lang: DEFAULT_PARAMS.lang,
      country: DEFAULT_PARAMS.country,
      max: DEFAULT_PARAMS.max,
      apikey: API_KEY,
    },
  });

  return response.data.articles;
};

module.exports = {
  searchArticles,
  fetchTopArticles,
};
