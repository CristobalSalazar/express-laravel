import mongoose from 'mongoose'
import { CONNECTION_STRING } from '../../config'

export async function initMongoose() {
  return new Promise((res, rej) => {
    mongoose
      .connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch(rej)
      .then(res)
  })
}
