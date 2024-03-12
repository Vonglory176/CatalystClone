import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet, useParams } from "react-router-dom"
import { useEffect } from "react"
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

    useEffect(() => {
        // Preload all background images
        if (pageTheme !== "") {
            Object.keys(backgrounds).forEach(key => {
                const low = new Image();
                low.src = backgrounds[key].low

                if (key === id) {
                    const high = new Image();
                    high.src = backgrounds[key].high
                }
            })
        }
        else {
            const element = document.querySelector(".main-content")
            // element.style.setProperty("background", `#f3f3f3`)
            try {
                
                element.style.setProperty("background-image", "none")
                element.style.setProperty("--background-image-url", "url('')")
                element.style.setProperty("--background-image-opacity", "0")
            } catch (error) {
                console.error(error)
            }
        }
    }, [pageTheme])
    
    useEffect(() => {
        if (backgrounds[id]) {
            const highResBackground = backgrounds[id].high || backgrounds.all.high // Fallback to 'all' if id doesn't match
            const lowResBackground = backgrounds[id].low || backgrounds.all.low // Fallback to 'all' if id doesn't match
    
            document.querySelector(`.${pageTheme}`).style.setProperty("background-image", `url(${lowResBackground})`)
            
            const img = new Image()
            img.onload = () => {
                const element = document.querySelector(`.${pageTheme}`)
                element.style.setProperty("--background-image-url", `url(${highResBackground})`)
                element.style.setProperty("--background-image-opacity", "1")
            }
            img.src = highResBackground
    
            // if(img.complete) {
            //     console.log("Image already loaded or cached, setting src now.");
            //     setSrc(highResBackground);
            // }        
        }
    }, [id])

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