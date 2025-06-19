import React, { useEffect, useState } from 'react'
import PageHead from '../../templets/PageHead'
import { Box, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { IoSettings } from 'react-icons/io5'
import Pagination from '../../templets/Pagination'
import PayinAdd from './PayinAdd'
import axiosInstance from '../../config/axiosInstance'

function PayinList() {
    const [openModel, setOpenModel] = useState(false)
    const [rowsPerPages, setRowsPerPages] = useState(20)
    const [pageNumber, setPageNumber] = useState(1)
    const handleClose = () => setOpenModel(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const openActionMenu = Boolean(anchorEl);
    const [payinList, setPayinList] = useState([])
    const [totalRows, setTotalRows] = useState(0)

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

    async function fetchPayinList() {
        try {
            const response = await axiosInstance.get('/payout', {
                params: {
                    rowsPerPages,
                    pageNumber,
                }
            })
            console.log('response.data.data', response.data.data);

            const { totalCount, data } = response.data.data
            setPayinList(data)
            setTotalRows(totalCount)
        } catch (error) {
            console.error('error while fetchingt payout list', error);
        }
    }

    useEffect(() => {
        void fetchPayinList()
    }, [rowsPerPages, pageNumber])
    return (
        <div>
            <PageHead title='Payin List' btn='New Payin' onClick={() => setOpenModel(true)} />
            <Paper elevation={3} sx={{ padding: 2, mt: 1, bgcolor: '#D3D3D3' }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell className='fw-bold border-0 text-white'>SN</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Date</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Trnx Id</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Bank Name</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Acc. Number</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Holder Name</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Ifsc</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Amount</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Charge</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Tax</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Total</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Status</TableCell>
                            <TableCell className='fw-bold border-0 text-white' align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            payinList &&
                            payinList.map((payin, i) => {
                                return (
                                    <TableRow sx={{ bgcolor: i % 2 === 0 ? '' : 'white' }} key={i}>
                                        <TableCell className='fw-bold border-0'>{payin?.serialNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.createdAt?.split('T')[0]}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.payinNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.toLedger?.name}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.toLedger?.accountNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.toLedger?.holderName}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.toLedger?.ifsc}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.groupedLedgerEntries?.bank?.[0]?.amount}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.groupedLedgerEntries?.commission?.[0]?.amount || 0}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.groupedLedgerEntries?.tax?.[0]?.amount || 0}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.amount}</TableCell>
                                        <TableCell className='fw-bold border-0'>{payin?.status}</TableCell>
                                        <TableCell className='fw-bold border-0' align='right'>
                                            <div>
                                                <button className='btn btn-dark' onClick={(e) => handleClickActionMenu(e, payin.id)}>
                                                    <IoSettings />
                                                </button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={openActionMenu}
                                                    onClose={handleCloseActionMenu}
                                                    // onClick={() => setCurrentUser(payin)}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    {/* <MenuItem onClick={() => actionMenuItemClicked(payin)}>Top Up payin Wallet</MenuItem> */}
                                                    <MenuItem onClick={() => console.log('clicked3')}>Check Status</MenuItem>
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
                        <PayinAdd setOpenModel={setOpenModel} fetchPayinList={fetchPayinList} />
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default PayinList