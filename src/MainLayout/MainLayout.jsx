import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Share/Footer/Footer';
import Navbar from '../components/Share/Navbar/Navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default MainLayout;