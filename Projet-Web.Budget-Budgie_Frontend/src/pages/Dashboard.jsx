import 'react';
import Chart from '../charts/Chart';
import Navbar from '../navbar/Navbar';
import {useEffect, useState} from "react";
import axios from "axios";
import Jour from "../time/Jour.jsx";

/*Ta Anh & Patrick*/
function Dashboard({app}) {

    const mois = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ]

    const moisActuel = new Date().getMonth();
    const anneeActuelle = new Date().getFullYear();


    useEffect(() => {
        app.loadActifs();
        app.loadValeurNette();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="my-5">
                <h2 className="mt-5">Dashboard</h2>
                <h3 className="text-center"><Jour /></h3>
                <div>
                    <div className="container">
                        <div className="row">

                    {/* Colonne d'aperçu des actifs */}
                    <div className="accordion col border-end" id="accordionPanelsStayOpenExample">
                        {/* Refaire les accordéons et les listes avec mapping */}
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Comptes
                            </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                <div className="accordion-body">
                                    {
                                        app.actifs.map((data, i) => (
                                            (data.type === "Bancaire"
                                                || data.type === "Credit"
                                                || data.type === "Divers")
                                                ?
                                                (<ul key={i}>
                                                    <li>{data.nom}: {data.montant.toFixed(2)}</li>
                                                </ul>)
                                                : null
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Prêts
                            </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                <div className="accordion-body">
                                    {
                                        app.actifs.map((data, i) => (
                                            (data.type === "Prets")
                                                ?
                                                (<ul key={i}>
                                                    <li>{data.nom}: {data.montant.toFixed(2)}</li>
                                                </ul>)
                                                : null
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                Épargnes
                            </button>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                <div className="accordion-body">
                                    {
                                        app.actifs.map((data, i) => (
                                            (data.type === "Epargnes")
                                                ?
                                                (<ul key={i}>
                                                    <li>{data.nom}: {data.montant.toFixed(2)}</li>
                                                </ul>)
                                                : null
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <Chart app={app}/>
                    </div>

                    {/* Colonne statistiques? */}
                    <div className="col border-start text-center">
                        <p>Valeur nette: <span style={{color: app.valeurNette > 0  ? 'green' : 'red'}}>{app.valeurNette}</span></p>
                        <p>À budgeter: 0$</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;