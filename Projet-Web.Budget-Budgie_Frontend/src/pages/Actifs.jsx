import {useState, useEffect} from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';

function Actifs() {

    const [actifs, setActifs] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const addActif = {
        Bancaire: "http://10.10.2.127:8888/api/actifs/addActif/Bancaire",
        Credit: "http://10.10.2.127:8888/api/actifs/addActif/Credit",
        Divers: "http://10.10.2.127:8888/api/actifs/addActif/Divers",
        Epargnes: "http://10.10.2.127:8888/api/actifs/addActif/Epargnes",
        Prets: "http://10.10.2.127:8888/api/actifs/addActif/Prets"
    };

    /*Patrick*/
    const loadActifs = async () => {
        try {
            const result = await axios.get("http://10.10.2.127:8888/api/actifs/getActifs");
            setActifs(result.data);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        loadActifs();
    }, []);

    /*Patrick*/
    const addNewActif = async (e, url) => {
        e.preventDefault();
        try {
            await axios.post(url);
            loadActifs();
        }
        catch (error) {
            console.error("Error: ", error)
        }
    }

    /*Patrick*/
    // Un cas de "Don't Repeat Yourself" à appliquer ici... 🤔💭
    const handleChange = (actifId, prop, val) => {
        setIsFocus(true);
        try {
            if (prop === 'montant') {
                if (/^-?[0-9]*\.?[0-9]{0,2}$/.test(val)) {
                    setActifs((actifs) =>
                        actifs.map((actif) =>
                            actif.id === actifId ? {...actif, [prop]: val} : actif
                        )
                    );
                }
            }
            else {
                setActifs((actifs) =>
                    actifs.map((actif) =>
                        actif.id === actifId ? {...actif, [prop]: val} : actif
                    )
                );
            }
        }
        catch (error) {
            console.error("Error: ", error)
        }
    };

    /*Patrick*/
    const handleBlur = async (actifId, prop, val) => {
        try {
            if (prop === 'montant') {
                await axios.put(`http://10.10.2.127:8888/api/actifs/modActifTotal/${actifId}`, { [prop]: parseFloat(val) });
            }
            else {
                await axios.put(`http://10.10.2.127:8888/api/actifs/modActifNom/${actifId}`, { [prop]: val });
            }
            setIsFocus(false);
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }

    /*Patrick*/
    const deleteActif = async (e, actifId) => {
        e.preventDefault();
        if (confirm("Êtes-vous sûr de vouloir supprimer cet actif?")) {
            try {
                await axios.delete(`http://10.10.2.127:8888/api/actifs/deleteActif/${actifId}`);
                loadActifs();
            }
            catch (error) {
                console.error("Error: ", error)
            }
        }
    }

    /*Patrick*/
    const mappedInputForms = (data, i, placeholder) => {
        return (
            <div className="input-group mb-3" style={{maxWidth: '400px', maxHeight: '35px'}} key={i}>
                <input type="text" name="nom" className="form-control" title="Modifier le nom"
                       style={{minWidth: '100px', backgroundColor: '#e9ecef', borderColor: '#ced4da'}}
                       placeholder={placeholder}
                       value={data.nom}
                       onChange={(e) =>
                           handleChange(data.id, 'nom', e.target.value)}
                       onBlur={() =>
                           handleBlur(data.id, 'nom', data.nom)}
                />
                <input type="text" name="montant" className="form-control" style={{minWidth: '120px', textAlign: 'right'}} title="Modifier le montant"
                       value={isFocus ? data.montant : parseFloat(data.montant).toFixed(2)}
                       onChange={(e) =>
                           handleChange(data.id, 'montant', e.target.value)}
                       onBlur={() =>
                           handleBlur(data.id, 'montant', data.montant)}
                       onFocus={(e) => e.target.select()}
                />
                <span className="input-group-text" style={{width: '35px'}}>$</span>

                <form onSubmit={(e) => deleteActif(e, data.id)}
                      style={{
                        textAlign: 'center',
                        borderRadius: '10px'
                }}>
                    <button type="submit" style={{fontWeight: 'bold'}} id="deleteButton" title="Supprimer l'actif">X</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="my-5">

                <h2 className="mt-5">Actifs</h2>
                <div className="mt-5">
                    <div className="row">
                        <div className="col my-5">
                            <h3 className="text-center">Comptes bancaires</h3>
                            {
                                actifs.map((data, i) => (
                                    data.type === "Bancaire"
                                        ? mappedInputForms(data, i, "Banque")
                                        : null
                                ))
                            }
                            <form method="post" onSubmit={(e) => addNewActif(e, addActif.Bancaire)}>
                                <button type="submit" title="Ajouter un actif">+ Ajouter</button>
                            </form>
                        </div>

                        <div className="col my-5">
                            <h3 className="text-center">Cartes de crédits</h3>
                            {
                                actifs.map((data, i) => (
                                    data.type === "Credit"
                                        ? mappedInputForms(data, i, "Credit")
                                        : null
                                ))
                            }
                            <form method="post" onSubmit={(e) => addNewActif(e, addActif.Credit)}>
                                <button type="submit" title="Ajouter une carte de crédit">+ Ajouter</button>
                            </form>
                        </div>

                        <div className="col my-5">
                            <h3 className="text-center">Divers</h3>
                            {
                                actifs.map((data, i) => (
                                    data.type === "Divers"
                                        ? mappedInputForms(data, i, "Autre source")
                                        : null
                                ))
                            }
                            <form method="post" onSubmit={(e) => addNewActif(e, addActif.Divers)}>
                                <button type="submit" title="Ajouter une source diverse">+ Ajouter</button>
                            </form>
                        </div>

                        <hr/>

                        <h2>Prêts</h2>
                        <div className="row">
                            <div className="col my-5">
                                {
                                    actifs.map((data, i) => (
                                        data.type === "Prets"
                                            ? mappedInputForms(data, i, "Prêts")
                                            : null
                                    ))
                                }
                                <form method="post" onSubmit={(e) => addNewActif(e, addActif.Prets)}>
                                    <button type="submit" title="Ajouter une dette">+ Ajouter</button>
                                </form>
                            </div>
                        </div>

                        <hr/>

                        <h2>Épargnes</h2>
                        <div className="row">
                            <div className="col my-5">
                                {
                                    actifs.map((data, i) => (
                                        data.type === "Epargnes"
                                            ? mappedInputForms(data, i, "Compte épargnes")
                                            : null
                                    ))
                                }
                                <form method="post" onSubmit={(e) => addNewActif(e, addActif.Epargnes)}>
                                    <button type="submit" title="Ajouter des économies">+ Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Actifs;