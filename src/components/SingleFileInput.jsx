import React from 'react'

export default function SingleFileInput({label,onChange}) {
  return (
	<div className="block cursor-pointer my-3">
		<label htmlFor="">{label}</label>
      <input type="file" onChange={onChange} className="block w-full text-sm text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-500 file:text-white
        hover:file:bg-indigo-600
        file:disabled:opacity-50 file:disabled:pointer-events-none
		 cursor-pointer
      "/>
    </div>
  )
}
