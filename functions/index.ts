import * as functions from "firebase-functions";
import next from "next";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

app.prepare().then(() => {
  server.all("*", (req, res) => {
    return handle(req, res);
  });
});

// Экспортируем функцию
export const nextServer = functions
  .https.onRequest(server);
