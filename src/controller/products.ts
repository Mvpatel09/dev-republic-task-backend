import { Request, Response } from 'express';
import Product from "../models/Products";
import { HTTPResponse, StatusCodes, handleErrorResponse } from '../utils/httpResponse';
import Order from '../models/Orders';
import User from '../models/User';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await Product.distinct("category");
        const price = await Product.findOne({}).sort({ price: -1 })

        return HTTPResponse.OK(res, {
            status: StatusCodes.OK,
            message: "All categories",
            data: { allCategories, getMaxPrice: price },
        });
    } catch (e) {
        return handleErrorResponse(req, res, e as Error);
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { selectedCategory, price } = req.body

        const query = {} as any

        if (selectedCategory) {
            query.category = selectedCategory
        }
        if (price) {
            query.price = { $lte: price };
        }
        const products = await Product.find(query);

        return HTTPResponse.OK(res, {
            status: StatusCodes.OK,
            message: "Products list",
            data: products,
        });
    } catch (e) {
        return handleErrorResponse(req, res, e as Error);
    }
}

export const confirmOrder = async (req: any, res: Response) => {
    try {
        const userId = req.user._id;
        new Order({ products: req.body.payload, user: userId, totalPrice: req.body.totalPrice }).save();

        return HTTPResponse.OK(res, {
            status: StatusCodes.OK,
            message: "Order creted",

        });
    } catch (e) {
        return handleErrorResponse(req, res, e as Error);
    }
}

export const getUserOrder = async (req: any, res: Response) => {
    try {
        const userId = req.user._id;
        const getUserOrders = await Order.find({ user: userId }).populate("products.productId")

        return HTTPResponse.OK(res, {
            status: StatusCodes.OK,
            message: "Order creted",
            data: getUserOrders
        });
    } catch (e) {
        return handleErrorResponse(req, res, e as Error);
    }
}