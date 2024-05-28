import express from "express";
import cors from "cors";
import { LeetCode } from "leetcode-query";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

async function main() {
  console.log("Fetching daily question");
  const lc = new LeetCode();
  var daily = "";
  try{
    daily = await lc.daily();
  }
  catch (e) {
    console.log(error);
  }
  return daily;
}

const _cache = main();

app.get("/", async (req, res) => {
  const daily = await _cache;
  res.json(daily);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("server started on http://localhost:8000");
});