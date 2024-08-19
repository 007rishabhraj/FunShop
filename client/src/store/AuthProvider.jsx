import { useEffect, useState } from 'react';
import { authContext } from './Auth';
import { axiosInstance } from '../App';
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axiosInstance.get('/user');
                setUser(response.data);
            } catch (error) {
                // console.log('User Not logged in');
                console.log(error);
            }
            setLoading(false);
        };
        checkUser();
    }, []);
    return (
        <authContext.Provider value={{ user, setUser }}>
            {!loading && <>{children}</>}
        </authContext.Provider>
    );
};

export default AuthProvider;
