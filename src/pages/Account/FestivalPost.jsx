import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import Axios from '../../Axios'
import { useSelector } from 'react-redux';
import { baseURL } from '../../Constant';


export default function FestivalPost() {
	const accessToken=useSelector((state)=>state.user.user);
	const [data,setData]=useState('');

	useEffect(()=>{
		Axios.get('/fest/festival/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			// console.log(res.data)
			setData(res.data);
		})
		.catch(err=>{
			console.log(err.response.data)
		})
	},[])


  return (
	<div>
      <Heading title={"Festival Post"} />
      <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
           Images and Files
          </h2>
        </header>
        <div className="p-8 w-full   mx-auto">
          <div className="flex justify-center items-center space-y-10 flex-col">
				{data&&data.map(item=>(
					item.image?<img src={`${baseURL}${item.image.slice(1)}`} alt="" />:item.file?<a href={`${baseURL}${item.file.slice(1)}`} target='_blank' className=' no-underline text-blue-500 cursor-pointer'>Check PDF</a>:''
				))}
          </div>
        </div>
      </div>
    </div>
  )
}
