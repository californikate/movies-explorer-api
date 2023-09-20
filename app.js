require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DEV_DB_URL } = require('./utils/config');

const routes = require('./routes/index');
const errorsMiddle = require('./middlewares/errors');

const { PORT = 3005 } = process.env;

const app = express();
app.use(cors());
mongoose.connect(DEV_DB_URL);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorsMiddle);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
