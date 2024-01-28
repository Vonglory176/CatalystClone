import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useParams } from "react-router-dom";

export default function MainLayout() {
    const {id} = useParams()
    // console.log(id)

    const pageTheme = (
    id === "battletech"? "battletech-page" :
    id === "shadowrun"? "shadowrun-page" :
    id === "other"? "other-page" :
    id === "all"? "all-page" : ""
    )

    return (
        <div className="mainLayout page">

            <Header/>

            <main className={`main-content ${pageTheme}`}>

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