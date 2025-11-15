import { Link } from "react-router-dom";
import Slider from "react-slick";
import TrendingSlider from "./TrendingSlider";

//import Tooltip from "@mui/material/Tooltip";
//import { motion } from "framer-motion";
//import api from "../../lib/axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slider settings
const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
};

const brandSliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    speed: 600,
    pauseOnHover: true,
    arrows: false,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
};

export default function Home() {
    // const [trending, setTrending] = useState<Product[]>([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const { data } = await api.get("/products");
    //             setTrending(data.slice(0, 6)); // Take top 6 as trending
    //         } catch (error) {
    //             console.error("Error loading products", error);
    //         }
    //     };
    //     fetchProducts();
    // }, []);

    return (
        <div className="bg-white">

            {/* ================= HERO BANNER ================= */}
            <section className="overflow-hidden relative">
                <Slider
                    {...heroSliderSettings}
                    arrows={true}
                    nextArrow={<div className="slick-next custom-arrow right-6">›</div>}
                    prevArrow={<div className="slick-prev custom-arrow left-6">‹</div>}
                >
                    {["hero1.png", "hero2.png", "hero3.jpeg"].map((img, idx) => (
                        <div key={idx} className="relative group">
                            <img
                                src={`/${img}`}
                                alt={`Banner ${idx}`}
                                className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105"
                            />
                            {/* Optional gradient overlay to make it vibrant*/}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    ))}
                </Slider>
            </section>

            {/* ================= FEATURED BRANDS ================= */}
            <section className="py-10 bg-gradient-to-b from-white to-pink-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 tracking-wide">
                        Featured Brands
                    </h2>

                    <Slider
                        {...brandSliderSettings}
                        className="!flex items-center justify-center space-x-6"
                    >
                        {["levi", "puma", "hm", "nike", "uspa", "adidas", "peterengland", "allensolly"].map((brand) => (
                            <div
                                key={brand}
                                className="flex justify-center items-center p-4 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-200"
                            >
                                <img
                                    src={`/brands/${brand}.jpg`}
                                    onError={(e) =>
                                        ((e.target as HTMLImageElement).src = `/brands/${brand}.png`)
                                    }
                                    alt={brand}
                                    className="h-32 w-auto object-contain hover:scale-110 transition-transform duration-200"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            {/* ================= TRENDING NOW ================= */}
            <TrendingSlider />

            {/* ================= SHOP BY CATEGORY ================= */}
            <section className="py-14 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-10 tracking-wide">
                        Shop by Category
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { name: "Men", image: "/men/men1.png", link: "/men" },
                            { name: "Women", image: "/women/women3.png", link: "/women" },
                            { name: "Kids", image: "/kids/kid1.png", link: "/kids" },
                        ].map((cat) => (
                            <Link
                                key={cat.name}
                                to={cat.link}
                                className="relative rounded-2xl overflow-hidden group"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="bg-white text-gray-800 px-5 py-2 rounded-full font-semibold text-lg">
                                        Explore {cat.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= RISING STARS ================= */}
            <section className="py-14 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-10 tracking-wide">
                        Rising Stars
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {[
                            "/rising/kids1.png",
                            "/rising/kids2.png",
                            "/rising/kids3.png",
                        ].map((img, i) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={img}
                                    alt="Rising Star"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}