import express, { Router } from 'express';
const router: Router = express.Router();

import * as auth from "../controller/auth"

router.post("/login", auth.Login)
router.post("/sign-up", auth.Login)

export { router }