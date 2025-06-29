import { Box, Menu, MenuItem, Modal, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import PageHead from '../templets/PageHead'
import axiosInstance from '../config/axiosInstance'
import ButtonFormat from '../templets/ButtonFormat'
import { useGlobalContext } from '../config/globalContext'
import logo from '../LOGO FILE/3.jpg'
import { CgProfile } from "react-icons/cg";
import { FiRefreshCcw } from "react-icons/fi";
import axios from 'axios'
import ApiWalletBal from '../adminFiles/ApiWalletBal'


function Navbar() {
    const { walletBalance, fetchWalletBalalce } = useGlobalContext()
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const currentPage = useLocation().pathname.split('/')[2]
    const [openModelAddWalletBalance, setOpenModelAddWalletBalance] = useState(false)
    const [adminWaletBalance, setAdminWalletBalance] = useState(0)
    const [topupRemark, setTopupRemark] = useState('')
    const [accountList, setAccountList] = useState(0)
    const [selectedAccount, setSelectedAccount] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const openActionMenu = Boolean(anchorEl);


    const handleClickActionMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseActionMenu = () => {
        setAnchorEl(null);
    };

    const handleCloseModelAddWalletBalance = () => {
        setSelectedAccount()
        setAccountList([])
        setAdminWalletBalance(0)
        setTopupRemark('')
        setOpenModelAddWalletBalance(false)
    }

    console.log('accountList', accountList);


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

    async function topUpUserWalledtHandler() {
        if (!selectedAccount.trim()) return alert('Select bank Account')
        if (adminWaletBalance <= 0) return alert('Top Up Amount Cant Be 0 or Less')
        try {
            await axiosInstance.post('/trnx/adminWalletLoad', {
                amount: Number(adminWaletBalance),
                accountLedgerId: selectedAccount,
                remark: topupRemark
            })
            void fetchWalletBalalce()
            handleCloseModelAddWalletBalance()
        } catch (error) {
            console.error('error on user wallet TopUp', error);
            alert(error?.response?.data?.message || 'Error While User Top Up')
        }
    }

    function logoutHandle() {
        sessionStorage.clear();
        window.location.reload()
    }

    useEffect(() => {
        if (openModelAddWalletBalance) void fetchAccounts()
    }, [openModelAddWalletBalance])


    return (
        <div>
            <nav className='navbar navbar-expand-lg bg-body-tertiary p-0'>
                <div className='container-fluid themeGreenBg p-0'>
                    {/* <div className='d-flex justify-content-between' style={{ width: '100%' }}> */}
                    <Link className='navbar-brand m-0 p-1' to={`/${userData?.clientId}/dashboard`}>
                        <img className='img-fluid' style={{ maxHeight: '45px' }} src={logo} alt="Neo Cash" />
                    </Link>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-lg-0'>
                            <li className='nav-item'>
                                <Link className={`nav-link ${currentPage === 'dashboard' ? 'activeNavMenu' : ''}`} to={`/${userData?.clientId}/dashboard`}>Dashboard</Link>
                            </li>
                            {/* <li className='nav-item'>
                            <Link className={`nav-link ${currentPage === 'bank' ? 'activeNavMenu' : ''}`} to={`/${clientId}/bank`}>Bank</Link>
                            </li> */}
                            <li className='nav-item dropdown'>
                                <Link className={`nav-link dropdown-toggle ${['bank', 'commission', 'customer'].includes(currentPage) ? 'activeNavMenu' : ''}`} to='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Master
                                </Link>
                                <ul className='dropdown-menu'>
                                    <li><Link className='dropdown-item' to={`/${userData?.clientId}/bank`}>Bank</Link></li>
                                    <li><Link className='dropdown-item' to={`/${userData?.clientId}/commission`}>Commission Slab</Link></li>
                                    <li><Link className='dropdown-item' to={`/${userData?.clientId}/customer`}>Customer</Link></li>
                                    {/* <li><Link className='dropdown-item' to={`/${clientId}/wallet`}>Wallet</Link></li> */}
                                    {/* <li><hr className='dropdown-divider' /></li> */}
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <Link className={`nav-link ${currentPage === 'payout' ? 'activeNavMenu' : ''}`} to={`/${userData?.clientId}/payout`}>Payout</Link>
                            </li>
                            {/* <li className='nav-item'>
                                <Link className={`nav-link ${currentPage === 'payin' ? 'activeNavMenu' : ''}`} to={`/${userData?.clientId}/payin`}>Payin</Link>
                            </li> */}
                            {/* <li className='nav-item'>
                                <Link className={`nav-link ${currentPage === 'ledger-report' ? 'activeNavMenu' : ''}`} to={`/${userData?.clientId}/ledger-report`}>Ledger Report</Link>
                            </li> */}
                            <li className='nav-item'>
                                <Link className={`nav-link ${currentPage === 'user' ? 'activeNavMenu' : ''}`} to={`/${userData?.clientId}/user`}>User</Link>
                            </li>
                            {/* <li className='nav-item'>
                                <Link className={`nav-link ${currentPage === 'whiteLabel' ? 'activeNavMenu' : ''}`} to={`/${userData?.clientId}/whiteLabel`}>White Label</Link>
                            </li> */}
                        </ul>
                    </div>
                    <div className='d-flex gap-3'>
                        {
                            userData?.cType === 'NC' && userData?.type === 'admin' &&
                            <ApiWalletBal />
                        }
                        <div className="input-group">
                            <input type="text" className="form-control text-end" value={walletBalance} disabled />
                            <span className="input-group-text" id="basic-addon1" onClick={() => { setOpenModelAddWalletBalance(true) }}>
                                <FaPlus />
                            </span>
                        </div>
                    </div>
                    <div>

                        <div className='ms-2' onClick={handleClickActionMenu}>
                            <CgProfile className='fs-1' />
                        </div>
                        <Menu
                            anchorEl={anchorEl}
                            open={openActionMenu}
                            onClose={handleCloseActionMenu}
                            // onClick={() => setCurrentUser(payout)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {/* <MenuItem onClick={() => actionMenuItemClicked(payout)}>Top Up payout Wallet</MenuItem> */}
                            <MenuItem className='fs-5 fw-bold' onClick={() => console.log('clicked Profile')}>Profile</MenuItem>
                            <hr className='my-1' />
                            <MenuItem >Company: <span className='fw-bold'>{userData?.companyName}</span></MenuItem>
                            <MenuItem >User: <span className='fw-bold'>{userData?.userName}</span></MenuItem>
                            <hr className='my-1' />
                            <MenuItem onClick={() => console.log('clicked Settings')}>Settings</MenuItem>
                            <hr className='my-1' />
                            <MenuItem className='text-danger fw-bold' onClick={logoutHandle}>Logout</MenuItem>
                        </Menu>
                    </div>
                    {/* </div> */}
                </div>
            </nav >

            <div>
                <Modal open={openModelAddWalletBalance} onClose={handleCloseModelAddWalletBalance} >
                    <Box className='popUpStyling' sx={{ bgcolor: 'wheat', width: 800 }}>
                        <PageHead title='Load Admin Wallet' />
                        <Paper elevation={3} sx={{ p: 2, bgcolor: '#D3D3D3', mt: 1 }} >
                            <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                                <label htmlFor="bankAccount" style={{ width: '150px' }}>Bank Account:</label>
                                <select className='form-select' id="bankAccount" onChange={(e) => setSelectedAccount(e.target.value)} value={selectedAccount}>
                                    <option value="">Select Bank Account</option>
                                    {
                                        accountList &&
                                        accountList.map((account) => (
                                            <option value={account.id}>{account.name}-{account.accountNumber}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='d-flex justify-content-start gap-2 align-items-center mt-3' style={{ width: '100%' }}>
                                <label htmlFor="amount" style={{ width: '150px' }}>Top Up Amount:</label>
                                <input type="text" id="amount" className='form-control' onChange={(e) => setAdminWalletBalance(e.target.value)} value={adminWaletBalance} />
                            </div>
                            <div className='d-flex justify-content-start gap-2 align-items-center mt-3' style={{ width: '100%' }}>
                                <label htmlFor="remark" style={{ width: '150px' }}>Remark:</label>
                                <textarea type="text" id="remark" className='form-control' onChange={(e) => setTopupRemark(e.target.value)} value={topupRemark} />
                            </div>
                            <div className='d-flex justify-content-end gap-2 align-items-center mt-3'>
                                {/* <p className='m-0 fw-bold'>My Balance: XXX</p> */}
                                <ButtonFormat
                                    name='Add Balance'
                                    onClick={topUpUserWalledtHandler}
                                />
                            </div>
                        </Paper>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default Navbar