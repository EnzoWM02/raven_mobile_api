import express from "express";
import routes from "routes/Routes";
var cors = require("cors");
import { env } from "config/globals";

const app = express();

const corsOptions = {
  origin: env.DOMAIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", routes);

app.listen(env.PORT);
