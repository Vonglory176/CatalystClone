import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet, useParams } from "react-router-dom"
import React, { useLayoutEffect, useState } from 'react';
import battletechLow from "../assets/page-backgrounds/battletech-page-background-low-res.webp"
import shadowrunLow from "../assets/page-backgrounds/shadowrun-page-background-low-res.webp"
import otherLow from "../assets/page-backgrounds/other-page-background-low-res.webp"
import allLow from "../assets/page-backgrounds/all-page-background-low-res.webp"

export default function MainLayout() {
    const {id} = useParams()

    const pageTheme = (
    id === "battletech"? "battletech-page" :
    id === "shadowrun"? "shadowrun-page" :
    id === "other"? "other-page" :
    id === "all"? "all-page" : ""
    )

    const backgrounds = {
        battletech: {
            high: "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fbattletech-page-background.webp?alt=media&token=de9f579b-b3da-4eed-8d2d-ec2d8d01e4f9",
            low: battletechLow
        },
        shadowrun: {
            high: "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fshadowrun-page-background.webp?alt=media&token=07b0b857-758f-4959-9923-4f567ed9ac6a",
            low: shadowrunLow
        },
        other: {
            high: "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fother-background.webp?alt=media&token=cc00694d-6c3f-4852-9f87-462f0623679e",
            low: otherLow
        },
        all: {
            high: "https://firebasestorage.googleapis.com/v0/b/catalystclonedb.appspot.com/o/page-backgrounds%2Fall-page-background.webp?alt=media&token=eb82a935-2dac-4b9a-a360-072edfda9475",
            low: allLow
        }
    }

    const [backgroundImage, setBackgroundImage] = useState({
        "--background-image-url": `url(${backgrounds[id]?.low || backgrounds.all.low})`,
        "--background-image-opacity": "0"
    })

    useLayoutEffect(() => {
        if (pageTheme) {
            const currentBackground = backgrounds[id] || backgrounds.all
            const preloadLowRes = document.createElement("link")
            preloadLowRes.rel = "preload"
            preloadLowRes.as = "image"
            preloadLowRes.href = currentBackground.low
    
            const preloadHighRes = document.createElement("link")
            preloadHighRes.rel = "preload"
            preloadHighRes.as = "image"
            preloadHighRes.href = currentBackground.high
    
            document.head.appendChild(preloadLowRes)
            document.head.appendChild(preloadHighRes)
    
            // Passive preloading for other backgrounds
            Object.keys(backgrounds).forEach(key => {
                if (key !== id) { // Skip the current background
                    const background = backgrounds[key]
                    // const preloadLowRes = document.createElement("link")
                    // preloadLowRes.rel = "preload"
                    // preloadLowRes.as = "image"
                    // preloadLowRes.href = background.low
                    // preloadLowRes.setAttribute("importance", "low") // Mark as low priority
    
                    const preloadHighRes = document.createElement("link")
                    preloadHighRes.rel = "preload"
                    preloadHighRes.as = "image"
                    preloadHighRes.href = background.high
                    preloadHighRes.setAttribute("importance", "low") // Mark as low priority
    
                    // document.head.appendChild(preloadLowRes)
                    document.head.appendChild(preloadHighRes)
                }
            })    
        }

        // Clean up
        return () => {
            document.head.querySelectorAll('link[rel="preload"][as="image"]').forEach(link => {
                document.head.removeChild(link)
            })
        }
    }, [])

    useLayoutEffect(() => {
        // const preloadImage = (src, callback) => {
        //     const img = new Image()
        //     img.onload = callback
        //     img.src = src
        // }

        const currentBackground = backgrounds[id] || backgrounds.all
        
        // // Preload low-res image first
        // preloadImage(currentBackground.low, () => {
        //     // Once low-res is loaded, set it as background
        //     setBackgroundImage({
        //         "--background-image-url": `url(${currentBackground.low})`,
        //         "--background-image-opacity": "0.8"
        //     })
        //     // Then preload high-res image
        //     preloadImage(currentBackground.high, () => {
        //         // Once high-res is loaded, update the background
                setBackgroundImage({
                    "--background-image-url": `url(${currentBackground.high})`,
                    "--background-image-opacity": "1"
                })
        //     })
        // })
    }, [id])
    
    return (
        <div className="mainLayout page">

            <Header/>

            <main className={`main-content ${pageTheme}`} style={(pageTheme && backgroundImage) || null}>

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