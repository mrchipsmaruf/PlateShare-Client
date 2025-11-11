import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const HomeLayouts = () => {
    return (
        <div>
            <header className='w-11/12 mx-auto my-3'>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayouts;