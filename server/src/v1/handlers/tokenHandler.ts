import jwt from "jsonwebtoken";
import { User } from "../models/user";

// JWT検証
const tokenDecode = (req: any) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodeToken = jwt.verify(bearer, process.env.TOKEN_SECRET_KEY!) as {
        id: string;
      };
      return { verify: true, data: decodeToken };
    } catch {
      return { verify: false };
    }
  } else {
    return { verify: false };
  }
};

// JWT認証を検証
export const verifyToken = async (req: any, res: any, next: any) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded.verify) {
    const user = await User.findById(tokenDecoded.data?.id);
    if (!user) {
      return res.status(401).json({ error: "権限がありません" });
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json({ error: "権限がありません" });
  }
};
