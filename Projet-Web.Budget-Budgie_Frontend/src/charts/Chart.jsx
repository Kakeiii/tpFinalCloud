import React, { useState } from 'react';
import { AreaChart } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';
import { Area } from 'recharts';
import { CartesianGrid } from 'recharts';
import { Tooltip } from 'recharts';
import { useEffect } from 'react';
import axios from "axios";
/*Ta Anh*/
function Chart() {

    const [transactions, setTransactions] = useState();

    /*Ta Anh*/
    const loadTransactions = async () => {
        try {
            const transactionsResult = await axios.get("http://10.10.2.127:8888/api/transactions/getAllTransactions");
            setTransactions(transactionsResult.data);
            console.log(transactionsResult);
        } catch (error) {
            console.error("Error: ", error);
        }
    }
    useEffect(() => {
        loadTransactions();
    }, []);


    return (
        <div classcategory='center'>
            <AreaChart width={730} height={350} data={transactions}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="0%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="budget.categorie" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="montant" stroke="#FF0000" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>

        </div>
    );
}

export default Chart;