import { Box, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import Pagination from '../../templets/Pagination'
import { IoSettings } from 'react-icons/io5'
import PageHead from '../../templets/PageHead'
import axiosInstance from '../../config/axiosInstance'
import CustomerAdd from './CustomerAdd'

function CustomerList() {
    const [openModel, setOpenModel] = useState(false)
    const [rowsPerPages, setRowsPerPages] = useState(20)
    const [pageNumber, setPageNumber] = useState(1)
    const handleClose = () => setOpenModel(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const openActionMenu = Boolean(anchorEl);
    const [customerList, setCustomerList] = useState([])
    const [totalRows, setTotalRows] = useState(0)

    console.log('customerList', customerList);


    const handleClickActionMenu = (event, userId) => {
        setAnchorEl(event.currentTarget);
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

    async function fetchCustomerList() {
        try {
            const response = await axiosInstance.get('/ledger', {
                params: {
                    type: 'customer',
                    rowsPerPages,
                    pageNumber,
                }
            })
            console.log('response.data.data', response.data.data);

            const { totalCount, data } = response.data.data
            setCustomerList(data)
            setTotalRows(totalCount)
        } catch (error) {
            console.error('error while fetchingt Customer list', error);
        }
    }

    useEffect(() => {
        void fetchCustomerList()
    }, [rowsPerPages, pageNumber])
    return (
        <div>
            <PageHead title='Customer List' btn='New Customer' onClick={() => setOpenModel(true)} />
            <Paper elevation={3} sx={{ padding: 2, mt: 1, bgcolor: '#D3D3D3' }}  >
                <Table size='small'>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell className='fw-bold border-0 text-white'>SN</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Name</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Number</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Email</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Status</TableCell>
                            <TableCell className='fw-bold border-0 text-white' align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            customerList &&
                            customerList.map((payout, i) => {
                                return (
                                    <TableRow sx={{ bgcolor: i % 2 === 0 ? '' : 'white' }} key={i}>
                                        <TableCell className='fw-bold border-0'>{payout?.serialNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payout?.name}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payout?.number}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payout?.email}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payout?.status}</TableCell>
                                        <TableCell className='fw-bold border-0' align='right'>
                                            <div>
                                                <button className='btn btn-dark' onClick={(e) => handleClickActionMenu(e, payout.id)}>
                                                    <IoSettings />
                                                </button>
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
                                                    <MenuItem onClick={() => console.log('clicked')}>Edit</MenuItem>
                                                </Menu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {/* <TableRow sx={{ bgcolor: userList?.length % 2 === 0 ? '' : 'white' }}> */}
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell colSpan={6} className='fw-bold border-0 p-2'>
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
                        <CustomerAdd setOpenModel={setOpenModel} fetchCustomerList={fetchCustomerList} />
                    </Box>
                </Modal>
            </div>
        </div >
    )
}

export default CustomerList