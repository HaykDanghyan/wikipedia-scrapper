import puppeteer from "puppeteer";
import Documents from "./Documents.mjs";

export default async function scrap(query) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://en.wikipedia.org/wiki/${query}`;
  await page.goto(url);
  const title = await page.evaluate(() => {
    return document.querySelector("title").innerText;
  });
  const content = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("p"))
      .map((content) => content.innerText)
      .filter((el) => el.length !== 0 && !el.includes("\n"))
  });
  await browser.close();
  const summary = content[0];
  const words = content.toString().split(" ");
    Documents.updateOne(
    { url: url, title: title, summary: summary },
    { $set: { url: url, title: title, summary: summary } },
    { upsert: true },
    () => {
      console.log("Created new Scrap");
    }
  );
  return words;
}