// server.js  (Node backend for Scramjet + Bare)

import http from "http";
import express from "express";
import { BareServer } from "@tomphttp/bare-server-node";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Serve your existing frontend files (index.html, scramjet, etc.)
app.use(express.static(__dirname));

// Create Bare server mounted at /bare/
const bare = new BareServer("/bare/");

// HTTP server that splits between Bare and your frontend
const server = http.createServer((req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("Listening on port " + port);
});
