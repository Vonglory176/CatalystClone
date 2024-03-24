import Header from "../components/Header"
import Slideshow from "../components/Slideshow"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import homeLow from "../assets/page-backgrounds/home-page-background-low-res.webp"
import { useState, useLayoutEffect } from "react"

export default function HomeLayout() {

    const pageBackgroundUrls = {
        high: "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fhome-page-background.webp?alt=media&token=dbe42bd8-08b6-45fc-a465-0ab9da56c102", 
        low: homeLow
    }

    const [backgroundImage, setBackgroundImage] = useState({
        "--background-image-url": `url()`,
        // "--background-image-opacity": "1"
    })

    useLayoutEffect(() => {
        const preloadImage = (src, callback) => {
            const img = new Image()
            img.onload = callback
            img.src = src
        }
        
        // Preload low-res image first
        preloadImage(pageBackgroundUrls.low, () => {
            // Once low-res is loaded, set it as background
            setBackgroundImage({
                backgroundImage: `url(${pageBackgroundUrls.low})`,
                "--background-image-opacity": "0.8"
            })
            // Then preload high-res image
            preloadImage(pageBackgroundUrls.high, () => {
                // Once high-res is loaded, update the background
                setBackgroundImage({
                    "--background-image-url": `url(${pageBackgroundUrls.high})`,
                    "--background-image-opacity": "1"
                })
            })
        })
    }, [])

    return (
        <div className="homeLayout page">

            <Header/>

            <main className="main-content" style={backgroundImage}>

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