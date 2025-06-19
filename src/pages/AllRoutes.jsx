import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import BankList from './bank/BankList'
import PayoutList from './payout/PayoutList'
import UserList from './user/UserList'
import LedgerReport from './ledger/LedgerReport'
import CommissionList from './commission/CommissionList'
import WhiteLabelList from './whiteLabel/WhiteLabelList'
import PayinList from './payin/PayinList'
import CustomerList from './customer/CustomerList'

function AllRoutes() {
    return (
        <Routes>
            <Route path='/:clientId/dashboard' Component={Dashboard} />
            <Route path='/:clientId/bank' Component={BankList} />
            <Route path='/:clientId/commission' Component={CommissionList} />
            <Route path='/:clientId/customer' Component={CustomerList} />
            <Route path='/:clientId/payout' Component={PayoutList} />
            <Route path='/:clientId/payin' Component={PayinList} />
            <Route path='/:clientId/user' Component={UserList} />
            <Route path='/:clientId/ledger-report' Component={LedgerReport} />
            <Route path='/:clientId/whiteLabel' Component={WhiteLabelList} />

            <Route path='*' Component={Dashboard} />
        </Routes>
    )
}

export default AllRoutes