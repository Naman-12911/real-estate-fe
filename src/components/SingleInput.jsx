import React from 'react'

export default function SingleInput({label,type,value,onChange,placeholder,isDisable,name}) {
  return (
	<div>
	  <label htmlFor="">{label}</label>
          <input
            required
            name={name}
            type={type}
            value={value}
            disabled={isDisable}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full border-slate-200 rounded shadow-md focus:border-indigo-500 ${isDisable?'bg-slate-50 dark:bg-slate-800':'dark:bg-slate-900'} dark:border-slate-500 hover:border-slate-200 dark:hover:border-slate-400 text-black dark:text-white`} 
          />
	</div>
  )
}
