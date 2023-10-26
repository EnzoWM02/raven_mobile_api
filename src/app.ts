import express from "express";
import httpSecurity from "middlewares/HttpSecurity";
import routes from "routes/Routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(httpSecurity);

app.use("/api", routes);

app.listen(PORT);
