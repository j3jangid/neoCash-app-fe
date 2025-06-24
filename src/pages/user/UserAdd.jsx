import { useEffect, useState } from 'react'
import PageHead from '../../templets/PageHead'
import axiosInstance from '../../config/axiosInstance'
import ButtonFormat from '../../templets/ButtonFormat'
import { Paper } from '@mui/material'
import { useParams } from 'react-router-dom'

function UserAdd({ setOpenModel, fetchUsers }) {
    const { clientId } = useParams()
    const [formData, setFormData] = useState({})
    const [commissionList, setCommissionList] = useState([])

    console.log('formData', formData);

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
        if (!formData?.name?.trim() ||
            !formData?.number ||
            !formData?.email?.trim() ||
            !formData?.userName?.trim() ||
            !formData?.payoutChargeId ||
            !formData?.payinChargeId) return alert('Fill All Filelds')
        const payload = {
            clientId,
            name: formData.name.trim(),
            number: formData.number,
            email: formData.email.trim(),
            userName: formData.userName.trim(),
            password: 1234,
            payinChargeId: formData.payinChargeId,
            payoutChargeId: formData.payoutChargeId,
            // opningBalance: formData.opningBalance,
            minimumBalance: formData.minimumBalance,
            status: 'active'
        }

        if (!window.confirm('Are All Details Correct')) return

        try {
            await axiosInstance.post('/user', payload)
            alert('New User Added')
            setFormData({})
            setOpenModel(false)
            void fetchUsers()
        } catch (error) {
            console.error('Error While Creating New User: ', error);
            alert(error.response?.data?.errors || 'Error While Creating New User')
        }
    }

    useEffect(() => {
        async function fetchCommissionSlabs() {
            try {
                const response = await axiosInstance.get('/ledger', {
                    params: {
                        type: 'commission',
                    }
                })
                const { totalCount, data } = response.data.data
                setCommissionList(data)
            } catch (error) {
                console.error('Error fetch Commission List: ', error);
            }
        }
        void fetchCommissionSlabs()
    }, [])
    return (
        <div>
            <PageHead title='Add User' />
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#D3D3D3', mt: 1 }} >
                <div className='d-flex flex-column gap-2 align-items-start'>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="name" style={{ width: '150px' }}>Name:</label>
                        <input type="text" id="name" className='form-control' onChange={changeHandle} value={formData?.name || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="number" style={{ width: '150px' }}>Number:</label>
                        <input type="number" id="number" className='form-control' onChange={changeHandle} value={formData?.number || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="email" style={{ width: '150px' }}>Email:</label>
                        <input type="text" id="email" className='form-control' onChange={changeHandle} value={formData?.email || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="userName" style={{ width: '150px' }}>User Name:</label>
                        <input type="text" id="userName" className='form-control' onChange={changeHandle} value={formData?.userName || ''} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="password" style={{ width: '150px' }}>Password:</label>
                        <input type="text" id="password" className='form-control' disabled value={1234} />
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="payoutChargeId" style={{ width: '150px' }}>Payout Charge:</label>
                        <select className='form-select' id="payoutChargeId" onChange={changeHandle} value={formData?.payoutChargeId || ''}>
                            <option value="">Select Payout Charge</option>
                            {
                                commissionList &&
                                commissionList.map((commission, i) => (
                                    <option key={i} value={commission?.id}>{commission?.name} - {commission?.commission}%</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="payinChargeId" style={{ width: '150px' }}>Payin Charge:</label>
                        <select className='form-select' id="payinChargeId" onChange={changeHandle} value={formData?.payinChargeId || ''}>
                            <option value="">Select Payin Charge</option>
                            {
                                commissionList &&
                                commissionList.map((commission, i) => (
                                    <option key={i} value={commission?.id}>{commission?.name} - {commission?.commission}%</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                        <label htmlFor="minimumBalance" style={{ width: '150px' }}>Minimum Balance:</label>
                        <input type="number" id="minimumBalance" className='form-control' onChange={changeHandle} value={formData?.minimumBalance || 0} />
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

export default UserAdd