import dotenv from "dotenv";
const key = "AimeGabrielaSophia";

//Gw6fpPUVFp3tJ@e

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const config = {
  dbUrl: process.env.BD_URL,
  monDebug: process.env.MONGO_DEBUG || false,
  port: process.env.PORT || 8080,
  host: process.env.HOST || "http://localhost",
  JWT_KEY: process.env.JWT_KEY || key,
  publicRoute: process.env.PUBLIC_ROUTE || "/public",
  staticRoute: process.env.PUBLIC_ROUTE || "/static",
  filesRoute: process.env.FILES_ROUTE || "/files",
  dev: process.env.NODE_ENV !== "production",
  mailer: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
    secure: process.env.MAILER_SECURE || false,
  },
};

export default config;
