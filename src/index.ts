import express from "express";
import { createServer } from "node:http";

import logger from "./utils/logger.util";
import fileRouter from "./routers/file.router";

const app = express();
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Server running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/files", fileRouter);

const server = createServer(app);

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
server.listen({ port: PORT, host: HOST }, () => {
  logger.info(`Server running on port ${PORT}`);
});
