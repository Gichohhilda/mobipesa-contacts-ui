import { useEffect, useState } from "react";
import axios from "axios";

export default function Transactions() {
    const [transactions, setTransactions] =useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/mpesa/transactions")
        .then((res) => setTransactions(res.data.data));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>M-pesa Transactions</h2>
            <table border="1" cellPadding="8" width="100%">
                <thead>
                    <tr>
                        <th>Receipt</th>
                        <th>Phone</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id}>
                            <td>{t.receipt_number || "Pending"}</td>
                            <td>{t.phone}</td>
                            <td>KES {t.amount}</td>
                            <td style={{ color: t.result_code === 0 ? "green" : "red" }}>{t.result_code === 0 ? "Success" : "Failed"}</td>
                            <td>{new Date(t.created_at).toLocaleString()}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}