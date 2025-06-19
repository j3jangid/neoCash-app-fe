import { Paper } from '@mui/material'
import React from 'react'

function PageHead({ title, btn, onClick }) {
    return (
        <Paper elevation={3} className='d-flex align-items-center justify-content-between' sx={{ paddingX: 2, paddingY:1, bgcolor:'#D3D3D3' }}>
            <h3 className=''>{title}</h3>
            {
                btn &&
                <button className='btn btn-dark themeBlueBg themeGreenText fw-bold' onClick={onClick || (() => { })}>{btn}</button>
            }
        </Paper>
    )
}

export default PageHead