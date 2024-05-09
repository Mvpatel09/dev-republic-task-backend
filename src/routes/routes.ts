import express, { Router } from 'express';
const router: Router = express.Router();

import * as controllers from "../controller/controller"

router.post("/login", controllers.Login)
router.post("/sign-up", controllers.Login)

export { router }