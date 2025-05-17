import "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
function Inscription() {

    const [user, setUser] = useState({
        username: "",
        nom: "",
        prenom: "",
        courriel: "",
        mdp: ""
    });

    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);

    /*Ta Anh*/
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    /*Ta Anh*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const registerResponse = await axios.post(`http://${}/api/user/createUser`, user);
            if (registerResponse.data) {
                setSuccess(true);
                navigate("/Login");
            } else {
                console.log("Error failed")
            }
        } catch (error) {
            console.error("Error:", error);

        }
    }

    return (
        <div className="mt-5">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="box items">
                    <label htmlFor="username">
                        <b>Username</b>
                    </label>
                    <input name="username" className="input" type="text" placeholder="Entrer Username" required value={user.username}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="firstname">
                        <b>Firstname</b>
                    </label>
                    <input name="nom" className="input" type="text" placeholder="Entrer Firstname" required value={user.nom}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="lastname">
                        <b>Lastname</b>
                    </label>
                    <input name="prenom" className="input" type="text" placeholder="Entrer Lastname" value={user.prenom} required
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="courriel">
                        <b>Courriel</b>
                    </label>
                    <input pattern="^[a-zA-Z0-9]+@gmail\.com$" name="courriel" className="input" type="text" placeholder="Entrer courriel" value={user.courriel} required
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="password">
                        <b>Password</b>
                    </label>
                    <input name="mdp" className="input" type="text" minLength="10" placeholder="Entrer password" value={user.mdp} required
                        onChange={handleChange}
                    ></input>
                    <div className="pad">
                        <button id="register" type="submit" className="registerbtn">
                            Register
                        </button>
                    </div>
                </div>
                <div className="container">
                    <p>
                        Already have an account? <Link to="/Login">Sign In</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Inscription;
