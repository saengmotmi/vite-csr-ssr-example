import React from "react";
import ReactDOM from "react-dom/server";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import About from "../src/pages/About";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/assets", express.static("dist/assets"));

app.get("*", (req, res) => {
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    "utf8"
  );

  const ssrPaths = ["/about"];
  const isSSR = ssrPaths.includes(req.path);
  if (isSSR) {
    const result = ReactDOM.renderToString(<About />);

    indexHTML = indexHTML.replace(
      '<div id="root"></div>', // replace the placeholder
      `<div id="root">${result}</div>` // replace with the actual content
    );
  }

  return res.status(200).send(indexHTML);
});

app.listen(5500, () => {
  console.log("Server started on port 5500");
});
