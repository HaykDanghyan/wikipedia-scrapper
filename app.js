import express from "express";
import mongoose from "mongoose";
import scrap from "./Scrapper.mjs";
import Documents from "./Documents.mjs";
import InvertedIndexes from "./InvertedIndex.mjs";

const app = express();
const port = process.env.PORT || 7778;

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/wikiDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Failed to connect to MongoDB"));

app.get("/", (req, res) => {
  Documents.find()
    .then((result) => res.send(result))
    .catch((err) => res.json(err));
});

const getResult = async (id, words) => {
    for (let key in words) {
      await InvertedIndexes.updateOne({word: words[key]}, {$push: {url: id}}, {upsert: true})
      .then().catch(err => console.error(err));
    }
}

app.post("/", async (req, res) => {
    const title = req.body.title;
    const words = await scrap(title);
});

app.post("/add", async (req, res) => {
  const title = req.body.title;
  const words = await scrap(title);
  await Documents.findOne({title: {$regex: title}})
  .then(result => {
      const oid = result._id;
      getResult(oid, words);
  })
  res.send("data uploaded successfully");
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
