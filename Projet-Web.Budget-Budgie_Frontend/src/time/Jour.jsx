import 'react';

/*Patrick*/
function Jour() {

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

    return (
        <div>
            <span>{mois[moisActuel]} {anneeActuelle}</span>
        </div>
    );
}

export default Jour;