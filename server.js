import express, { static as _static } from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import config from "./config.js";
import router from "./network/routes.js";
import cors from "cors";

db(config.dbUrl);

const server = express();
server.use(bodyParser.json());
server.use(cors());

router(server);
server.use(_static(config.publicRoute));
server.use(_static("./static"));

server.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`Listening on http://localhost:${config.port}`);
});
