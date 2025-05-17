import Navbar from '../navbar/Navbar';
import axios from "axios";
import {useState, useEffect} from 'react';

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isFocus, setIsFocus] = useState(false)
    const API_URL = import.meta.env.API_URL || ""
    /*Ta Anh*/
    const loadTransactions = async () => {
        try {
            const transactionsResult = await axios.get(`http://${API_URL}:8888/api/transactions/getAllTransactions`);
            const categoriesResult = await axios.get(`http://${API_URL}:8888/api/budget/getBudget`);
            setTransactions(transactionsResult.data);
            setCategories(categoriesResult.data);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    /*Ta Anh*/
    const addNewTransaction = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://${API_URL}:8888/api/transactions/addTransaction`);
            loadTransactions();
        }
        catch (error) {
            console.error("Error: ", error)
        }
    }

    /*Ta Anh*/
    const handleChange = (id, prop, val) => {
        setIsFocus(true);
        try {
            if (prop === "montant") {
                if (/^-?[0-9]*\.?[0-9]{0,2}$/.test(val)) {
                    setTransactions((transactions) =>
                        transactions.map((transaction) =>
                            transaction.id === id ? {...transaction, [prop]: val} : transaction
                        )
                    );
                }
            }
            else {
                setTransactions((transactions) =>
                    transactions.map((transaction) =>
                        transaction.id === id ? {...transaction, [prop]: val} : transaction
                    )
                );
            }
        } catch (error){
            console.error("Error:", error)
        }
    }

    /*Ta Anh*/
    const handleBlur = async (id, prop, val) => {
        try {
            if (prop === "montant") {
                await axios.put(`http://${API_URL}:8888/api/transactions/modTransactionMontant/${id}`, {[prop]: parseFloat(val)});
            } else if (prop === "detail") {
                await axios.put(`http://${API_URL}:8888/api/transactions/modTransactionDetail/${id}`, {[prop]: val})
            } else {
                await axios.put(`http://${API_URL}:8888/api/transactions/modTransactionDate/${id}`, {[prop]: val})
            }
            setIsFocus(false);
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    /*Patrick*/
    const handleSelect = async (id, val) => {
        try {
            await axios.put(`http://${API_URL}:8888/api/transactions/modTransactionCategorie/${id}`, val,  {"headers": {"content-type": "application/json"}});
            loadTransactions();
        }
        catch (error) {
            console.error("Error: ", error)
        }
    }

    /*Ta Anh*/
    const deleteTransaction = async (e, id) => {
        e.preventDefault();
        if (confirm("Êtes-vous sûr de vouloir supprimer cette transaction?")) {
            try {
                await axios.delete(`http://${API_URL}:8888/api/transactions/deleteTransaction/${id}`);
                loadTransactions();
            }
            catch (error) {
                console.error("Error: ", error)
            }
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="my-5">
                <h2 className="mt-5">Transactions</h2>

                <table className="table table-success table-striped mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Catégorie</th>
                            <th scope="col">Détail</th>
                            <th scope="col">Montant</th>
                            <th scope="col">Type</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    {transactions.map((data, i) => (
                        <tbody key={i}>
                            <tr>
                                <th scope="row">
                                    <input type="text" style={{fontWeight: 'bold'}} className="form-control"
                                           aria-label="Date" placeholder="AAAA-MM-JJ" value={data.date} name='date'
                                           title='Modifer Date'
                                           onChange={(e) => handleChange(data.id, "date", e.target.value)}
                                           onBlur={() => handleBlur(data.id, 'date', data.date)}
                                    />
                                </th>

                                <td>
                                    <select className="form-select" name='cat' onChange={(e) => handleSelect(data.id, parseInt(e.target.value))}>
                                        <option value={data.budget.id} style={{fontWeight: 'bold'}}>{data.budget.categorie}</option>
                                        {
                                            categories.map((dataCat, i) => (
                                                <option key={i} value={dataCat.id}>{dataCat.categorie}</option>
                                            ))
                                        }
                                    </select>
                                </td>

                                <td>
                                    <input type="text" style={{fontWeight: "bold"}} className='form-control'
                                           aria-label='detail' value={data.detail} title='Modifier detail'
                                           name="detail"
                                           placeholder="Detail"
                                           onChange={(e) => handleChange(data.id, "detail", e.target.value)}
                                           onBlur={() => handleBlur(data.id, 'detail', data.detail)}
                                    />
                                </td>

                                <td>
                                    <input type="text" className="form-control" placeholder="Montant"
                                           title='Changer montant'
                                           name="montant"
                                           value={isFocus ? data.montant : parseFloat(data.montant).toFixed(2)}
                                           onChange={(e) => handleChange(data.id, "montant", e.target.value)}
                                           onBlur={() => handleBlur(data.id, 'montant', data.montant)}
                                           onFocus={(e) => e.target.select()}
                                    />
                                </td>

                                <td>
                                    {data.budget.type}
                                </td>

                                <td>
                                    <form onSubmit={(e) => deleteTransaction(e, data.id)}
                                          style={{
                                              textAlign: 'center',
                                              borderRadius: '10px'
                                          }}>
                                        <button type="submit" style={{fontWeight: 'bold'}} id="deleteButton"
                                                title="Supprimer l'actif">X
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>

                <form method="post" onSubmit={(e) => addNewTransaction(e)}>
                    <button type="submit" className="btn btn-success">+ Ajouter</button>
                </form>

            </div>
        </div>
    );
}

export default Transactions;