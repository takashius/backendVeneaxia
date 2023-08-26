import express, { static as _static } from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import config from "./config.js";
import router from "./network/routes.js";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

db(config.dbUrl);

const server = express();
server.use(bodyParser.json());
server.use(cors());

router(server);
const swaggerOptions = {
  swaggerDefinition: {
    info: "1.0.0",
    title: "Codu API",
    description: "Prueba inicial",
    contact: {
      name: "Erick Hernandez",
      url: "https://erdesarrollo.com.ve",
    },
    servers: [`http://localhost:${config.port}`],
  },
  apis: [`${path.join(__dirname, "./components/user/network.js")}`],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(_static(config.publicRoute));
server.use(_static("./static"));

server.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`Listening on http://localhost:${config.port}`);
});
