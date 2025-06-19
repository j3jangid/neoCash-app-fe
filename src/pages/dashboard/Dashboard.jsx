import { Box, Paper, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs } from '@mui/material'
import { useState } from 'react'
import PageHead from '../../templets/PageHead';

function Dashboard() {
  const [value, setValue] = useState('Payin');

  const recentTrnx = [{}, {}, {}, {}, {}, {}, {}]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <PageHead title='Dashboard' />
      <div className='row m-0 mt-2'>
        <div className='col-6 p-0 '>
          <Paper elevation={3} sx={{ padding: 2, marginRight: 1, bgcolor: '#D3D3D3' }}>
            <h4>Payout</h4>
            <hr className='my-2' />
            <h5 className='themeBlueText'>Payout Balance - Today</h5>
            <h5>0.00₹</h5>
            <h5 className='themeBlueText'>Unsettled Balance</h5>
            <h5>0.00₹</h5>
          </Paper>
        </div>
        <div className='col-6 p-0'>
          <Paper elevation={3} sx={{ padding: 2, ml: 0, bgcolor: '#D3D3D3' }}>
            <h4>Payin</h4>
            <hr className='my-2' />
            <h5 className='themeBlueText'>Payin Balance - Today</h5>
            <h5>0.00₹</h5>
            <h5 className='themeBlueText'>Unsettled Balance</h5>
            <h5>0.00₹</h5>
          </Paper>
        </div>
      </div>
      <div>
        <Paper elevation={3} sx={{ padding: 2, mt: 1, bgcolor: '#D3D3D3' }}>
          <h4>Recent Transactions</h4>
          <hr className='my-2' />
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Payin" value={'Payin'} />
                <Tab label="Payout" value={'Payout'} />
              </Tabs>
            </Box>
          </Box>

          <Table size='small' sx={{ mt: 2 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'black' }}>
                <TableCell className='fw-bold border-0 text-white'>SN</TableCell>
                <TableCell className='fw-bold border-0 text-white'>Bank Name</TableCell>
                <TableCell className='fw-bold border-0 text-white'>Account Number</TableCell>
                <TableCell className='fw-bold border-0 text-white'>Holder name</TableCell>
                <TableCell className='fw-bold border-0 text-white'>IFSC</TableCell>
                <TableCell className='fw-bold border-0 text-white'>Status</TableCell>
                <TableCell className='fw-bold border-0 text-white'>Created By</TableCell>
                {/* <TableCell className='fw-bold border-0 text-white' align='right'>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                recentTrnx &&
                recentTrnx.map((account, i) => {
                  return (
                    <TableRow sx={{ bgcolor: i % 2 === 0 ? '' : 'white' }} key={i}>
                      <TableCell className='fw-bold border-0'>{i + 1}</TableCell>
                      <TableCell className='fw-bold border-0'>{account?.name}</TableCell>
                      <TableCell className='fw-bold border-0'>{account?.accountNumber}</TableCell>
                      <TableCell className='fw-bold border-0'>{account?.holderName}</TableCell>
                      <TableCell className='fw-bold border-0'>{account?.ifsc}</TableCell>
                      <TableCell className='fw-bold border-0'>{account?.status}</TableCell>
                      <TableCell className='fw-bold border-0'>{account?.creator?.name}</TableCell>
                      {/* <TableCell className='fw-bold border-0' align='right'>
                        <button className='btn btn-dark'>
                          <IoSettings />
                        </button>
                      </TableCell> */}
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  )
}

export default Dashboard