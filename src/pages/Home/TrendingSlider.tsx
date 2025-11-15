import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const trendingData = [
    {
        id: 1,
        img: "/products/dress1.png",
        title: "Trendy Western Wear",
        offer: "MIN. 30% OFF",
    },
    {
        id: 2,
        img: "/products/men1.png",
        title: "Bestselling Casuals",
        offer: "MIN. 40% OFF",
    },
    {
        id: 3,
        img: "/products/kid1.png",
        title: "Trendy Looks for Tiny Stars",
        offer: "FLAT 65% OFF",
    },
    {
        id: 4,
        img: "/products/kid2.png",
        title: "Little Fashionistas",
        offer: "MIN. 85% OFF",
    },
    {
        id: 5,
        img: "/products/women3.png",
        title: "Elegant Ethnic Styles",
        offer: "UNDER ₹1599",
    },
    {
        id: 6,
        img: "/products/women4.png",
        title: "Elegant Party Wears",
        offer: "MIN. 70% OFF",
    },
    {
        id: 7,
        img: "/products/men2.png",
        title: "Stylish Formals",
        offer: "MIN. 30% OFF",
    },
    {
        id: 8,
        img: "/products/men16.png",
        title: "Sherwanis & Kurtas",
        offer: "Starts from ₹1999",
    },
];

export default function TrendingSlider() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);

    const scrollAmount = 300; // pixels per slide

    // Auto-scroll every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!sliderRef.current) return;

            sliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });

            setPage((prev) => (prev + 1) % trendingData.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const scrollLeft = () => {
        sliderRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };

    const scrollRight = () => {
        sliderRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Medal Worthy Brands to Bag
            </h2>

            <div className="relative">

                {/* LEFT BUTTON */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hidden md:block"
                >
                    {"<"}
                </button>

                {/* SLIDER */}
                <div
                    ref={sliderRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-2"
                >
                    {trendingData.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            className="min-w-[260px] cursor-pointer"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-[300px] h-[250px] rounded-lg object-cover object-top"
                            />
                            <p className="font-semibold mt-2">{item.title}</p>
                            <p className="text-sm text-pink-600 font-bold">{item.offer}</p>
                        </motion.div>
                    ))}
                </div>

                {/* RIGHT BUTTON */}
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hidden md:block"
                >
                    {">"}
                </button>
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-2 mt-4">
                {Array(3)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${page === i ? "bg-black" : "bg-gray-400"
                                }`}
                        ></div>
                    ))}
            </div>
        </div>
    );
}