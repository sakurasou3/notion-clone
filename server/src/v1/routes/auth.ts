import { Router } from "express";
import { body } from "express-validator";
import "dotenv/config";

import { User } from "../models/user";
import { validate } from "../handlers/validation";
import { register } from "../controllers/user";

export const router = Router();
module.exports = router;

// ユーザー新規登録API
router.post(
  "/register",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要があります"),
  body("username").custom(async (value: string) => {
    const user = await User.findOne({ username: value });
    if (user) {
      return Promise.reject("このユーザーはすでに使われています");
    }
  }),
  validate,
  register
);

// ユーザーログインAPI
