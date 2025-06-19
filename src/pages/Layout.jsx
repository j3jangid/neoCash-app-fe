import React from 'react'
import Navbar from './Navbar'
import AllRoutes from './AllRoutes'

function Layout() {
    return (
        <div style={{height:'100%'}}>
            <div style={{ height: '50px' }}>
                <Navbar />
            </div>
            <div className='p-2' style={{ backgroundColor: 'wheat', height: 'calc(100vh - 50px)' }}>
                <AllRoutes />
            </div>
        </div>
    )
}

export default Layout