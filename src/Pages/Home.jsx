import React from 'react';
import Banner from '../Components/Banner';
import FeaturedFoods from '../Components/FeaturedFoods';
import HowItWorks from '../Components/HowItWorks';
import OurMission from '../Components/OurMission';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <HowItWorks></HowItWorks>
            <OurMission></OurMission>
        </div>
    );
};

export default Home;