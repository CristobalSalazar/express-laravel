import { Login } from "../controllers/Login";
import { Register } from "../controllers/Register";
import { User } from "../controllers/User";
import { createRouter } from "cheetah";

const router = createRouter();
router.post("/register", Register);
router.post("/login", Login);
router.get("/user", User);
export default router;
