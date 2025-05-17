import 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Inscription from './authentification/Inscription';
import UserProfile from './pages/UserProfile';
import Actifs from './pages/Actifs';
import Chansons from './pages/Chansons';
import NotFound from './pages/NotFound';
import Footer from './navbar/Footer';
import About from './pages/About';
import Budget from './pages/Budget';
import Login from './authentification/Login';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import TransactionsDev from "./pages/Transactions.jsx";
import axios from 'axios';
import Transactions from "./pages/Transactions.jsx";

function App() {

    /*Ta Anh*/
    const API_URL = import.meta.env.API_URL || ""
    const [auth, setAuth] = useState(false);
    const [actifs, setActifs] = useState([]);
    const [valeurNette, setValeurNette] = useState([]);
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        id: "",
        username: "",
        nom: "",
        prenom: "",
        courriel: "",
        mdp: ""
    });

    /*Ta Anh*/
    const app = {
        auth: auth,
        setAuth: setAuth,
        actifs: actifs,
        setActifs: setActifs,
        valeurNette: valeurNette,
        setValeurNette: setValeurNette,
        user: user,
        setUser: setUser,
        error: error,
        setError: setError,

        /*Ta Anh*/
        async loadActifs() {
            const result = await axios.get(`http://${API_URL}:8888/api/actifs/getActifs`);
            app.setActifs(result.data);
        },
        async loadValeurNette() {
            const result = await axios.get(`http://${API_URL}:8888/api/actifs/getValeurNette`);
            app.setValeurNette(result.data);
        },
        async loadUser() {
            const result = await axios.get(`http://${API_URL}:8888/api/user/viewUser/1`)
            app.setUser(result.data)
        },

    }
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/Dashboard' element={<Dashboard app={app} />} />
                    <Route path='/UserProfile' element={<UserProfile app={app} />} />
                    <Route path='/Budget' element={<Budget />} />
                    <Route path='/Budget/Actifs' element={<Actifs />} />
                    <Route path='/Budget/Transactions' element={<Transactions />} />
                    <Route path='/Budget/TransactionsDev' element={<TransactionsDev />} />
                    <Route path='/Chansons' element={<Chansons />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/Inscription' element={<Inscription />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/' element={<HomePage />} />
                    <Route path='/Login' element={<Login app={app} />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;