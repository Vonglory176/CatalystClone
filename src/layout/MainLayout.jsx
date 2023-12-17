import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="mainLayout page">

            <Header/>

            <main className="main-content">

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