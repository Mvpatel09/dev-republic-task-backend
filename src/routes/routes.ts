import express, { Router } from 'express';
const router: Router = express.Router();

import * as auth from "../controller/auth"
import * as products from "../controller/products"
import { verifyUserToken } from '../middleware/jwt';

router.post("/login", auth.Login)
router.post("/sign-up", auth.Register)

router.post('/get-products', products.getProducts)
router.get('/get-all-categories', products.getAllCategories)
router.post('/confirm-order', verifyUserToken, products.confirmOrder)
router.get('/orders', verifyUserToken, products.getUserOrder)

export { router }