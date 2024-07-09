import { useEffect, useState } from "react";
import { authContext } from "./Auth";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {}, []);
    return (
        <authContext.Provider value={{ user }}>{children}</authContext.Provider>
    );
};

export default AuthProvider;
