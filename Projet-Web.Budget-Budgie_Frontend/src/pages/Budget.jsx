import 'react';
import Jour from '../time/Jour';
import Navbar from '../navbar/Navbar';
import axios from "axios";
import { useState, useEffect } from "react";

function Budget() {

    const [budget, setBudget] = useState([]);
    const [types, setTypes] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [montantUtilise, setMontantUtilise] = useState([]);

    /*Patrick*/
    const loadBudgets = async () => {
        try {
            const budgetResult = await axios.get("http://10.10.2.127:8888/api/budget/getBudget");
            const typesResult = await axios.get("http://10.10.2.127:8888/api/budget/getUniqueTypes");
            const montantResult = await axios.get("http://10.10.2.127:8888/api/transactions/getTotalByCategorie");
            setBudget(budgetResult.data);
            setTypes(typesResult.data);
            setMontantUtilise(montantResult.data);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        loadBudgets();
    }, []);

    /*Patrick*/
    const addBudget = async (e, type) => {
        e.preventDefault();
        try {
            await axios.post(`http://10.10.2.127:8888/api/budget/addBudget/${type}`)
            loadBudgets();
        }
        catch (error) {
            console.error("Error: ", error)
        }
    }

    /*Patrick*/
    // Un cas de "Don't Repeat Yourself" à appliquer ici... 🤔💭
    const handleChange = (budgetId, prop, val) => {
        setIsFocus(true);
        try {
            if (prop === 'montant') {
                if (/^-?[0-9]*$/.test(val)) {
                    setBudget((budget) =>
                        budget.map((newBudget) =>
                            newBudget.id === budgetId ? {...newBudget, [prop]: val} : newBudget
                        )
                    );
                }
            }
            else {
                setBudget((budget) =>
                    budget.map((newBudget) =>
                        newBudget.id === budgetId ? {...newBudget, [prop]: val} : newBudget
                    )
                );
            }
        }
        catch (error) {
            console.error("Error: ", error)
        }
    };

    /*Patrick*/
    const handleBlur = async (budgetId, prop, val) => {
        try {
            if (prop === 'montant') {
                await axios.put(`http://10.10.2.127:8888/api/budget/modMontantBudget/${budgetId}`, { [prop]: parseFloat(val) });
            }
            else {
                await axios.put(`http://10.10.2.127:8888/api/budget/modCategorieBudget/${budgetId}`, { [prop]: val });
            }
            setIsFocus(false);
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }

    /*Patrick*/
    const deleteBudget = async (e, budgetId) => {
        e.preventDefault();
        if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?")) {
            try {
                await axios.delete(`http://10.10.2.127:8888/api/budget/deleteBudget/${budgetId}`);
                loadBudgets();
            }
            catch (error) {
                console.error("Error: ", error)
            }
        }
    }

    /*Patrick*/
    const sectionHeaderMap = (data) => {
        return(
            <div className="row d-flex mt-5">
                <div className="column input-group justify-content-center">
                    <span className="input-group-text justify-content-start" style={{width: '175px', backgroundColor: 'cadetblue', fontWeight: 'bold', color: 'white'}}>{data}</span>
                    <span className="input-group-text justify-content-center" style={{width: '195px', backgroundColor: 'ivory', fontWeight: 'bold'}}>Budget</span>
                    <span className="input-group-text justify-content-center" style={{width: '150px', backgroundColor: 'ivory', fontWeight: 'bold'}}>Utilisé</span>
                    <span className="input-group-text justify-content-center" style={{width: '150px', backgroundColor: 'ivory', fontWeight: 'bold'}}>Balance</span>
                    <form method="post"
                          onSubmit={(e) =>
                              addBudget(e, data)}>
                        <button type="submit"  title="Ajouter une catégorie">+</button>
                    </form>
                </div>
            </div>
        );
    }

    /*Patrick*/
    const sectionRowMap = (data, i) => {
        return(
            <div className="row d-flex" key={i}>
                <div className="col">
                    <div className="column input-group justify-content-center" style={{minWidth: '350px'}}>

                        <input type="text" name="categorie" className="input-group-text text-start" style={{width: '175px'}}
                               value={data.categorie}
                               onChange={(e) =>
                                    handleChange(data.id, 'categorie', e.target.value)}
                               onBlur={() =>
                                    handleBlur(data.id, 'categorie', data.categorie)}/>

                        <input type="text" name="montant" className="form-control text-end" aria-label="Montant à budgeter" title="Montant estimé"
                               value={isFocus ? data.montant : parseFloat(data.montant)} style={{maxWidth: '145px'}}
                               onChange={(e) =>
                                   handleChange(data.id, 'montant', e.target.value)}
                               onBlur={() =>
                                   handleBlur(data.id, 'montant', data.montant)}
                               onFocus={(e) => e.target.select()}
                        />
                        <input className="input-group-text" style={{maxWidth: '50px'}} value=".00" disabled/>
                        <input type="text" disabled className="form-control text-end" aria-label="Montant utilisé" placeholder="0.00" style={{maxWidth: '150px'}}
                               value={isNaN(montantUtilise[data.categorie])
                                   ? "0.00"
                                   : montantUtilise[data.categorie]}/>

                        <input type="text" disabled className="form-control text-end" aria-label="Montant restant"  placeholder="0.00" style={{maxWidth: '150px', color: (data.montant - montantUtilise[data.categorie]) > 0 || isNaN((data.montant - montantUtilise[data.categorie]))  ? 'green' : 'red' }}
                               value={isNaN(montantUtilise[data.categorie])
                                   ? data.montant
                                   : (data.montant - montantUtilise[data.categorie]).toFixed(2)}/>

                        {
                            data.categorie !== "Non catégorisé" && isNaN(montantUtilise[data.categorie])
                                ? <form method="post" style={{textAlign: 'center', borderRadius: '10px'}}
                                        onSubmit={(e) =>
                                            deleteBudget(e, data.id)}>
                                    <button type="submit" title="Supprimer la catégorie" id="deleteButton">x</button>
                                </form>
                                : <div style={{width: "48px"}}></div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="my-5">
                <h2 className="mt-5">Budget</h2>
                <h2 className="text-center"><Jour/></h2> {/*budget.date*/}

                {types.map((typesData, i) => (

                    <div className="container" key={i}>
                        <div className="column">
                            {sectionHeaderMap(typesData)}
                        </div>

                        {budget.map((budgetData, i) => (
                            budgetData.type === typesData
                                ? sectionRowMap(budgetData, i)
                                : null

                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Budget;