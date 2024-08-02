import { FaUserCircle } from 'react-icons/fa';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { LuAlignJustify } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/Auth';
import {
    Badge,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
} from '@nextui-org/react';
import LogOutModal from '../LogOutModal';

const Header = () => {
    const location = useLocation();
    const hide =
        location.pathname === '/login' || location.pathname === '/signup';
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const redirect = useNavigate();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);
    const [logout, setLogout] = useState(false);
    return (
        <>
            <nav className="shadow-lg">
                <div className="px-4 flex justify-between h-16 sm:px-6 lg:px-8">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <img
                                className="h-10 w-auto"
                                src="/logo.png"
                                alt="Logo"
                            />
                        </div>
                        <div className="hidden md:ml-6 md:flex gap-4 md:gap-8">
                            <Link
                                to="/"
                                className={`text-gray-900 inline-flex hover:border-black border-b-2  items-center px-1 pt-1 text-md font-medium ${
                                    location.pathname === '/'
                                        ? ' border-black'
                                        : 'border-transparent'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/search"
                                className={`text-gray-900 inline-flex border-b-2 hover:border-black items-center px-1 pt-1 text-md font-medium ${
                                    location.pathname === '/search'
                                        ? 'border-b-2 border-black'
                                        : 'border-transparent'
                                }`}
                            >
                                Products
                            </Link>
                        </div>
                    </div>
                    {!hide && (
                        <div className="my-auto">
                            <Input
                                type="text"
                                startContent={<IoSearch />}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        if (e.target.value.trim() === '')
                                            return redirect('/search');
                                        redirect(
                                            `/search?keyword=${e.target.value}`
                                        );
                                    }
                                }}
                                placeholder="Search FunShop..."
                                className="w-[40vw] sm:w-[30vw]  border border-gray-300 rounded-md"
                            />
                        </div>
                    )}
                    <div className="hidden md:flex ">
                        {!hide && (
                            <div className="flex md:items-center  justify-between">
                                <Badge
                                    content={user ? user.cart.length : 0}
                                    color="primary"
                                >
                                    <FaShoppingCart
                                        onClick={() => redirect('/cart')}
                                        className="text-3xl ml-4 cursor-pointer text-gray-800"
                                    />
                                </Badge>
                            </div>
                        )}

                        <Dropdown>
                            <DropdownTrigger>
                                <div className="flex h-full items-center ml-4 cursor-pointer">
                                    <FaUserCircle className="text-3xl" />
                                </div>
                            </DropdownTrigger>
                            {user && (
                                <DropdownMenu
                                    color={'primary'}
                                    onAction={(key) => {
                                        if (key === 'account') {
                                            redirect('/account');
                                        } else {
                                            setLogout(true);
                                        }
                                    }}
                                >
                                    <DropdownItem
                                        key="profile"
                                        className="h-14"
                                        isReadOnly
                                    >
                                        <p className="font-semibold">
                                            Signed in as
                                        </p>
                                        <p>{user.name}</p>
                                    </DropdownItem>
                                    <DropdownItem key="account">
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem
                                        key="signup"
                                        color="danger"
                                        className="bg-danger text-white"
                                    >
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            )}
                            {!user && (
                                <DropdownMenu
                                    color={'primary'}
                                    onAction={(key) => {
                                        if (key === 'login') {
                                            redirect('/login');
                                        } else {
                                            redirect('/signup');
                                        }
                                    }}
                                >
                                    <DropdownItem
                                        color={undefined}
                                        isReadOnly
                                        key="profile"
                                        className="h-14"
                                    >
                                        <p className="font-semibold">
                                            Not Signed in
                                        </p>
                                    </DropdownItem>
                                    <DropdownItem key="login">
                                        Login
                                    </DropdownItem>
                                    <DropdownItem key="signup">
                                        Sign Up
                                    </DropdownItem>
                                </DropdownMenu>
                            )}
                        </Dropdown>
                    </div>

                    <div className=" flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="  inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                        >
                            {!isOpen && <LuAlignJustify className="text-2xl" />}
                            {isOpen && <RxCross2 className="text-2xl" />}
                        </button>
                    </div>
                </div>

                <div
                    className={`md:hidden overflow-y-hidden bg-black text-white ${
                        isOpen ? 'h-screen' : 'h-0'
                    }  w-screen bg-opacity-90 absolute top-16 z-40 transition-all duration-800`}
                >
                    <div className="px-2 pt-4 pb-3 space-y-1">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className=" block px-3 py-4 hover:text-gray-400  font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/search"
                            onClick={() => setIsOpen(false)}
                            className=" block px-3 py-4 hover:text-gray-400  font-medium"
                        >
                            Products
                        </Link>
                        {user && (
                            <>
                                <Link
                                    to="/cart"
                                    onClick={() => setIsOpen(false)}
                                    className="  block px-3 py-4 hover:text-gray-400 font-medium"
                                >
                                    Cart
                                </Link>
                                <Link
                                    to="/account"
                                    onClick={() => setIsOpen(false)}
                                    className=" block px-3 py-4 hover:text-gray-400   font-medium"
                                >
                                    Profile
                                </Link>
                                <div
                                    onClick={() => setLogout(true)}
                                    className="block px-3 py-4 cursor-pointer  text-danger font-medium"
                                >
                                    Logout
                                </div>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className=" block px-3 py-4 hover:text-gray-400   font-medium"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className=" block px-3 py-4 hover:text-gray-400   font-medium"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <LogOutModal open={logout} onClose={() => setLogout(false)} />
            <Outlet />
        </>
    );
};

export default Header;
