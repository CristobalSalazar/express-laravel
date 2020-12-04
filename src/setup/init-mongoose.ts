import mongoose from 'mongoose';

export async function initMongoose() {
  return new Promise((res, rej) => {
    mongoose
      .connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch(rej)
      .then(res);
  })
}
