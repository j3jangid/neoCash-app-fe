import { Box, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Pagination from '../../templets/Pagination';
import { IoSettings } from 'react-icons/io5';
import PageHead from '../../templets/PageHead';
import { useEffect, useState } from 'react';
import PayoutAdd from './PayoutAdd';
import axiosInstance from '../../config/axiosInstance';

function PayoutList() {
  const [openModel, setOpenModel] = useState(false)
  const [rowsPerPages, setRowsPerPages] = useState(20)
  const [pageNumber, setPageNumber] = useState(1)
  const handleClose = () => setOpenModel(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const openActionMenu = Boolean(anchorEl);
  const [payoutList, setPayoutList] = useState([])
  const [totalRows, setTotalRows] = useState(0)

  console.log('payoutList', payoutList);


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

  async function fetchPayoutList() {
    try {
      const response = await axiosInstance.get('/payout', {
        params: {
          rowsPerPages,
          pageNumber,
        }
      })
      console.log('response.data.data', response.data.data);

      const { totalCount, data } = response.data.data
      setPayoutList(data)
      setTotalRows(totalCount)
    } catch (error) {
      console.error('error while fetchingt payout list', error);
    }
  }

  useEffect(() => {
    void fetchPayoutList()
  }, [rowsPerPages, pageNumber])

  return (
    <div>
      <PageHead title='Payout List' btn='New Payout' onClick={() => setOpenModel(true)} />
      <Paper elevation={3} sx={{ padding: 2, mt: 1, bgcolor: '#D3D3D3' }}  >
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
              payoutList &&
              payoutList.map((payout, i) => {
                return (
                  <TableRow sx={{ bgcolor: i % 2 === 0 ? '' : 'white' }} key={i}>
                    <TableCell className='fw-bold border-0'>{payout?.serialNumber}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.createdAt?.split('T')[0]}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.tnnxNumber}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.toLedger?.name}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.toLedger?.accountNumber}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.toLedger?.holderName}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.toLedger?.ifsc}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.groupedLedgerEntries?.bank?.[0]?.amount}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.groupedLedgerEntries?.commission?.[0]?.amount || 0}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.groupedLedgerEntries?.tax?.[0]?.amount || 0}</TableCell>
                    <TableCell className='fw-bold border-0'>{payout?.amount}</TableCell>
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
            <PayoutAdd setOpenModel={setOpenModel} fetchPayoutList={fetchPayoutList} />
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default PayoutList