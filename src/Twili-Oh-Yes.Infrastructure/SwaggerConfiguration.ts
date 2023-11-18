const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
require("dotenv").config();

const baseURL = process.env.NGROK_BASE_URL || "http://localhost:3000";

const doc = {
  info: {
    version: "1.0.0",
    title: "Twili-Oh-Yes",
    description: "Sms chat API",
  },
  servers: [
    {
      url: `${baseURL}/api/message`,

    },
  ],
};

const outputFile = "../../swagger-output.json";
const endpointsFiles = ["../Twili-Oh-Yes.Api/Routers/MessageRouter.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
