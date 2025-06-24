import { useEffect, useState } from 'react'
import { FiRefreshCcw } from 'react-icons/fi'
import axiosInstance from '../config/axiosInstance'

function ApiWalletBal() {
    const [apiBalance, setApiBalance] = useState(0)

    async function fetchApiBalance(alert) {

        try {
            const response = await axiosInstance.get('/balance')
            const balance = response.data.data[0].balance
            setApiBalance(balance)
            if (alert) window.alert(`Wallet Balance: ${balance}`)
        } catch (error) {
            console.error('Failed to fetch API balance', error);
        }
    }

    useEffect(() => {
        void fetchApiBalance(false)
    })
    return (
        <div className="input-group">
            <input type="text" className="form-control text-end" placeholder="Wallet Balance" disabled value={apiBalance} />
            <span className="input-group-text" id="basic-addon1" onClick={() => fetchApiBalance(true)}>
                <FiRefreshCcw />
            </span>
        </div>
    )
}

export default ApiWalletBal