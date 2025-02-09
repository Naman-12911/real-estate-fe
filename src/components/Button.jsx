import React from 'react'

export default function Button({title,icon,onClick,type}) {
  return (
	<button
	className="btn bg-indigo-500 hover:bg-indigo-600 text-white px-8 gap-2 md:w-auto w-full" onClick={onClick}
	type={type}
	>
	{icon&&icon}
	{title}</button>
  )
}
