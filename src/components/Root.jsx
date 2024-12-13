import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'
import ScrollToTop from '../components/ScrollToTop'
import "../App.css"
import SpinComponent from './Spinner/SpinComponent'

function Root() {
    const originalConsoleError = console.error;

    console.error = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('validateDOMNesting')) {
            return;
        }
        originalConsoleError(...args);
    };

    return (
        <>
            <SpinComponent />
            <Header />
            <Outlet />
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default Root