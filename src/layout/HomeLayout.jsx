import Header from "../components/Header"
import Slideshow from "../components/Slideshow"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import homeLow from "../assets/page-backgrounds/home-page-background-low-res.webp"
import { useEffect } from "react"

export default function HomeLayout() {

    const pageBackground = {
        high: "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fhome-page-background.webp?alt=media&token=dbe42bd8-08b6-45fc-a465-0ab9da56c102", 
        low: homeLow
    }

    useEffect(() => {
        // Preload low-resolution background
        const low = new Image();
        low.src = pageBackground.low
        // const high = new Image();
        // high.src = pageBackground.high
    }, [])
    
    useEffect(() => {
        const highResBackground = pageBackground.high
        const lowResBackground = pageBackground.low

        document.querySelector(".main-content").style.setProperty("background-image", `url(${lowResBackground})`)
        
        const img = new Image()
        img.onload = () => {
            const element = document.querySelector(".main-content")
            element.style.setProperty("--background-image-url", `url(${highResBackground})`)
            element.style.setProperty("--background-image-opacity", "1")
        }
        img.src = highResBackground
    }, [])

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