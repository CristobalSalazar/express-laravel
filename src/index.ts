import routes from "./routes";
import CustomRouter from "./lib/routing/custom-router";
import { PORT } from './config';
import initApp from './setup/init-app';

async function main() {
  const app = await initApp();
  const router = new CustomRouter(app);
  routes(router);
  app.listen(PORT, () =>
    console.log("App listening on port", PORT)
  );
}
main();
