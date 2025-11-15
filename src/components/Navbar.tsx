import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const [openMenu, setOpenMenu] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
            <div className="container flex items-center justify-between py-3">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-pink-500">
                    Aurena
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
                    {["/", "/men", "/women", "/kids"].map((path, i) => {
                        const labels = ["HOME", "MEN", "WOMEN", "KIDS"];
                        return (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-pink-500"
                                        : "text-gray-700 hover:text-pink-500"
                                }
                            >
                                {labels[i]}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                        <SearchIcon fontSize="small" />
                        <input
                            className="bg-transparent outline-none text-sm"
                            placeholder="Search for products and brands"
                        />
                    </div>

                    {/* Cart */}
                    <div className="relative">
                        <Link
                            to="/cart"
                            className="p-2 rounded-full hover:bg-gray-100 transition relative"
                        >
                            <ShoppingBagIcon />

                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Wishlist */}
                    <Link
                        to="/wishlist"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <FavoriteBorderIcon />
                    </Link>

                    {/* Auth */}
                    {!user ? (
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 bg-pink-500 text-white rounded-lg"
                        >
                            Login
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                className="p-2 hover:bg-gray-100 rounded-full"
                                onClick={() => setOpenMenu(!openMenu)}
                            >
                                <AccountCircleIcon fontSize="large" />
                            </button>

                            {/* Dropdown */}
                            {openMenu && (
                                <div
                                    className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-3 border"
                                >
                                    <p className="px-4 text-sm text-gray-700">
                                        {user.email}
                                    </p>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setOpenMenu(false);
                                        }}
                                        className="mt-2 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}


// import { Link, NavLink } from "react-router-dom";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import SearchIcon from "@mui/icons-material/Search";

// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/useAuth";

// export default function Navbar() {
//     const { cartCount } = useCart();
//     const { user, logout } = useAuth();


//     return (
//         <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
//             <div className="container flex items-center justify-between py-3">
//                 {/* Logo */}
//                 <Link to="/" className="text-2xl font-bold text-pink-500">
//                     Aurena
//                 </Link>

//                 {/* Navigation Links */}
//                 <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
//                     <NavLink
//                         to="/"
//                         className={({ isActive }) =>
//                             isActive ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
//                         }
//                     >
//                         HOME
//                     </NavLink>
//                     <NavLink
//                         to="/men"
//                         className={({ isActive }) =>
//                             isActive ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
//                         }
//                     >
//                         MEN
//                     </NavLink>
//                     <NavLink
//                         to="/women"
//                         className={({ isActive }) =>
//                             isActive ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
//                         }
//                     >
//                         WOMEN
//                     </NavLink>
//                     <NavLink
//                         to="/kids"
//                         className={({ isActive }) =>
//                             isActive ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
//                         }
//                     >
//                         KIDS
//                     </NavLink>
//                 </nav>

//                 {/* Icons and Search */}
//                 <div className="flex items-center gap-2">
//                     {/* Search bar (visible on md+) */}
//                     <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
//                         <SearchIcon fontSize="small" />
//                         <input
//                             className="bg-transparent outline-none text-sm"
//                             placeholder="Search for products and brands"
//                         />
//                     </div>

//                     {/* Cart & Wishlist */}
//                     <div className="relative">
//                         <Link
//                             to="/cart"
//                             className="p-2 rounded-full hover:bg-gray-100 transition"
//                         >
//                             <ShoppingBagIcon />
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold rounded-full shadow-md w-5 h-5 flex items-center justify-center">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </Link>
//                     </div>

//                     <Link
//                         to="/wishlist"
//                         className="p-2 rounded-full hover:bg-gray-100 transition"
//                     >
//                         <FavoriteBorderIcon />
//                     </Link>

//                     {/* Auth Buttons */}
//                     {!user ? (
//                         <button
//                             onClick={() => navigate("/login")}
//                             className="px-4 py-2 bg-pink-500 text-white rounded-lg"
//                         >
//                             Login
//                         </button>
//                     ) : (
//                         <div className="relative group">
//                             <img
//                                 src="/profile-icon.png"
//                                 alt="Profile"
//                                 className="w-8 h-8 rounded-full cursor-pointer"
//                             />
//                             {/* Dropdown */}
//                             <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 p-3 rounded-md">
//                                 <p className="text-sm">{user.email}</p>
//                                 <button
//                                     onClick={logout}
//                                     className="text-red-500 mt-2 text-sm"
//                                 >
//                                     Logout
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* <Link to="/login" className="btn-primary text-sm">
//                         Login
//                     </Link> */}
//                 </div>
//             </div>
//         </header>
//     );
// }
