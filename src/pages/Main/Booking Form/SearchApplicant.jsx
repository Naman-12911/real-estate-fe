import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import SingleSelectInput from '../../../components/SingleSelectInput'
import Axios from '../../../Axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../../../components/Button'


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
		  <div className="font-semibold text-center w-[130px]">Actions</div>
		</th>
	  </tr>
	</thead>
	{/* Table body */}
	<tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
	  {
		data?.map(item => {
		  return (
			<tr key={item.id}>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center text-black dark:text-slate-300">{item?.applicant_name}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{item?.booking?.project_names}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{item?.booking?.unit_nos}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap w-[130px]">
				<div className="flex items-center justify-between gap-5">
				  <Button title={"Booking Form"} onClick={()=>navigate('/main/bf/editbookingform/printform',{state:item})}/>
				  <Button title={"Tentative Cost From"} onClick={()=>navigate('/main/bf/editbookingform/printviewbookingcostform',{state:item})}/>
				  <Button title={"Edit Project Details"} onClick={()=>navigate('/main/bf/editbookingform/projectdetails',{state:item})}/>
				  <Button title={"Edit Personal Details"} onClick={()=>navigate('/main/bf/editbookingform/personaldetails',{state:item})}/>
				  <Button title={"Edit Co-Applicant Details"} onClick={()=>navigate('/main/bf/editbookingform/co-applicantdetails',{state:item})}/>
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
