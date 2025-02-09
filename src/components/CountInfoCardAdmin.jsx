import React from 'react'
import useFormatNumber from '../function/formatNumber';

export default function CountInfoCardAdmin({title,count,onClick,cursor}) {
	const {formatNumber}=useFormatNumber();
  return (
	
	// <div onClick={onClick} className={`xl:w-1/5 h-14 w-full bg-white dark:bg-slate-700 rounded-md shadow-md flex items-center justify-normal p-2 gap-2 cursor-${cursor??'pointer'}`}>
	// 	<div className='w-4/5 flex items-center justify-start'>
	// 		<p className='font-semibold xl:text-sm text-xs dark:text-white'>{title}</p>
	// 	</div>
	// 	<div className='w-1/5 flex items-center justify-between'>
	// 		<p className='text-xl font-semibold dark:text-white'>|</p>
	// 		<p className='font-semibold xl:text-sm text-xs dark:text-white'>{formatNumber(count)}</p>
	// 	</div>
	// </div>
	<div onClick={onClick} className={`md:w-44 md:h-44 sm:w-32 sm:h-32 w-20 h-20 p-1 bg-white dark:bg-slate-700 rounded-md shadow-md flex items-center flex-col sm:justify-center justify-between gap-1 cursor-${cursor??'pointer'}`}>
		<svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 md:h-10 md:w-10 h-5 w-5" viewBox="0 0 640 512">
                      <path className={`fill-current text-indigo-300`} d="M479.588 320H405.74C450.771 357.695 479.59 414.148 479.59 477.332C479.59 490.07 475.814 501.867 469.592 512H607.592C625.26 512 639.59 497.672 639.59 480C639.59 391.633 567.957 320 479.588 320ZM431.59 256C493.449 256 543.59 205.855 543.59 144S493.449 32 431.59 32C406.482 32 383.549 40.555 364.871 54.512C376.428 76.625 383.59 101.371 383.59 128C383.59 163.523 371.658 196.137 352 222.711C372.303 243.242 400.439 256 431.59 256Z"/>
                      <path className={`fill-current text-indigo-500`} d="M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304Z"/>
                    </svg>
		<p className='font-semibold sm:text-lg text-xs dark:text-white text-center'>{formatNumber(count)}</p>
		<p className='font-semibold sm:text-base text-[10px] dark:text-white text-center '>{title}</p>
	</div>
  )
}
