import { Router } from "express";

import { create, getAll } from "../controllers/memo";
import { verifyToken } from "../handlers/tokenHandler";

export const router = Router();
module.exports = router;

// メモの新規作成API
router.post("/", verifyToken, create);
// ログイン中アカウントが投稿したメモ取得API
router.get("/", verifyToken, getAll);
