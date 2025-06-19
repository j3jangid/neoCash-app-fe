import React from 'react'

function ButtonFormat({ name, onClick, className, bgColor, color }) {
    return (
        <button
            className={`btn ${className}`}
            onClick={onClick || (() => { })}
            style={{
                backgroundColor: bgColor || '#4A9103',
                color: color || '#153045',
                fontWeight: 'bold'
            }}
        >
            {name}
        </button >
    )
}

export default ButtonFormat