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
	  <Heading title={"Client Loan File"} />
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
				<div className="flex items-center justify-center">
				  <div className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='Add Client Loan' onClick={()=>navigate('/main/clientloanfile/bankinformation',{state:item})}>
					<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 640 512">
						<path className='fill-current' d="M581.107 140.023L573.314 147.816L545.145 176.232C553.404 176.852 560 183.584 560 192V448C560 456.822 552.822 464 544 464H96C87.178 464 80 456.822 80 448V192C80 183.178 87.178 176 96 176H323.475C325.896 169.9 329.486 164.262 334.197 159.578L366.053 128H96C60.654 128 32 156.654 32 192V448C32 483.346 60.654 512 96 512H544C579.348 512 608 483.346 608 448V192C608 170.527 597.334 151.633 581.107 140.023ZM352 193.66V256H414.34C418.604 256 422.689 254.297 425.693 251.273L550.625 125.25L482.75 57.375L356.727 182.305C353.701 185.312 352 189.398 352 193.66ZM600.5 75.375C610.5 65.375 610.5 49.25 600.5 39.375L568.625 7.5C563.688 2.5 557.188 0 550.672 0S537.625 2.5 532.625 7.5L505.375 34.75L573.25 102.625L600.5 75.375ZM152 400H488C501.25 400 512 389.25 512 376S501.25 352 488 352H152C138.75 352 128 362.75 128 376S138.75 400 152 400ZM152 288H296C309.25 288 320 277.25 320 264S309.25 240 296 240H152C138.75 240 128 250.75 128 264S138.75 288 152 288Z"/>
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
