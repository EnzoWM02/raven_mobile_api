import express from 'express';
import routes from 'routes/Routes';
var cors = require('cors');
import { env } from 'config/globals';
import bypassAuthRoutes from 'routes/BypassAuthRoutes';
import handleHttpError from 'middlewares/errors/handleHttpError';

const app = express();

const corsOptions = {
  origin: env.DOMAIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', bypassAuthRoutes);
app.use('/api', routes);

app.use(handleHttpError);

app.listen(env.PORT);
