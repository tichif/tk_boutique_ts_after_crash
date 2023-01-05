import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import Logging from './utils/log';
import errorHandler from './middleware/error';
import ErrorResponse from './utils/Error';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import config from './config';

const app = express();

function logRequestAndResponse() {
  app.use((req, res, next) => {
    // log incoming request
    Logging.info(
      `INCOMING -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    // log outgoing response
    res.on('finish', () => {
      Logging.info(
        `OUTGOING -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10mn
  max: 50,
});

// middleware
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(hpp());
app.use(helmet());
// app.use(compression());
app.use(limiter);
app.use(
  cors({
    origin: config.cors,
    credentials: true,
  })
);
// CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', config.cors);
//   // res.header(
//   //   'Access-Control-Allow-Headers',
//   //   'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   // );
//   // res.header('Access-Control-Allow-Credential', 'true');

//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }

//   next();
// });

logRequestAndResponse();

app.use(deserializeUser);
// routes
routes(app);
app.get('/ping', (req, res, next) => {
  return res.status(200).json({ message: 'ok' });
});

app.use(errorHandler);

// Implement unsupported routes error
app.use((req, res, next) => {
  const error = new ErrorResponse("Cette route n'existe pas.", 404);
  next(error);
});

export default app;
