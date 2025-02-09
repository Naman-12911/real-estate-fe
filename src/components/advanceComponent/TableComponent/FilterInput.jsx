import React, { useEffect, useState } from 'react'

export default function FilterInput({type,value: initialValue,onChange,placeholder}) {
	const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
      onChange(value);
  }, [value]);

  return (
	<input
            required
            type={type}
            value={value}
			onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
           className={`w-56 h-[2.4rem] border-slate-200 text-sm rounded focus:border-indigo-500 dark:bg-slate-900 dark:border-slate-500 hover:border-slate-200 dark:hover:border-slate-400 text-black dark:text-white`}  
          />
  )
}
