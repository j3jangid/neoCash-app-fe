import { useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import ButtonFormat from '../../templets/ButtonFormat'
import { Paper } from '@mui/material'
import PageHead from '../../templets/PageHead'

function CommissionAdd({ fetchCommissionSlabs, setOpenModel }) {
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
        if (!formData?.name?.trim() || !formData?.commission) return alert('Fill All Filelds')
        const payload = {
            type: 'commission',
            name: formData.name.trim(),
            commission: formData.commission,
            status: 'active'
        }

        if (!window.confirm('Are All Details Correct')) return

        try {
            await axiosInstance.post('/ledger', payload)
            alert('Commission Slab Added')
            setFormData({})
            setOpenModel(false)
            void fetchCommissionSlabs()
        } catch (error) {
            console.error('Error While Creating Commission Slab: ', error);
        }
    }
    return (
        <div>
            <PageHead title='Add Commission Slab' />
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#D3D3D3', mt: 1 }} >
                <div className='d-flex flex-column gap-2 align-items-start'>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="name" style={{ width: '150px' }}>Slab Name:</label>
                        <input type="text" id="name" className='form-control' onChange={changeHandle} value={formData?.name || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="commission" style={{ width: '150px' }}>Commission Rate:</label>
                        <input type="number" id="commission" className='form-control' onChange={changeHandle} value={formData?.commission || ''} />
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

export default CommissionAdd