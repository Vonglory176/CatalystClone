import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div id="NotFound-Container">
            <h1>PAGE NOT FOUND</h1>
            <p className="notFound__message">The page you requested does not exist.</p>
            <hr />
            <p className="notFound__continue">
                <Link to={"/collections/all"} className={"btn"} title="View all products">Continue shopping</Link> {/* Note "All" */}
            </p>
        </div>
    )
}