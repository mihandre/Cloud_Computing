const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const messagesRouter = require("./router/messagesRouter");
const translateRouter = require("./router/translateRouter");
const sendgridRouter = require("./router/sendgridRouter");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/messages", messagesRouter);
app.use("/utils", translateRouter);
app.use("/mail", sendgridRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
