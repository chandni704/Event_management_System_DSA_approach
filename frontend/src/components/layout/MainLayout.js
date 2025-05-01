import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import Footer from './Footer.js';

const MainLayout = () => {
    return (
        <div className="main-layout">
            <NavigationBar />
            <div style={{ minHeight: 'calc(100vh - 140px)' }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
