import { Link } from "react-router-dom"
const Header = () => {
    return (
        <div className="bg-primary text-white">
            <div className="container p-3 d-flex align-items-center justify-content-between">
                <div className="fs-5 fw-bold">
                    <Link to="/profile" className="text-white text-decoration-none">Dashboard</Link>
                </div>
                <ul className="list-unstyled d-flex align-items-center gap-5 mb-0 justify-content-around">
                    <li className="cursor-pointer"><Link to="/profile" className="text-white text-decoration-none">Profile</Link></li>
                    <li className="cursor-pointer"><Link to="/topics" className="text-white text-decoration-none">Topics</Link></li>
                    <li className="cursor-pointer"><Link to="/progress" className="text-white text-decoration-none">Progress</Link></li>
                    <li className="cursor-pointer p-2 border border-white rounded">Logout</li>

                </ul>

            </div>

        </div>
    )
}

export default Header
