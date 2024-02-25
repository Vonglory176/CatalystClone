import loaderGif from "/src/assets/loader-large.gif"

export default function LoadingScreen() {

return ( 
    <div className="loading-screen"> {/* Styling is in index.scss */}
        <img src={loaderGif} className="loading-gif" alt="Loading..."/>
    </div>
    )
}