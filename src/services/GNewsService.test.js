const axios = require("axios");
const { fetchTopArticles, searchArticles, newsCache } = require("./GNewsService");

jest.mock("axios");

describe("GNews Service Tests", () => {
  beforeEach(() => {
    newsCache.flushAll();
    jest.clearAllMocks();
  });

  describe("fetchTopArticles", () => {
    it("should return cached articles if present", async () => {
      const mockArticles = [{ title: "Cached article" }];
      newsCache.set("top-articles-en-general-us-10", mockArticles);

      const result = await fetchTopArticles({
        lang: "en",
        category: "general",
        country: "us",
        max: 10,
      });

      expect(result).toEqual(mockArticles);
      expect(axios.get).not.toHaveBeenCalled();
    });

    it("should fetch and cache articles if not cached", async () => {
      const mockResponse = {
        data: {
          articles: [{ title: "Test News" }],
        },
      };
      axios.get.mockResolvedValue(mockResponse);

      const result = await fetchTopArticles({
        lang: "en",
        category: "general",
        country: "us",
        max: 10,
      });

      expect(result).toEqual(mockResponse.data.articles);
      expect(axios.get).toHaveBeenCalledWith(
        "https://gnews.io/api/v4/top-headlines",
        expect.objectContaining({
          params: expect.objectContaining({
            lang: "en",
            category: "general",
            country: "us",
            max: 10,
            apikey: process.env.GNEWS_API_KEY,
          }),
        })
      );

      const cached = newsCache.get("top-articles-en-general-us-10");
      expect(cached).toEqual(mockResponse.data.articles);
    });
  });

  describe("searchArticles", () => {
    it("should return cached search results if present", async () => {
      const mockArticles = [{ title: "Cached Search Articles" }];
      newsCache.set("search-articles-bitcoin", mockArticles);

      const result = await searchArticles("bitcoin");

      expect(result).toEqual(mockArticles);
      expect(axios.get).not.toHaveBeenCalled();
    });

    it("should fetch and cache search results if not cached", async () => {
      const mockResponse = {
        data: {
          articles: [{ title: "API Search Articles" }],
        },
      };
      axios.get.mockResolvedValue(mockResponse);

      const result = await searchArticles("tesla");

      expect(result).toEqual(mockResponse.data.articles);
      expect(axios.get).toHaveBeenCalledWith(
        "https://gnews.io/api/v4/search",
        expect.objectContaining({
          params: expect.objectContaining({
            q: "tesla",
            lang: "en",
            country: "us",
            max: 10,
            apikey: process.env.GNEWS_API_KEY,
          }),
        })
      );

      const cached = newsCache.get("search-articles-tesla");
      expect(cached).toEqual(mockResponse.data.articles);
    });
  });
});
