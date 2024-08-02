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

const countChars = (str) => {
    const count = {};
    for (const char of str) {
        count[char] = (count[char] || 0) + 1;
    }
    return count;
};

function canFormFrom(s1, s2) {
    const count1 = countChars(s1);
    const count2 = countChars(s2);

    for (const char in count1) {
        if (count1[char] > (count2[char] || 0)) {
            return false;
        }
    }

    return true;
}

const getAllProduct = async (req, res) => {
    try {
        const {
            keyword = "",
            page = 1,
            field = "price",
            order = "asc",
            minPrice = 0,
            maxPrice = 100000000,
        } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(10);

        const totalProducts = await Product.find();
        const products = totalProducts
            .filter((item) =>
                canFormFrom(keyword.toLowerCase(), item.name.toLowerCase())
            )
            .filter((item) => item.price >= minPrice && item.price <= maxPrice)
            .sort((a, b) =>
                a[field] < b[field]
                    ? order === "asc"
                        ? -1
                        : 1
                    : order === "asc"
                    ? 1
                    : -1
            )
            .splice((pageNum - 1) * limitNum, limitNum);

        const totalPages = Math.ceil(totalProducts.length / limitNum);
        res.status(200).json({
            status: "success",
            results: products.length,
            total: totalPages,
            data: {
                products,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
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
