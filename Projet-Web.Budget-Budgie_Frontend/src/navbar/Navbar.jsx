import "react";
import { Link } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/*Ta Anh & Patrick*/
function Navbar() {
    return (
        <div className="shadow-lg">
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
                <div className="d-flex">
                    <a className="navbar-brand p-2">
                        <img src="/bird.png" style={{ height: "30px", width: "30px" }} alt="budgie logo" />
                        &nbsp; Budget Budgie
                    </a>
                    <div id="navbarText">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <Link className="nav-link" to="/Dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item" role="presentation">
                                <Link className="nav-link" to="/Budget">
                                    Budget
                                </Link>
                            </li>
                            <li className="nav-item" role="presentation">
                                <Link className="nav-link" to="/Budget/Actifs">
                                    Actifs
                                </Link>
                            </li>
                            <li className="nav-item" role="presentation">
                                <Link className="nav-link" to="/Budget/Transactions">
                                    Transactions
                                </Link>
                            </li>
                            {/* About sera déplacé hors des tabs du navbar, footer? */}
                        </ul>
                    </div>
                </div>

                <div className="d-flex flex-row-reverse">
                    <div className="btn-group dropdown-center">
                        <button className="nav-link dropdown-toggle mx-2" data-bs-toggle="dropdown" to="/UserProfile">
                            <AccountBoxIcon />
                            &emsp; Username
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="nav-link dropdown-item" to="/UserProfile">
                                    <AccountCircleIcon />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/">
                                    Log out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
