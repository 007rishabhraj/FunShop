import { query } from "express";
import { cache } from "../middleware/checkCache.js";
import Product from "../models/productModel.js";

const createProduct = async (req, res) => {
    try {
        //  implement algolia
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                newProduct,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


const getAllProduct = async (req, res) => {
    const {
        minPrice = 0,
        maxPrice = 100000,
        sort = "price",
        order = "asc",
        page = 1,
        limit = 1000,
        slug = '',
    } = req.query;
    console.log(req.query);
    // Determine sort order
    const sortOrder = order === "desc" ? -1 : 1;

    // Parse slugs from query parameter and create a filter array
    const slugArray = slug ? slug.split(",") : [];

    try {
        const products = await Product.aggregate([
            {
                $match: {
                    price: {
                        $gte: parseFloat(minPrice),
                        $lte: parseFloat(maxPrice),
                    },
                    ...(slugArray.length > 0
                        ? { slug: { $in: slugArray } }
                        : {}),
                },
            },
            {
                $sort: {
                    [sort]: sortOrder, // Dynamic sorting based on the query parameter
                },
            },
            {
                $skip: (parseInt(page) - 1) * parseInt(limit),
            },
            {
                $limit: parseInt(limit),
            },
        ]);
        const cacheKey = `products_${slug}_${minPrice}_${maxPrice}_${sort}_${order}_${page}_${limit}`
        cache.set(cacheKey, {
            status: "success",
            count: products.length,
            page:page,
            result: products,
        });
        res.status(200).json({
            status: "success",
            count: products.length,
            page:page,
            result: products,
        });
    } catch (error) {
        console.error("An error occurred:", error.message);
        res.status(500).json({
            status: "error",
            message: "An error occurred while fetching products.",
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                product,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "Success",
            data: null,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        res.status(200).json({
            status: "success",
            data: {
                product,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

export default {
    createProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    updateProduct,
};
