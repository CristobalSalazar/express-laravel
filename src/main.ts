import router from "./routes";
import { createApp } from "cheetah";
import { CONNECTION_STRING, PORT } from "./config";

async function main() {
  const app = await createApp(router, {
    db: {
      uri: CONNECTION_STRING,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  });
  app.listen(PORT, () => console.log("App listening on port", PORT));
}
main();
