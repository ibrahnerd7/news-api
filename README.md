# GNews API

A lightweight Node.js wrapper around the [GNews API](https://gnews.io/) with built-in caching using `node-cache`. Provides endpoints to fetch top headlines and search for news articles with optional filters.


## Features

* In-memory caching for faster repeated responses (5 min TTL)
* Supports language, category, country, and max article filters
* Search endpoint for keyword-based article lookup
* Swagger documentation available at `/docs`

## Tech Stack

* Node.js
* Express
* Axios
* node-cache
* Swagger UI

## Installation

```bash
git clone https://github.com/ibrahnerd7/news-api.git
cd news-api
npm install
```

## Configuration

Create a `.env` file in the project root:
Head over to [GNews API](https://gnews.io/), create an account, grab the api key and paste it in the .env file
```env
GNEWS_API_KEY=your_gnews_api_key_here
```

## Run the Server

```bash
npm run start
```

The server will run on:
`http://localhost:3000`


## API Documentation

Visit:
`http://localhost:3000/docs`
For full Swagger-based interactive API docs.



## Endpoints

### `GET /articles`

Fetch top headlines.

**Query Parameters:**

| Param      | Type    | Required | Description                       |
| ---------- | ------- | -------- | --------------------------------- |
| `n`        | integer | yes    | Number of articles to return      |
| `category` | string  | no     | News category (e.g. `technology`) |
| `lang`     | string  | no     | Language code (default: `en`)     |
| `country`  | string  | no     | Country code (default: `us`)      |

**Example:**

```http
GET /articles?n=5&category=technology&country=us
```


### `GET /search`

Search articles by keyword.

**Query Parameters:**

| Param | Type   | Required | Description                |
| ----- | ------ | -------- | -------------------------- |
| `q`   | string | yes    | Search term (e.g. bitcoin) |

**Example:**

```http
GET /search?q=bitcoin
```


## Running Tests

```bash
npm test
```

Unit tests cover:

* Caching behavior
* Axios integration
* API error handling


## License

MIT
