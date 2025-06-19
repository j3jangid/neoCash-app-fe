import React, { useEffect, useState } from 'react'
import PageHead from '../../templets/PageHead'
import ButtonFormat from '../../templets/ButtonFormat'
import { Paper } from '@mui/material'
import axiosInstance from '../../config/axiosInstance'
import { useGlobalContext } from '../../config/globalContext'

function PayoutAdd({ setOpenModel, fetchPayoutList }) {
    const { fetchWalletBalalce } = useGlobalContext()
    const [accountList, setAccountList] = useState([])
    const [accountId, setAccountId] = useState('')
    const [amount, setAmount] = useState(0)
    const [remark, setRemark] = useState('')

    async function submitHandle() {
        try {
            await axiosInstance.post('/payout', {
                accountId,
                amount,
                remark
            })

            setOpenModel(false)
            void fetchPayoutList()
            void fetchWalletBalalce()
        } catch (error) {
            console.error('error on app Payout: ', error);
            alert(error.response?.data?.message || JSON.stringify(error.response?.data?.errors) || 'Error on Add New Payout')
        }
    }

    async function fetchAccounts() {
        try {
            const response = await axiosInstance.get('/ledger', {
                params: {
                    type: 'bank',
                }
            })
            const { totalCount, data } = response.data.data
            setAccountList(data)
        } catch (error) {
            console.error('Error fetch Bank List: ', error);
        }
    }

    useEffect(() => {
        void fetchAccounts()
    }, [])
    return (
        <div>
            <PageHead title='Add Payout' />
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#D3D3D3', mt: 1 }} >
                <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                    <label htmlFor="accountId" style={{ width: '150px' }}>Bank Account:</label>
                    <select className='form-select' id="accountId" onChange={(e) => setAccountId(e.target.value)} value={accountId}>
                        <option value="">Select Bank Account</option>
                        {
                            accountList &&
                            accountList.map((account, i) => (
                                <option key={i} value={account?.id}>{account?.name} - {account?.accountNumber}%</option>
                            ))
                        }
                    </select>
                </div>
                <div className='d-flex justify-content-start gap-2 align-items-center mt-3' style={{ width: '100%' }}>
                    <label htmlFor="amount" style={{ width: '150px' }}>Amount:</label>
                    <input type="number" id="amount" className='form-control' onChange={(e) => setAmount(e.target.value)} value={amount} />
                </div>
                <div className='d-flex justify-content-start gap-2 align-items-center mt-3' style={{ width: '100%' }}>
                    <label htmlFor="remark" style={{ width: '150px' }}>Remark:</label>
                    <textarea type="text" id="remark" className='form-control' onChange={(e) => setRemark(e.target.value)} value={remark} />
                </div>
                <div className='d-flex justify-content-end gap-2 align-items-center mt-3'>
                    <ButtonFormat
                        name='Submit'
                        onClick={submitHandle}
                    />
                </div>
            </Paper >
        </div >
    )
}

export default PayoutAdd