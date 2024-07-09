import { Outlet } from "react-router-dom";

const Header = () => {
    return (
        <div>
            Header
            <Outlet />
            Footer
        </div>
    );
};

export default Header;
