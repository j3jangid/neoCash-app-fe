import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

function Pagination({ totalRows, rowsPerPages, pageNumber, handleRowsPerPages, handlePageChange }) {

    // copy past this to use Pagination

    // const [totalRows, setTotalRows] = useState(0)
    // const [rowsPerPages, setRowsPerPages] = useState(20)
    // const [pageNumber, setPageNumber] = useState(1)

    // function handleRowsPerPages(e) {
    //     setRowsPerPages(e.target.value)
    // }

    // function handlePageChange(e, type) {
    //     setPageNumber(type === 'plus' ? pageNumber + 1 : pageNumber - 1)
    // }

    return (
        <div className='d-flex align-items-center justify-content-end gap-2 text-light'>
            <div>
                <p className='m-0'>Total Rows:</p>
            </div>
            <div style={{ width: '5%' }}>
                <input className='form-control' type="number" disabled value={totalRows} />
            </div>
            <div>
                <p className='m-0'>Rows Per Pages:</p>
            </div>
            <div>
                <select className='form-select' value={rowsPerPages} onChange={handleRowsPerPages}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div>
                <button
                    className='btn btn-light'
                    onClick={() => handlePageChange('minus')}
                    disabled={pageNumber <= 1}
                >
                    <FaMinus />
                </button>
            </div>
            <div style={{ width: '5%' }}>
                <input className='form-control' type="number" disabled value={pageNumber} />
            </div>
            <div>
                <button
                    className='btn btn-light'
                    onClick={() => handlePageChange('plus')}
                    disabled={pageNumber <= (Math.ceil(totalRows / rowsPerPages))}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default Pagination