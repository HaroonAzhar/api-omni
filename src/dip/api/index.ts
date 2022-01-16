import { Router } from "express";

import createDip from "./createDip";

const router = Router();

router.post("/", createDip);

export default router;
