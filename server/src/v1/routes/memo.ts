import { Router } from "express";

import { create } from "../controllers/memo";
import { verifyToken } from "../handlers/tokenHandler";

export const router = Router();
module.exports = router;

// メモの新規作成API
router.post("/", verifyToken, create);
