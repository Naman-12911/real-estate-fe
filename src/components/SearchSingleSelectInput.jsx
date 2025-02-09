import React from 'react'

export default function SearchSingleSelectInput({label,option,placeholder,onChange,value,isDisable}) {
  return (
	<div className='w-full'>
		<label htmlFor="">{label}</label>
          <select name="" id="" onChange={onChange} value={value} required disabled={isDisable}
		        className="w-full h-9 border-slate-200 rounded shadow-md focus:border-indigo-500  disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-slate-500 dark:hover:border-slate-400 dark:text-white">
            <option value="" className="py-10" selected>--{placeholder}--</option>
            {option&&option.map((item,index) => {
              return <option key={index} value={item.value} className="py-10">{item.label}</option>;
            })}
          </select>
	</div>
  )
}
