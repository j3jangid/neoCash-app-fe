import { useEffect, useState } from 'react'
import PageHead from '../../templets/PageHead'
import { Box, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import WhiteLabelAdd from './WhiteLabelAdd'
import axiosInstance from '../../config/axiosInstance'
import { IoSettings } from 'react-icons/io5'
import ButtonFormat from '../../templets/ButtonFormat'
import { useGlobalContext } from '../../config/globalContext'
import Pagination from '../../templets/Pagination'

function WhiteLabelList() {
    const { fetchWalletBalalce } = useGlobalContext()
    const [openModel, setOpenModel] = useState(false)
    const handleClose = () => setOpenModel(false)
    const [rowsPerPages, setRowsPerPages] = useState(20)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalRows, setTotalRows] = useState(0)
    const [WLList, setWLList] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const openActionMenu = Boolean(anchorEl);
    const [currentUser, setCurrentUser] = useState(0)
    const [openModelAddWalletBalance, setOpenModelAddWalletBalance] = useState(false)
    const handleCloseModelAddWalletBalance = () => setOpenModelAddWalletBalance(false)
    const [userWalletBalance, setUserWalletBalance] = useState(0)
    const [topupRemark, setTopupRemark] = useState('')

    const handleClickActionMenu = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setCurrentUser(userId);
    };

    const handleCloseActionMenu = () => {
        setAnchorEl(null);
    };

    function handleRowsPerPages(e) {
        setRowsPerPages(e.target.value)
    }

    function handlePageChange(e, type) {
        setPageNumber(type === 'plus' ? pageNumber + 1 : pageNumber - 1)
    }

    async function topUpUserWalledtHandler() {
        if (userWalletBalance <= 0) return alert('Top Up Amount Cant Be 0 or Less')
        try {
            await axiosInstance.post('/trnx/userWalletTopUp', {
                amount: Number(userWalletBalance),
                userId: currentUser,
                remark: topupRemark
            })
            void fetchWLList()
            void fetchWalletBalalce()
            handleCloseModelAddWalletBalance()
        } catch (error) {
            console.error('error on user wallet TopUp', error);
            alert(error?.response?.data?.message || 'Error While User Top Up')
        }
    }

    async function fetchWLList() {
        try {
            const response = await axiosInstance.get('/client/allWL', {
                params: {
                    rowsPerPages,
                    pageNumber,
                }
            })
            const { totalCount, data } = response.data.data
            setWLList(data)
            setTotalRows(totalCount)
        } catch (error) {
            console.error('Error fetch User List: ', error);
        }
    }

    useEffect(() => {
        void fetchWLList()
    }, [pageNumber, rowsPerPages])
    return (
        <div>
            <PageHead title='White Label' btn='Add WL' onClick={() => setOpenModel(true)} />
            <Paper elevation={3} sx={{ padding: 2, mt: 1, bgcolor: '#D3D3D3' }}  >
                <Table size='small'>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell className='fw-bold border-0 text-white'>SN</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Type</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Company Name</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Number</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Email</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>User Name</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>GST</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>PAN</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Charges</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Status</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Wallet Balance</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Wallet Limit</TableCell>
                            <TableCell className='fw-bold border-0 text-white' align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            WLList &&
                            WLList.map((user, i) => {
                                const admin = user.users.find(data => data.type === 'admin')
                                console.log('admin', admin);

                                return (
                                    <TableRow sx={{ bgcolor: i % 2 === 0 ? '' : 'white' }} key={i}>
                                        <TableCell className='fw-bold border-0'>{user?.serialNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.type}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.companyName}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.contactNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.contactEmail}</TableCell>
                                        <TableCell className='fw-bold border-0'>{admin?.userName}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.gst}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.pan}</TableCell>
                                        <TableCell className='fw-bold border-0'>{admin?.commissionId}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.status}</TableCell>
                                        <TableCell className='fw-bold border-0'>{admin?.wallet?.walletBalance || 0}</TableCell>
                                        <TableCell className='fw-bold border-0'>{admin?.wallet?.minimumBalance || 0}</TableCell>
                                        <TableCell className='fw-bold border-0' align='right'>
                                            <div>
                                                <button className='btn btn-dark' onClick={(e) => handleClickActionMenu(e, admin.id)}>
                                                    <IoSettings />
                                                </button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={openActionMenu}
                                                    onClose={handleCloseActionMenu}
                                                    // onClick={() => setCurrentUser(user)}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    {/* <MenuItem onClick={() => actionMenuItemClicked(user)}>Top Up User Wallet</MenuItem> */}
                                                    <MenuItem onClick={() => { setOpenModelAddWalletBalance(true); handleCloseActionMenu() }}>Top Up WL Wallet</MenuItem>
                                                    <MenuItem onClick={() => console.log('clicked1')}>Active/Deactive</MenuItem>
                                                    <MenuItem onClick={() => console.log('clicked1')}>Set Limit</MenuItem>
                                                </Menu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {/* <TableRow sx={{ bgcolor: userList?.length % 2 === 0 ? '' : 'white' }}> */}
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell colSpan={13} className='fw-bold border-0 p-2'>
                                <Pagination
                                    totalRows={totalRows}
                                    rowsPerPages={rowsPerPages}
                                    pageNumber={pageNumber}
                                    handleRowsPerPages={handleRowsPerPages}
                                    handlePageChange={handlePageChange}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

            <div>
                <Modal open={openModel} onClose={handleClose} >
                    <Box className='popUpStyling' sx={{ bgcolor: 'wheat', width: 800 }}>
                        <WhiteLabelAdd setOpenModel={setOpenModel} fetchWLList={fetchWLList} />
                    </Box>
                </Modal>
            </div>

            <div>
                <Modal open={openModelAddWalletBalance} onClose={handleCloseModelAddWalletBalance} >
                    <Box className='popUpStyling' sx={{ bgcolor: 'wheat', width: 800 }}>
                        <PageHead title='Top Up WL Wallet' />
                        <Paper elevation={3} sx={{ p: 2, bgcolor: '#D3D3D3', mt: 1 }} >
                            <div className='d-flex justify-content-start gap-2 align-items-center' style={{ width: '100%' }}>
                                <label htmlFor="amount" style={{ width: '150px' }}>Top Up Amount:</label>
                                <input type="text" id="amount" className='form-control' onChange={(e) => setUserWalletBalance(e.target.value)} value={userWalletBalance} />
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

export default WhiteLabelList