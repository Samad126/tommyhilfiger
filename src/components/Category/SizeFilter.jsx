import React from 'react'

function SizeFilter({idx, size, sizeFilter, handleFilterChange}) {
    return (
        <div className="mb-2">
            <input
                type="checkbox"
                id={`size-${idx}`}
                value={size}
                checked={sizeFilter?.includes(size)}
                onChange={() => handleFilterChange("size", size)}
            />
            <label htmlFor={`size-${idx}`} className="ms-2">
                {size}
            </label>
        </div>
    )
}

export default SizeFilter