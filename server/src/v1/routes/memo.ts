import { Router } from "express";

import { create, getAll, getOne, update } from "../controllers/memo";
import { verifyToken } from "../handlers/tokenHandler";

export const router = Router();
module.exports = router;

// メモの新規作成API
router.post("/", verifyToken, create);
// ログイン中アカウントが投稿したメモ取得API
router.get("/", verifyToken, getAll);
// ログイン中アカウントが投稿した特定のメモ取得API
router.get("/:memoId", verifyToken, getOne);
// 特定のメモ更新API
router.put("/:memoId", verifyToken, update);
