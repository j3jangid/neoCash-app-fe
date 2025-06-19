import { useState } from 'react'
import PageHead from '../../templets/PageHead'
import { Paper } from '@mui/material'
import ButtonFormat from '../../templets/ButtonFormat'
import axiosInstance from '../../config/axiosInstance'

function BankAdd({ setOpenModel, fetchBankAccounts }) {
    const [formData, setFormData] = useState({})

    function changeHandle(e) {
        const { id, value } = e.target
        setFormData(pre => ({
            ...pre,
            [id]: value
        }))
    }

    function clearHandle() {
        setFormData({})
    }

    async function submitHandle() {
        if (!formData?.name?.trim() || !formData?.accountNumber?.trim() || !formData?.holderName?.trim() || !formData?.ifsc?.trim()) return alert('Fill All Filelds')
        const payload = {
            type: 'bank',
            name: formData.name.trim(),
            accountNumber: formData.accountNumber.trim(),
            holderName: formData.holderName.trim(),
            ifsc: formData.ifsc.trim(),
            status: 'active'
        }

        if (!window.confirm('Are All Details Correct')) return

        try {
            await axiosInstance.post('/ledger', payload)
            alert('Bank Ledger Added')
            setFormData({})
            setOpenModel(false)
            void fetchBankAccounts()
        } catch (error) {
            console.error('Error While Creating Bank Ledger: ', error);
        }
    }
    return (
        <div>
            <PageHead title='Add Bank' />
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#D3D3D3', mt: 1 }} >
                <div className='d-flex flex-column gap-2 align-items-start'>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="name" style={{ width: '150px' }}>Bank Name:</label>
                        <input type="text" id="name" className='form-control' onChange={changeHandle} value={formData?.name || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="accountNumber" style={{ width: '150px' }}>Account Number:</label>
                        <input type="text" id="accountNumber" className='form-control' onChange={changeHandle} value={formData?.accountNumber || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="holderName" style={{ width: '150px' }}>Holder Name:</label>
                        <input type="text" id="holderName" className='form-control' onChange={changeHandle} value={formData?.holderName || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="ifsc" style={{ width: '150px' }}>IFSC:</label>
                        <input type="text" id="ifsc" className='form-control' onChange={changeHandle} value={formData?.ifsc || ''} />
                    </div>
                </div>
                <div className='d-flex justify-content-end gap-2 align-items-center mt-3'>
                    <ButtonFormat
                        name='Clear'
                        onClick={clearHandle}
                        bgColor={'red'}
                    />
                    <ButtonFormat
                        name='Submit'
                        onClick={submitHandle}
                    />
                </div>
            </Paper>
        </div>
    )
}

export default BankAdd