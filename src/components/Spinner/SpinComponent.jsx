import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function SpinComponent() {
    const { loading } = useSelector((state) => state.mainLoader);

    return (
        <div className={`position-relative ${!loading && 'd-none'}`}>
            <div className='bg-white position-fixed min-vw-100 min-vh-100 top-0 start-0 z-3'>
            </div>
            <div className='position-fixed start-0 top-0 min-vh-100 d-flex justify-content-center align-items-center z-3 w-100'>
                <Spinner className='' />
            </div>
        </div>
    )
}

export default SpinComponent