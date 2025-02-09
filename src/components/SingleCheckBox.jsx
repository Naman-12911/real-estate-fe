import React from 'react'

export default function SingleCheckBox({onChange,checked}) {
  return (
	<input type='checkbox' onChange={onChange} checked={checked} className='outline-none active:p-0 text-indigo-500 checked:bg-indigo-500 active:w-4 active:h-4'/>
  )
}
