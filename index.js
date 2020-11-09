const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.alura.com.br/cursos-online-front-end");

  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll(
      ".subcategoria__lista .card-curso__icone"
    );
    const imgArray = [...nodeList];
    return imgArray.map(({ src }) => ({ src }));
  });

  fs.writeFile("alura.json", JSON.stringify(imgList, null, 2), (err) => {
    if (err) throw new Error("Something went wrong...");
    console.log("Well done!");
  });

  await browser.close();
})();
