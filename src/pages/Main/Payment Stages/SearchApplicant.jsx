import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import SingleSelectInput from '../../../components/SingleSelectInput'
import Axios from '../../../Axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function SearchApplicant() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	
	const [data,setData]=useState([])

	const [selectedProject,setSelectedProject]=useState(0)
	const [selectedUnit,setSelectedUnit]=useState(0)


	const [project,setProject]=useState('')
	const [unit,setUnit]=useState('')

	useEffect(()=>{
		//Projects
		Axios.get('/misc/project/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>(
				{
					label:item.project_name,
					value:item.id
				}
			))
			setProject(data);
		})
		.catch(err=>{
			console.log(err)
		})

		//Units
		Axios.get(`/misc/unit-number-filter/?project_id=${selectedProject}&project=${selectedProject}`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			// setStatus(res.data.available?"AVAILABLE":res.data.hold?"HOLD":res.data.booked?"BOOKED":"CHECKING")
			// setUnitData(res.data)
			const data=res.data.map(item=>(
				{
					label:item.unit_no,
					value:item.unit_no
				}
			))
			setUnit(data);
		})
		.catch(err=>{
			console.log(err)
		})

		Axios.get(`/profile/filter-name-unitno/?unit_no=${selectedUnit}`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			setData(res.data)
		})
		.catch(err=>{
			console.log(err)
		})

	},[selectedProject,selectedUnit])
  return (
	<div>
	  <Heading title={"Payment Stages"} />
	  <div className="py-3 w-full   mx-auto space-y-5">
	  <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Applicant Search</h2>
      </header>
			<div className='px-5 py-4 flex items-center justify-between gap-5 flex-wrap'>
				<div className='md:w-2/5 w-full'>
					<SingleSelectInput label={'Project'} option={project || []} placeholder={"--Select Project--"} value={selectedProject} onChange={setSelectedProject}/>
				</div>
				<div className='md:w-2/5 w-full'>
					<SingleSelectInput label={'Unit Number'} option={unit || []} placeholder={"--Select Unit--"} value={selectedUnit} onChange={setSelectedUnit}/>
				</div>
				{/* <div className='flex items-center justify-center space-x-5 mt-5'>
					<Button title={'Search'}/>
					<Button title={'Clear'}/>
				</div> */}
			</div>
			{data.length>0?<div className="p-3">

{/* Table */}
<div className="overflow-x-auto">
  <table className="table-auto w-full">
	{/* Table header */}
	<thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
	  <tr >
	  <th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Name</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Project</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Unit No.</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center w-[110px]">Actions</div>
		</th>
	  </tr>
	</thead>
	{/* Table body */}
	<tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
	  {
		data.map(item => {
		  return (
			<tr key={item.id}>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center text-black dark:text-slate-300">{item.applicant_name}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{item.booking.project_names}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{item.booking.unit_nos}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap w-[110px]">
				<div className="flex items-center justify-between">
				  <div className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='View Stages' onClick={()=>navigate('/main/payment/viewpaymentstages',{state:item})}>
					<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 576 512">
						<path className=' fill-current ' d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"/>
					</svg>
				  </div>
				  <div className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='Add Stages' onClick={()=>navigate('/main/payment/addpaymentstages',{state:item})}>
					<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 512 512">
						<path className=' fill-current ' d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
					</svg>
				  </div>
				</div>
			  </td>
			</tr>
		  )
		})
	  }
	</tbody>
  </table>
</div>
</div>:""}
			
	  </div>
	  </div>
	</div>
  )
}
