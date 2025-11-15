export default function Banner() {
    return (
        <section className="container mb-10">
            <div className="relative rounded-2xl overflow-hidden shadow-sm">
                {/* Banner Image */}
                <img
                    src="/hero2.png"
                    alt="Hero"
                    className="w-full h-full md:h-96 object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center">
                    <div className="px-6 md:px-12 text-white space-y-3">
                        <div className="inline-block bg-white text-black rounded-xl px-4 py-2 text-sm font-semibold">
                            FLAT ₹300 OFF + Free Shipping
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold max-w-xl leading-tight">
                            Refresh Your Wardrobe with the Latest Fashion Trends
                        </h2>
                        <p className="text-white/90 text-sm md:text-base">
                            Use code: <span className="font-semibold">FASH300</span> on your
                            first order!
                        </p>
                        <button className="btn-primary mt-2">Shop Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
