var express = require("express");
var app = express();

import { env } from './config/globals';

app.get("/", function (req: any, res: any) {
  res.send("Hello World!");
});

app.listen(env.PORT, function () {
  console.log(`Example app listening on port ${env.PORT}!`);
});
