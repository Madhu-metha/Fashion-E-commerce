import { Link, NavLink } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
            <div className="container flex items-center justify-between py-3">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-pink-500">
                    Aurena
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
                        }
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        to="/men"
                        className={({ isActive }) =>
                            isActive ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
                        }
                    >
                        MEN
                    </NavLink>
                    <NavLink
                        to="/women"
                        className={({ isActive }) =>
                            isActive ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
                        }
                    >
                        WOMEN
                    </NavLink>
                    <NavLink
                        to="/kids"
                        className={({ isActive }) =>
                            isActive ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
                        }
                    >
                        KIDS
                    </NavLink>
                </nav>

                {/* Icons and Search */}
                <div className="flex items-center gap-2">
                    {/* Search bar (visible on md+) */}
                    <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                        <SearchIcon fontSize="small" />
                        <input
                            className="bg-transparent outline-none text-sm"
                            placeholder="Search for products and brands"
                        />
                    </div>

                    {/* Cart & Wishlist */}
                    <Link
                        to="/cart"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <ShoppingBagIcon />
                    </Link>
                    <Link
                        to="/wishlist"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <FavoriteBorderIcon />
                    </Link>


                    {/* Auth Buttons */}
                    <Link to="/login" className="btn-primary text-sm">
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
}
