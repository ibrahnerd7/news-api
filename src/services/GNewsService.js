const axios = require("axios");

const HOST = "https://gnews.io/api/v4";
const API_KEY = process.env.GNEWS_API_KEY;

const DEFAULT_PARAMS = {
  category: "general",
  lang: "en",
  country: "us",
  max: 10,
};

const fetchTopArticles = async ({ lang, category, country, max }) => {
  const response = await axios.get(`${HOST}/top-headlines`, {
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

module.exports = {
  searchArticles,
  fetchTopArticles,
};
