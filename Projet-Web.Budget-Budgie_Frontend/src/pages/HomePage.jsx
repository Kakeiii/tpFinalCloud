import 'react';
import { Link } from "react-router-dom";

/*Ta Anh*/
function HomePage()  {

    return (
        <div className="mt-5">
            <h1>HomePage</h1>
            <Link className="nav-link active" to="/Inscription">
                  Inscription
                </Link>
                <Link className="nav-link active" to="/Login">
                  Login
                </Link>
            <Link className='nav-link active' to="/About">
            About
            </Link>
        </div>
    )
}

export default HomePage;