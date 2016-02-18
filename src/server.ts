/// <reference path="../typings/tsd.d.ts" />

import * as express from 'express';
import Application = require('./core/application');

const NODE_PORT = 3000;
const app:express.Application = express();

Application
  .create(app)
  .configure({
    controllersDir: `${__dirname}/controllers`
  })
  .registerControllers()
  .run(NODE_PORT)
