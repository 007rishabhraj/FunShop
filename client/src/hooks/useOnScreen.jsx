import { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../App';

export default function useOnScreen(
    query,
    hasPropsChanged,
    setHasPropsChanged
) {
    // console.log('we are here', query);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    let cancel;

    useEffect(() => {
        console.log("in hook",query);
        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                console.log(
                    `/product?slug=${query.slug}&order=${query.order}&sort=${query.sort}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&page=${query.page}&limit=${query.limit}`
                );
                const res = await axiosInstance.get(
                    `/product?slug=${query.slug}&order=${query.order}&sort=${query.sort}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&page=${query.page}&limit=${query.limit}`,
                    { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
                );
                // console.log('useeffect ke nadar');
                console.log(res.data.result);
                setProducts((prevProducts) => {
                    if (hasPropsChanged) {
                      setHasPropsChanged(false)
                        return res.data.result;
                    } else {
                        return [
                            ...new Set([...prevProducts, ...res.data.result]),
                        ];
                    }
                });
                console.log(products);
                setHasMore(res.data.result.length > 0);
                setLoading(false);
            } catch (e) {
                if (axios.isCancel(e)) return;
                setError(true);
            }
        };

        fetchData();
        return () => cancel();
    }, [query]);
    return { loading, error, products, hasMore };
}