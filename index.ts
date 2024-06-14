import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
    // allowedHeaders: ['Content-Type', 'Authorization']
  })
);
// app.use((req, res, next) => {
//   res.on("finish", () => {
//     console.log("Response Headers:", res.getHeaders());
//   });
//   next();
// });
console.log("Welcome");
app.use(
  "/user-service",
  createProxyMiddleware({
    target: process.env.userService,
    pathRewrite: {
      "^/user-service": "/user-service",
    },
  })
);


app.listen(port, () => {
  console.log("Api Gateway Listening Port");
});
// starting
// npm run start:dev
