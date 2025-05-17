import "react";
import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";

/*Ta Anh*/
function UserProfile({app}) {

    useEffect(() => {
        app.loadUser();
    }, []);

  return (
    <div>
      <Navbar />
      <h2 className="mt-5">My account</h2>

            <div className="card">
                <div className="card-header">
                    User name
                </div>
                <div className="card-body centering">
                    
                    <input readOnly type="username" style={{ fontWeight: 'bold' }} className="form-control" aria-label="username" placeholder="username" value={app.user.username} />
                    <button>Change username</button>
                </div>
                <div className="card-header">
                    First name
                </div>
                <div className="card-body centering">
                    <input readOnly type="firstname" style={{ fontWeight: 'bold' }} className="form-control" aria-label="firstname" placeholder="firstname" value={app.user.prenom} />
                    <button>Change firstname</button>
                </div>
                <div className="card-header">
                    Last name
                </div>
                <div className="card-body centering">
                        <input type="lastname" readOnly style={{ fontWeight: 'bold' }} className="form-control" aria-label="lastname" placeholder="lastname" value={app.user.nom} />
                    <button>Change lastname</button>
                </div>
                <div className="card-header">
                    Email
                </div>
                <div className="card-body centering">
                    <input readOnly type="email" style={{ fontWeight: 'bold' }} className="form-control" aria-label="email" placeholder="email" value={app.user.courriel} />
                    <button>Change email</button>
                </div>
                <div className="card-header">
                    Password
                </div>
                <div className="card-body centering">
                    <input type="password" style={{ fontWeight: 'bold' }} className="form-control" aria-label="password" placeholder="password" value={app.user.mdp} />
                    <button>Change password</button>
                </div>
            </div>

        </div>
    );
}

export default UserProfile;
