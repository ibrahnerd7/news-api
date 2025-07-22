const express = require("express");

require("dotenv").config({ quiet: true });

const { fetchTopArticles, searchArticles } = require("./src/services/GNewsService");

const app = express();

app.use(express.json());

app.get("/articles", async (req, res) => {
  const query = req.query;

  try {
    const articles = await fetchTopArticles({
      lang: query.lang,
      category: query.category,
      country: query.country,
      max: query.max,
    });
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const articles = await searchArticles(query);
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
