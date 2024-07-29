import NodeCache from "node-cache";
export const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
const checkCache = (req, res, next) => {
    try {
        const products = cache.get("products");
        if (products) {
            return res.status(200).json(products);
        }
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

export default checkCache;