import React from 'react'

export default function Heading({title}) {
  return (
	<div className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
	  <h1>{title}</h1>
	</div>
  )
}
