import express from "express";
import routes from "routes/Routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", routes);

app.listen(PORT);
