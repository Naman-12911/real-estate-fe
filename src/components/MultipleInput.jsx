import React from "react";

export default function MultipleInput({
  label,
  placeholder,
  type,
  isDisable,
  value,
  onChange,
  dataArray,
  option,
}) {
  return (
    <div className="flex flex-col md:w-5/12 w-full gap-3">
      {type === "text" && (
        <>
          <label htmlFor="">{label}</label>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border-transparent rounded shadow-md focus:border-indigo-500 dark:bg-slate-900 dark:border-slate-500 hover:border-slate-200 dark:hover:border-slate-400 text-black dark:text-white"
          />
        </>
      )}
      {type === "number" && (
        <>
          <label htmlFor="">{label}</label>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border-transparent rounded shadow-md focus:border-indigo-500 dark:bg-slate-900 dark:border-slate-500 hover:border-slate-200 dark:hover:border-slate-400 text-black dark:text-white"
          />
        </>
      )}
      {type === "select" && (
        <>
          <label htmlFor="">{label}</label>
          <select name="" id=""
		        className="w-full border-transparent rounded shadow-md focus:border-indigo-500  disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-slate-500 dark:hover:border-slate-400 dark:text-white">
            <option value="" className="py-10" disabled selected>{placeholder}</option>
            {option.map((item) => {
              return <option value={item.value} className="py-10">{item.label}</option>;
            })}
          </select>
        </>
      )}
      {type === "textarea" && (
        <>
          <label htmlFor="">{label}</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            value={value}
            onChange={onChange}
            className="w-full border-transparent rounded shadow-md focus:border-indigo-500 dark:bg-slate-900 dark:border-slate-500 hover:border-slate-200 dark:hover:border-slate-400 text-black dark:text-white"
            placeholder={placeholder}
          ></textarea>
        </>
      )}
    </div>
  );
}
