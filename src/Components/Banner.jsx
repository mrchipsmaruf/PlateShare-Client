import React from "react";
import { Link } from "react-router";
import bannerImage from '../assets/banner-food.jpg'

const Banner = () => {
    return (
        <section className="bg-orange-50 py-16">
            <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">

                <div className="text-center lg:text-left space-y-5 flex-1">
                    <h1 className="text-4xl sm:text-5xl font-bold text-red-500">
                        Share Food, <span className="text-yellow-500">Spread Kindness</span>
                    </h1>

                    <p className="text-gray-600 max-w-lg mx-auto lg:mx-0">
                        PlateShare connects people who have extra food with those who need it.
                        Donate your surplus meals or find available food near you — every plate counts!
                    </p>

                    <div className="flex justify-center lg:justify-start">
                        <Link to="/available-foods">
                            <button className="bg-red-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
                                🍽️ View All Foods
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex-1 flex justify-center">
                    <img 
                        src={bannerImage}
                        alt="People sharing food"
                        className="rounded-2xl shadow-lg w-full max-w-md object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;
