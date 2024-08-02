import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

function UserHeader(){

    const [user, setUser] = useState({})
    const navigate = useNavigate();
    
    const logout = ()=>{
        localStorage.clear()
        navigate("/")
    }

    useEffect(() => {
        let user = localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")) : null;
        if (user) {
            setUser(user)
        }
    }, [])

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <div className="" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/applyleave">Apply Leave</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/myleave">LeaveHistory</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/balance">Remaining Balance</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default UserHeader;