import Header from "../components/Header"
import Slideshow from "../components/Slideshow"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function HomeLayout() {
    return (
        <div className="homeLayout page">

            <Header/>

            <main className="main-content">

                <Slideshow/>

                <div className="divider"></div>

                <div className="main-content-container">

                    <div className="main-content-wrapper">

                        <div className="page-width">
                                
                                <Outlet/>
                                
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}