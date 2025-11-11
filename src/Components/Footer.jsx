import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-orange-100 py-6 mt-16">
            <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="PlateShare" className="w-10" />
                    <h2 className="text-xl font-semibold text-orange-700">PlateShare</h2>
                </div>

                <p className="text-gray-600 text-sm mt-3 md:mt-0">
                    © {new Date().getFullYear()} PlateShare. All rights reserved.
                </p>

                <div className="flex gap-4 mt-3 md:mt-0">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-facebook text-2xl text-orange-600 hover:text-orange-700"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-twitter text-2xl text-orange-600 hover:text-orange-700"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-instagram text-2xl text-orange-600 hover:text-orange-700"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
