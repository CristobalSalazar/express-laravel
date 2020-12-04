import express from 'express'
import ValidationMiddleware from '../middleware/validate.middleware'
import { initMongoose } from './init-mongoose'

export default async function initApp() {

  await initMongoose()

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(ValidationMiddleware);
  return app;
}
