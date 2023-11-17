import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

const Layout = () => {

    return (
        <> <div className="flex flex-col h-screen justify-between">
            <Header />
            <Outlet />
            <Footer />
        </div>
        </>
    );
};

export default Layout;