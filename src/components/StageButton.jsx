import React from 'react'

export default function StageButton({worker,admin,delay,onClick,title,type,icon,targetStage,acceptTarget}) {
  return (
	<button
	className={`btn ${admin?'bg-green-500 hover:bg-green-600':(worker && targetStage==title)?'bg-yellow-400 hover:bg-yellow-500 shadow-[0_0_50px_8px_rgba(250,204,21,1)] hover:shadow-[0_0_50px_8px_rgba(234,179,8,1)]':worker?'bg-yellow-500 hover:bg-yellow-600':(targetStage==title&&acceptTarget)?'bg-amber-700 hover:bg-amber-800':targetStage==title?'bg-blue-500 hover:bg-blue-600':delay?' bg-red-500 hover:bg-red-600':'bg-slate-100 hover:bg-slate-200'} ${delay||admin||worker ?'text-white':'text-black'} px-8 gap-2 shadow-lg`} onClick={onClick}
	type={type}
	>
	{icon&&icon}
	{title}</button>
  )
}
