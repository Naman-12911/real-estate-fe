import React from "react";

export default function SearchInput({placeholder,value,onChange}) {
  return (
    <div className="flex items-center justify-start px-2 py-2 h-9 w-80 bg-white dark:bg-slate-800 border rounded shadow-sm  focus:border-indigo-500  dark:border-slate-500 hover:border-slate-200 dark:hover:border-slate-400 text-black dark:text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4 cursor-pointer fill-current text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
        <path className="" d="M504.969 471.031L370.959 337.023C399.084 301.547 416 256.785 416 208C416 93.125 322.875 0 208 0S0 93.125 0 208S93.125 416 208 416C256.785 416 301.549 399.086 337.021 370.961L471.031 504.969C475.719 509.656 481.859 512 488 512S500.281 509.656 504.969 504.969C514.344 495.594 514.344 480.406 504.969 471.031ZM48 208C48 119.777 119.775 48 208 48S368 119.777 368 208S296.225 368 208 368S48 296.223 48 208Z" />
      </svg>
      <input type="text" placeholder={placeholder} value={value} onChange={onChange} className="border-none text-sm focus:ring-transparent bg-transparent text-black dark:text-white"/>
    </div>
  );
}
