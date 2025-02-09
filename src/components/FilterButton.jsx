import React from 'react'

export default function FilterButton({isActive,title,value}) {
  return (
	<div className={`flex justify-center items-center space-x-2 py-1 px-3 border rounded-full cursor-pointer ${isActive?"bg-indigo-500":"dark:bg-slate-800 bg-white"} shadow-sm dark:border-slate-700 dark:hover:border-slate-600 hover:border-slate-300 transition-all`}>
		<span className='select-none text-black dark:text-white text-sm'>{title}</span>
		<span className='select-none text-slate-600 dark:text-slate-300 text-sm'>{value}</span>
	</div>
  )
}
