import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../config/globalContext';
import logo from '../LOGO FILE/LOGO white Network.png'
import backLogo from '../LOGO FILE/MAIN.png'


function Login() {
    const navigate = useNavigate()
    const { setLogin } = useGlobalContext()
    const [formData, setFormData] = useState({})

    function changeHandle(e) {
        const { id, value } = e.target
        setFormData(pre => ({
            ...pre,
            [id]: value
        }))
    }

    async function login() {
        if (!formData.userName || !formData.password) alert('enter User Name and Password both')
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/user/login`, formData)
            const { token, userData } = response.data.data
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('userData', JSON.stringify(userData))
            setLogin(true)
            navigate(`/${userData.clientId}/dashboard`)
        } catch (error) {
            console.error('Error on Login:', error);
            alert(error?.response?.data?.message || 'Error While Login')
        }
    }
    return (
        <div className='bg-dark p-5' style={{ height: '100vh', }}>
            <div
                className='d-flex justify-content-center align-items-center bg-dark'
                style={{
                    height: '100%',
                    backgroundImage: `url(${backLogo})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className='d-flex flex-column gap-3 loginBox p-5'>
                    <img src={logo} className='img-fluid mb-4' alt="Neo Cash" style={{ width: '400px' }} />
                    <input className='form-control' type="text" id="userName" placeholder='User Name' onChange={changeHandle} value={formData?.userName || ''} />
                    <input className='form-control' type="password" id="password" placeholder='Password' onChange={changeHandle} value={formData?.password || ''} />
                    <button className='btn loginBtn' style={{ width: '100%' }} onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login