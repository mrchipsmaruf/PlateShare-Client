import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from '../Components/Banner';
import FeaturedFoods from '../Components/FeaturedFoods';
import HowItWorks from '../Components/HowItWorks';
import OurMission from '../Components/OurMission';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            offset: 120,   
            once: true, 
        });
    }, []);

    return (
        <div>
            <div data-aos="fade-down">
                <Banner />
            </div>

            <div data-aos="fade-up">
                <FeaturedFoods />
            </div>

            <div data-aos="fade-right">
                <HowItWorks />
            </div>

            <div data-aos="fade-left">
                <OurMission />
            </div>
        </div>
    );
};

export default Home;
