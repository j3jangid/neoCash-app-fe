import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import PageHead from '../../templets/PageHead'
import { Box, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Pagination from '../../templets/Pagination'
import { IoSettings } from 'react-icons/io5'
import CommissionAdd from './CommissionAdd'

function CommissionList() {
    const [openModel, setOpenModel] = useState(false)
    const [rowsPerPages, setRowsPerPages] = useState(20)
    const [pageNumber, setPageNumber] = useState(1)
    const [commissionList, setCommissionList] = useState([])
    const [totalRows, setTotalRows] = useState(0)
    const handleClose = () => setOpenModel(false)

    function handleRowsPerPages(e) {
        setRowsPerPages(e.target.value)
    }

    function handlePageChange(e, type) {
        setPageNumber(type === 'plus' ? pageNumber + 1 : pageNumber - 1)
    }

    async function fetchCommissionSlabs() {
        try {
            const response = await axiosInstance.get('/ledger', {
                params: {
                    type: 'commission',
                    rowsPerPages,
                    pageNumber,
                }
            })
            const { totalCount, data } = response.data.data
            setCommissionList(data)
            setTotalRows(totalCount)
        } catch (error) {
            console.error('Error fetch User List: ', error);
        }
    }
    useEffect(() => {
        void fetchCommissionSlabs()
    }, [pageNumber, rowsPerPages])
    return (
        <div>
            <PageHead title='Commission Slabs' btn='Add Commission Slab' onClick={() => setOpenModel(true)} />
            <Paper elevation={3} sx={{ padding: 2, mt: 1, bgcolor: '#D3D3D3' }}  >
                <Table size='small'>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell className='fw-bold border-0 text-white'>SN</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Name</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Rate</TableCell>
                            <TableCell className='fw-bold border-0 text-white' align='right'>Status</TableCell>
                            <TableCell className='fw-bold border-0 text-white' align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            commissionList &&
                            commissionList.map((user, i) => {
                                return (
                                    <TableRow sx={{ bgcolor: i % 2 === 0 ? '' : 'white' }} key={i}>
                                        <TableCell className='fw-bold border-0'>{user?.serialNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.name}</TableCell>
                                        <TableCell className='fw-bold border-0'>{user?.commission}%</TableCell>
                                        <TableCell className='fw-bold border-0' align='right'>{user?.status}</TableCell>
                                        <TableCell className='fw-bold border-0' align='right'>
                                            <button className='btn btn-dark'>
                                                <IoSettings />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {/* <TableRow sx={{ bgcolor: commissionList?.length % 2 === 0 ? '' : 'white' }}> */}
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell colSpan={5} className='fw-bold border-0 p-2'>
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
                        <CommissionAdd setOpenModel={setOpenModel} fetchCommissionSlabs={fetchCommissionSlabs} />
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default CommissionList