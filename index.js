import process from "process";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import getenv from "./src/helper/getenv.js";
import questionRouter from "./src/routes/questionRoute.js";
import agentRouter from "./src/routes/agentRoute.js";
import subjectRouter from "./src/routes/subjectRoute.js";
import scholarshipRouter from "./src/routes/scholarshipRoute.js";
import topicRouter from "./src/routes/topicRoute.js";
import subtopicRouter from "./src/routes/subtopicRoute.js";

const app = express();
// const corsOptions = {
//   origin: "https://ss-kemenkeuprime.vercel.app/",
//   methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   headers: ["Origin", "Content-Type", "X-Auth-Token"],
// };
const PORT = process.env.PORT;
const MONGO_URI = getenv("MONGO_URI");

mongoose
  // .set("strictQuery", "false")
  .connect(MONGO_URI)
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.error(`Can't connect to the database!`);
    console.error(err);
    process.exit(1);
  });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(
  cors({
    origin: "https://ss-kemenkeuprime.vercel.app",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Express");
});

app.use("/question", questionRouter);
app.use("/agent", agentRouter);
app.use("/subject", subjectRouter);
app.use("/scholarship", scholarshipRouter);
app.use("/topic", topicRouter);
app.use("/subtopic", subtopicRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
