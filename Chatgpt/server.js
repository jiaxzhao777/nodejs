const { createServer } = require("http");
const axios = require("axios");
const dotenv = require("dotenv");
const { Stream } = require("stream");
dotenv.config();

const api = axios.create({
  baseURL: " https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

createServer(async (req, res) => {
  const { data } =
    (await api.post) <
    Stream >
    ("chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say this is a test!" }],
      max_tokens: 20,
      stream: true,
    },
    {
      responseType: "stream",
    });
  data.pipe(res);
  // res.end(JSON.stringify(data));
}).listen(8000);
