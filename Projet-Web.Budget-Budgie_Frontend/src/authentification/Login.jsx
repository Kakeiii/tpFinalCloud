import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/*Ta Anh*/
const Login = ({ app }) => {

    const navigate = useNavigate()
    const API_URL = import.meta.env.API_URL || ""
    /*Ta Anh*/
    const handleChange = async (e) => {
        app.setUser({ ...app.user, [e.target.name]: e.target.value });
    };

    /*Ta Anh*/
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://${API_URL}:8888/api/user/signin/${app.user.username}/${app.user.mdp}`
            );
            if (response.data) {
                app.setAuth(true)
                navigate("/Dashboard");
            } else {
                app.setError(true);
            }
        } catch (err) {
            console.error("Login failed", err);
            app.setError(true);
        }
    };

    return (
        <div className="mt-5">
            <h2>Login</h2>
            <div className="box items">
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">
                        <b>Username</b>
                    </label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Entrer Username"
                        name="username"
                        onChange={handleChange}

                    ></input>
                    <label htmlFor="password">
                        <b>Password</b>
                    </label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Entrer Password"
                        name="mdp"
                        onChange={handleChange}
                    ></input>
                    <button id="login-button" type="submit">Login</button>
                </form>
                {app.error && <p style={{ color: "red" }}>Invalid credentials</p>}
            </div>
            <div className="container">
                <p>
                    Don't have an account? <Link to="/Inscription">Sign Up</Link>
                </p>
            </div>

        </div>
    );
};

export default Login;
