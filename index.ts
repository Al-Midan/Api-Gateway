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
app.use(
  "/user-service",
  createProxyMiddleware({
    target: process.env.userService,
    pathRewrite: {
      "^/user-service": "/user-service",
    },
  })
);
app.use(
  "/course-service",
  createProxyMiddleware({
    target: process.env.courseService,
    pathRewrite: {
      "^/course-service": "/course-service",
    },
  })
);
app.use(
  "/general-service",
  createProxyMiddleware({
    target: process.env.generalService,
    pathRewrite: {
      "^/general-service": "/general-service",
    },
  })
);
app.use(
  "/freelance-service",
  createProxyMiddleware({
    target: process.env.freelanceService,
    pathRewrite: {
      "^/freelance-service": "/freelance-service",
    },
  })
);

app.listen(port, () => {
  console.log("Api Gateway Listening Port");
});

