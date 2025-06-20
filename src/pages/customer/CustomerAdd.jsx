import React, { useState } from 'react'
import ButtonFormat from '../../templets/ButtonFormat'
import PageHead from '../../templets/PageHead'
import { Paper } from '@mui/material'
import axiosInstance from '../../config/axiosInstance'

function CustomerAdd({ setOpenModel, fetchCustomerList }) {
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
        if (!formData?.name?.trim() || !formData?.number?.trim() || !formData?.email?.trim()) return alert('Fill All Filelds')
        const payload = {
            type: 'customer',
            name: formData.name.trim(),
            number: formData.number.trim(),
            email: formData.email.trim(),
            status: 'active'
        }

        if (!window.confirm('Are All Details Correct')) return

        try {
            await axiosInstance.post('/ledger', payload)
            alert('Customer Ledger Added')
            setFormData({})
            setOpenModel(false)
            void fetchCustomerList()
        } catch (error) {
            console.error('Error While Creating Customer Ledger: ', error);
        }
    }
    return (
        <div>
            <PageHead title='Add Customer' />
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#D3D3D3', mt: 1 }} >
                <div className='d-flex flex-column gap-2 align-items-start'>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="name" style={{ width: '150px' }}>Name:</label>
                        <input type="text" id="name" className='form-control' onChange={changeHandle} value={formData?.name || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="number" style={{ width: '150px' }}>Number:</label>
                        <input type="text" id="number" className='form-control' onChange={changeHandle} value={formData?.number || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="email" style={{ width: '150px' }}>email:</label>
                        <input type="mail" id="email" className='form-control' onChange={changeHandle} value={formData?.email || ''} />
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

export default CustomerAdd