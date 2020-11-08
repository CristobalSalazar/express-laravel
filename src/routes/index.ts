import AuthController from "../controllers/AuthController";
import CustomRouter from "../lib/routing/custom-router";

export default function routes(router: CustomRouter) {
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);
}
