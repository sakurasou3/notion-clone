import AES from "crypto-js/aes";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { User } from "../models/user";

export const register = async (req: any, res: any) => {
  // パスワードの受け取り
  const password = req.body.password;

  // パスワードの暗号化
  try {
    req.body.password = AES.encrypt(
      password,
      process.env.SECRET_KEY!
    ).toString();

    // ユーザーの新規作成
    const user = await User.create(req.body);

    // JWT発行
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};
