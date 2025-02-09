import React from 'react'

export default function ConstructorStageButton({title,onClick,completed,completedBefore,targetDate}) {
	const currentDate = new Date();
	const newTargetDate=new Date(targetDate??'');
  return (
	<button
		className={`btn ${completedBefore?'bg-yellow-400 shadow-[0_0_50px_8px_rgba(234,179,8,0.6)]  hover:bg-yellow-500  hover:shadow-[0_0_50px_8px_rgba(234,179,8,1)]':completed?"bg-green-500 hover:bg-green-600":(currentDate>newTargetDate)?"bg-red-500 hover:bg-red-600":targetDate?"bg-yellow-500 hover:bg-yellow-600":"bg-slate-100 hover:bg-slate-200"} ${(completed||completedBefore||targetDate)?"text-white":"text-black"} px-8 gap-2 shadow-lg`} onClick={onClick}
	>
	{title}</button>
  )
}
