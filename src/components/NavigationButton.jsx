import React from 'react'

export default function NavigationButton({title,direction,isDisabled}) {
  return (
	<button disabled={isDisabled} className='flex justify-center items-center border gap-1 bg-white shadow-md py-2 px-3 rounded disabled:bg-slate-50 disabled:text-slate-300 dark:border-slate-700 dark:hover:border-slate-600 hover:border-slate-300 transition-all dark:bg-slate-800'>
		{direction=="Left" && 
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className=' w-3 h-3'>
			<path className={`fill-current ${isDisabled?"dark:text-slate-600":"text-indigo-500"}`} d="M447.984 256.008C447.984 269.258 437.234 280.008 423.984 280.008H83.895L216.562 406.633C226.187 415.789 226.531 431.039 217.375 440.57C208.219 450.164 193.031 450.508 183.437 441.383L7.437 273.383C2.688 268.852 0 262.57 0 256.008S2.688 243.164 7.438 238.633L183.438 70.633C193.031 61.508 208.219 61.852 217.375 71.445C226.531 80.945 226.188 96.195 216.563 105.383L83.895 232.008H423.984C437.234 232.008 447.984 242.758 447.984 256.008Z"/>
		</svg>}
		<span className={`font-semibold text-sm ${isDisabled?"dark:text-slate-600":"text-indigo-500"}`}>{title}</span>
		{direction=="Right" && 
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className=' w-3 h-3'>
			<path className={`fill-current ${isDisabled?"dark:text-slate-600":"text-indigo-500"}`} d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z"/>
		</svg>}
	</button>
  )
}
