require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const configureRouter = require("./shared/router");
const bodyParser = require("body-parser");

if (!process.env.PORT) {
  console.log(`Error to get ports`);
  process.exit(1);
}

const PORT= parseInt(process.env.PORT, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));

const router = configureRouter.configure(app);

app.use("", router);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

server.timeout = 600000; //10 minutes

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
