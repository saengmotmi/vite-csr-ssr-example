import React from "react";
import ReactDOM from "react-dom/server";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import About from "./src/pages/about";
import { getByteLengthByUTF8 } from "./src/utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 서버 재시작하면 cache 날아감
const cache: { [path: string]: string } = {};

app.use("/assets", express.static("dist/assets"));

app.get("*", (req, res) => {
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "dist/index.html"),
    "utf8"
  );
  const currentPath = req.path;
  const cachedHTML = cache[currentPath];

  const ssrPaths = ["/about"];
  const isSSR = ssrPaths.includes(currentPath);

  if (isSSR && !cachedHTML) {
    const result = ReactDOM.renderToString(<About />);
    const initialData = { name: "ssr" };

    indexHTML = indexHTML
      .replace(
        '<div id="root"></div>', // replace the placeholder
        `<div id="root">${result}</div>` // replace with the actual content
      )
      .replace("__DATA_FROM_SERVER__", JSON.stringify(initialData)); // head script에 server 측 주입
    cache[currentPath] = indexHTML;
  }
  if (cachedHTML) {
    console.log({ length: getByteLengthByUTF8(cachedHTML) });
    return res.status(200).send(cachedHTML);
  }
  return res.status(200).send(indexHTML);
});

app.listen(5500, () => {
  console.log("Server started on http://localhost:5500");
});
