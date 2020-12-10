import {
  register,
  login,
  accessTokenCheck,
  user,
} from "../controllers/auth.controller";

import { createRouter } from "cheetah";

const router = createRouter();

router.get("/", () => "Hello World");
router.post("/register", register);
router.post("/login", login);
router.get("/user", accessTokenCheck, user);

export default router;
