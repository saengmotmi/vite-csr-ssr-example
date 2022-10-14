import React from "react";
import ReactDOM, { renderToPipeableStream } from "react-dom/server";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import About from "./src/pages/about";
import { getByteLengthByUTF8 } from "./src/utils";
import { createServerData, DataProvider } from "./src/utils/render";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 서버 재시작하면 cache 날아감
const cache: { [path: string]: string } = {};

app.use("/assets", express.static("dist/assets"));

let didError = false;

app.get("*", async (req, res) => {
  res.socket?.on("error", (error) => {
    console.error("error", error);
  });

  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "dist/index.html"),
    "utf8"
  );
  const currentPath = req.path;
  const cachedHTML = cache[currentPath];

  const ssrPaths = ["/about"];
  const isSSR = ssrPaths.includes(currentPath);

  // https://ko.reactjs.org/docs/react-dom-server.html#rendertopipeablestream
  // const data = createServerData();
  // const stream = renderToPipeableStream(
  //   <DataProvider data={data}>
  //     <About />
  //   </DataProvider>,
  //   {
  //     onShellReady() {
  //       // The content above all Suspense boundaries is ready.
  //       // If something errored before we started streaming, we set the error code appropriately.
  //       res.statusCode = didError ? 500 : 200;
  //       res.setHeader("Content-type", "text/html");
  //       stream.pipe(res);
  //     },
  //     onShellError(error) {
  //       // Something errored before we could complete the shell so we emit an alternative shell.
  //       res.statusCode = 500;
  //       res.send(
  //         '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
  //       );
  //     },
  //     onError(err) {
  //       didError = true;
  //       console.error(err);
  //     },
  //   }
  // );
  // return;

  // SSR
  if (isSSR && !cachedHTML) {
    console.time("render");

    await new Promise((resolve) => {
      return setTimeout(() => {
        resolve(true);
      }, 3000);
    });

    const result = ReactDOM.renderToString(<About />);
    console.timeEnd("render");
    const initialData = { name: "ssr" };
    const preRenderedProps = await About.getInitialProps(initialData);

    indexHTML = indexHTML
      .replace(
        '<div id="root"></div>', // replace the placeholder
        `<div id="root">${result}</div>` // replace with the actual content
      )
      .replace("__DATA_FROM_SERVER__", JSON.stringify(preRenderedProps)); // head script에 server 측 주입
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
