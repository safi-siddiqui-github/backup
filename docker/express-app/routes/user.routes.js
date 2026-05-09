import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  //   upload.fields([
  //     {
  //       name: "avatar",
  //       maxCount: 1,
  //     },
  //     {
  //       name: "cover",
  //       maxCount: 1,
  //     },
  //   ]),
  upload.single("avatar"),
  registerUser
);
// router.post("/register", registerUser);

export default router;
