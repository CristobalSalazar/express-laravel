import router from "./routes";
import { createApp, createConnection } from "cheetah";
import { CONNECTION_STRING, PORT } from "./config";

async function main() {
  const connection = await createConnection(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const app = await createApp({
    routers: [ router ],
    hooks: app => {
      app.use(require('cookie-parser')())
    }
  });

  const server = app.listen(PORT, 
    () => console.log("App listening on port", PORT)
  );

  server.on('close', () => {
    connection.close()
  })
}
main();
