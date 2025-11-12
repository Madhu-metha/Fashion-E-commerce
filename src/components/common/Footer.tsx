export default function Footer() {
    return (
        <footer className="border-t border-gray-100 mt-8 bg-white">
            <div className="container py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
                {/* Column 1: Online Shopping */}
                <div>
                    <h4 className="font-semibold mb-3 text-gray-800">ONLINE SHOPPING</h4>
                    <ul className="space-y-2">
                        <li className="hover:text-pink-500 cursor-pointer">Men</li>
                        <li className="hover:text-pink-500 cursor-pointer">Women</li>
                        <li className="hover:text-pink-500 cursor-pointer">Kids</li>
                    </ul>
                </div>

                {/* Column 2: Useful Links */}
                <div>
                    <h4 className="font-semibold mb-3 text-gray-800">USEFUL LINKS</h4>
                    <ul className="space-y-2">
                        <li className="hover:text-pink-500 cursor-pointer">Contact Us</li>
                        <li className="hover:text-pink-500 cursor-pointer">FAQ</li>
                        <li className="hover:text-pink-500 cursor-pointer">Shipping</li>
                        <li className="hover:text-pink-500 cursor-pointer">Returns</li>
                    </ul>
                </div>

                {/* Column 3: Keep in Touch */}
                <div>
                    <h4 className="font-semibold mb-3 text-gray-800">KEEP IN TOUCH</h4>
                    <p>hello@fashkart.com</p>
                    <p className="mt-2">
                        © {new Date().getFullYear()} <span className="text-pink-500 font-semibold">Aurena</span>
                    </p>
                </div>

                {/* Column 4: App Info */}
                <div>
                    <h4 className="font-semibold mb-3 text-gray-800">APP</h4>
                    <p>Get our app on Android & iOS</p>
                    <div className="flex gap-3 mt-3">
                        <div className="bg-gray-100 px-3 py-2 rounded-xl text-xs cursor-pointer hover:bg-pink-50 transition">
                            Google Play
                        </div>
                        <div className="bg-gray-100 px-3 py-2 rounded-xl text-xs cursor-pointer hover:bg-pink-50 transition">
                            App Store
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
