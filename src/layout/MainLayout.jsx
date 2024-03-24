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
        // "--background-image-opacity": "1"
    })

    useLayoutEffect(() => {
        const preloadImage = (src, callback) => {
            const img = new Image()
            img.onload = callback
            img.src = src
        }

        const currentBackground = backgrounds[id] || backgrounds.all
        
        // Preload low-res image first
        preloadImage(currentBackground.low, () => {
            // Once low-res is loaded, set it as background
            setBackgroundImage({
                "--background-image-url": `url(${currentBackground.low})`,
                "--background-image-opacity": "0.8"
            })
            // Then preload high-res image
            preloadImage(currentBackground.high, () => {
                // Once high-res is loaded, update the background
                setBackgroundImage({
                    "--background-image-url": `url(${currentBackground.high})`,
                    "--background-image-opacity": "1"
                })
            })
        })
    }, [id]) // This effect runs on mount and whenever `id` changes
    
    return (
        <div className="mainLayout page">

            <Header/>

            <main className={`main-content ${pageTheme}`} style={backgroundImage}>

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

// const mainContentStyle = {
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundSize: 'cover', // Example property, adjust as needed
// }

// useLayoutEffect(() => {
//         console.log("Setting background!")

//         const currentPageTheme = (
//             id === "battletech"? "battletech-page" :
//             id === "shadowrun"? "shadowrun-page" :
//             id === "other"? "other-page" :
//             id === "all"? "all-page" : ""
//         )
//         setPageTheme(currentPageTheme)

//         const pageBackground = document.querySelector(".main-content")
//         // pageBackground.style.setProperty("background-image", "none")
//         pageBackground.style.setProperty("--background-image-url", "url('')")
//         pageBackground.style.setProperty("--background-image-opacity", "0")

//         console.log("id changed")
//         const lowResImage = new Image()
//         lowResImage.src = backgrounds[id].low || backgrounds.all.low // Fallback to 'all' if id doesn't match
        
//         const highResImage = new Image()
//         highResImage.src = backgrounds[id].high || backgrounds.all.high // Fallback to 'all' if id doesn't match

//         lowResImage.onload = () => {
//             console.log("lowResImage loaded")
            
//             if(!highResImage.complete && currentPageTheme === pageTheme) { //!highResImage.complete
//                 pageBackground.style.setProperty("background-image", `url(${lowResImage.src})`)
//             }
//         }            
//         highResImage.onload = () => {
//             if(currentPageTheme === pageTheme) {
//                 pageBackground.style.setProperty("--background-image-opacity", "1")
//                 pageBackground.style.setProperty("--background-image-url", `url(${highResImage.src})`)
//             }
//         }


//         document.querySelector(`.${pageTheme}`).style.setProperty("background-image", `url(${lowResBackground})`)

//         document.querySelector(`.${pageTheme}`).style.setProperty("background-image", `url(${lowResBackground})`)
        

//         // if(img.complete) {
//         //     console.log("Image already loaded or cached, setting src now.");
//         //     setSrc(highResBackground);
//         // }        
//     // }
// }, [id])