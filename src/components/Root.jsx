import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import "../App.css"

function Root() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollToTop/>
        </>
    )
}

export default Root