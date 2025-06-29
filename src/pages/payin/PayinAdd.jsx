// import React from 'react'
import { useEffect, useState } from 'react'
import ButtonFormat from '../../templets/ButtonFormat'
import PageHead from '../../templets/PageHead'
import { Paper } from '@mui/material'
import axiosInstance from '../../config/axiosInstance'

function PayinAdd({ setOpenModel, fetchPayinList }) {
    // const { fetchWalletBalalce } = useGlobalContext()
    const [customerList, setCustomerList] = useState([])
    const [customerId, setCustomerId] = useState('')
    const [amount, setAmount] = useState(0)
    const [remark, setRemark] = useState('')

    async function submitHandle() {
        try {
            const response = await axiosInstance.post('/payin', {
                customerId,
                amount,
                remark
            })

            console.log('response', response);


            // setOpenModel(false)
            void fetchPayinList()
            // void fetchWalletBalalce()
        } catch (error) {
            console.error('error on app Payin: ', error);
            alert(error.response?.data?.message || JSON.stringify(error.response?.data?.errors) || 'Error on Add New Payin')
        }
    }

    async function fetchCustomers() {
        try {
            const response = await axiosInstance.get('/ledger', {
                params: {
                    type: 'customer',
                }
            })
            const { totalCount, data } = response.data.data
            setCustomerList(data)
        } catch (error) {
            console.error('Error fetch Customer List: ', error);
        }
    }

    useEffect(() => {
        void fetchCustomers()
    }, [])

    return (
        <div>
            <PageHead title='Add Payin' />
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#D3D3D3', mt: 1 }} >
                <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                    <label htmlFor="customerId" style={{ width: '150px' }}>Customer:</label>
                    <select className='form-select' id="customerId" onChange={(e) => setCustomerId(e.target.value)} value={customerId}>
                        <option value="">Select Bank Account</option>
                        {
                            customerList &&
                            customerList.map((account, i) => (
                                <option key={i} value={account?.id}>{account?.number} - {account?.name}</option>
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
            </Paper>
        </div>
    )
}

export default PayinAdd