import NodeCache from "node-cache";
export const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

const checkCache = (req, res, next) => {
    const {
        minPrice = 0,
        maxPrice = 100000,
        sort = "price",
        order = "asc",
        page = 1,
        limit = 1000,
        slug = "",
    } = req.query;
    try {
        const cacheKey = `products_${slug}_${minPrice}_${maxPrice}_${sort}_${order}_${page}_${limit}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.status(200).json(cachedData);
        }
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

export default checkCache;
