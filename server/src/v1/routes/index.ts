import { Router } from "express";
export const router = Router();
module.exports = router;

router.use("/auth", require("./auth"));
