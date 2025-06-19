import { useEffect, useState } from 'react'
import PageHead from '../../templets/PageHead'
import { Box, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import axiosInstance from '../../config/axiosInstance'
import { IoSettings } from "react-icons/io5";
import Pagination from '../../templets/Pagination'
import BankAdd from './BankAdd'

function BankList() {
    const [openModel, setOpenModel] = useState(false)
    const [rowsPerPages, setRowsPerPages] = useState(20)
    const [pageNumber, setPageNumber] = useState(1)
    const [bankList, setBankList] = useState([])
    const [totalRows, setTotalRows] = useState(0)
    const handleClose = () => setOpenModel(false)

    function handleRowsPerPages(e) {
        setRowsPerPages(e.target.value)
    }

    function handlePageChange(e, type) {
        setPageNumber(type === 'plus' ? pageNumber + 1 : pageNumber - 1)
    }


    async function fetchBankAccounts() {
        try {
            const response = await axiosInstance.get('/ledger', {
                params: {
                    type: 'bank',
                    rowsPerPages,
                    pageNumber,
                }
            })
            const { totalCount, data } = response.data.data
            setBankList(data)
            setTotalRows(totalCount)
        } catch (error) {
            console.error('Error fetch Bank List: ', error);
        }
    }
    useEffect(() => {
        void fetchBankAccounts()
    }, [pageNumber, rowsPerPages])

    return (
        <div>
            <PageHead title='Bank List' btn='Add Bank' onClick={() => setOpenModel(true)} />
            <Paper elevation={3} sx={{ padding: 2, mt: 1, bgcolor: '#D3D3D3' }}  >
                <Table size='small'>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell className='fw-bold border-0 text-white'>SN</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Bank Name</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Account Number</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Holder name</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>IFSC</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Status</TableCell>
                            <TableCell className='fw-bold border-0 text-white'>Created By</TableCell>
                            <TableCell className='fw-bold border-0 text-white' align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bankList &&
                            bankList.map((account, i) => {
                                return (
                                    <TableRow sx={{ bgcolor: i % 2 === 0 ? '' : 'white' }} key={i}>
                                        <TableCell className='fw-bold border-0'>{account?.serialNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{account?.name}</TableCell>
                                        <TableCell className='fw-bold border-0'>{account?.accountNumber}</TableCell>
                                        <TableCell className='fw-bold border-0'>{account?.holderName}</TableCell>
                                        <TableCell className='fw-bold border-0'>{account?.ifsc}</TableCell>
                                        <TableCell className='fw-bold border-0'>{account?.status}</TableCell>
                                        <TableCell className='fw-bold border-0'>{account?.creator?.name}</TableCell>
                                        <TableCell className='fw-bold border-0' align='right'>
                                            <button className='btn btn-dark'>
                                                <IoSettings />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {/* <TableRow sx={{ bgcolor: bankList?.length % 2 === 0 ? '' : 'white' }}> */}
                        <TableRow sx={{ bgcolor: 'black' }}>
                            <TableCell colSpan={8} className='fw-bold border-0 p-2'>
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
                        <BankAdd setOpenModel={setOpenModel} fetchBankAccounts={fetchBankAccounts} />
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default BankList