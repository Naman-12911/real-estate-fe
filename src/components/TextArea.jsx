import React from 'react'

export default function TextArea({value,onChange,placeholder,label}) {
  return (
	<div>
          <label htmlFor="">{label}</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            value={value}
            onChange={onChange}
            className="w-full border-slate-200 rounded shadow-md focus:border-indigo-500 dark:bg-slate-900 dark:border-slate-500 hover:border-slate-200 dark:hover:border-slate-400 text-black dark:text-white"
            placeholder={placeholder}
          ></textarea>
        </div>
  )
}
