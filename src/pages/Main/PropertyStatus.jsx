import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import SingleInput from '../../components/SingleInput'
import Axios from '../../Axios'
import SingleSelectInput from '../../components/SingleSelectInput'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../app/User'

export default function PropertyStatus() {
	const dispatch=useDispatch();
	dispatch(userLogin());
	const accessToken=useSelector((state)=>state.user.user);

	const [selectedProject,setSelectedProject]=useState(0)
	const [selectedUnit,setSelectedUnit]=useState(0)
	const [selectedStatus,setSelectedStatus]=useState(0);

	const [totalUnit, setTotalUnit] = useState('');
	const [bookedUnit, setBookedUnit] = useState('');
	const [availableUnit, setAvailableUnit] = useState('');
	const [holdUnit, setHoldUnit] = useState('');
	const [unit,setUnit]=useState('')

	const [project,setProject]=useState('')
	

	useEffect(()=>{
		//Projects
		Axios.get('/misc/project/',{
			headers:{
				Authorization: `Bearer ${accessToken}`
			   }
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>(
				{
					label:item.project_name,
					value:item.project_name
				}
			))
			setProject(data);
		})
		.catch(err=>{
			console.log(err)
		})
		
		//
		Axios.get(`/misc/phase-number-filter/?project_name=${selectedProject}&&${selectedStatus}=True`,{
			headers:{
				Authorization: `Bearer ${accessToken}`
			   }
		})
		.then(res=>{
			// console.log(res.data)
			setTotalUnit(res.data.total_units)
			setBookedUnit(res.data.total_booked)
			setAvailableUnit(res.data.total_available)
			setHoldUnit(res.data.total_hold)
			setUnit(res.data.phases)
		})
		.catch(err=>{
			console.log(err)
		})
	},[selectedProject,selectedUnit,selectedStatus])
  return (
	<div>
	  <Heading title={"Property Status"}/>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Propertry Status</h2>
      </header>
	  <div className="p-8 w-full   mx-auto flex items-start justify-evenly flex-wrap gap-5">
			<div className='md:w-1/4 w-full'>
				<SingleSelectInput label={"Project"}  placeholder={"--Select Project--"}  onChange={setSelectedProject} option={project || []}/>
			</div>
			<div className='md:w-1/4 w-full'>
				<SingleSelectInput label={"Status"} placeholder={"--Select Status--"} onChange={setSelectedStatus} option={[{value:"available",label:"AVAILABLE"},{value:"booked",label:"BOOKED"},{value:"hold",label:"HOLD"},]}/>
			</div>
	  </div>
	  <div className="p-3">

{/* Table */}
<div className="overflow-x-auto">
  <table className="table-auto w-full">
	{/* Table header */}
	<thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
	  <tr >
	  <th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Number of Units</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Available</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Hold</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Booked</div>
		</th>
	  </tr>
	</thead>
	{/* Table body */}
	<tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
			<tr>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center text-black dark:text-slate-300">{totalUnit || 0}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{availableUnit || 0}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{holdUnit || 0}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{bookedUnit || 0}</div>
			  </td>
			</tr>
	</tbody>
  </table>
</div>
<div className="overflow-x-auto">
  <table className="table-auto w-full">
	{/* Table header */}
	<thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
	  <tr >
	  <th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Unit Number</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Status</div>
		</th>
	  </tr>
	</thead>
	{/* Table body */}
	<tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
		{unit&&unit.map(item=>(
			<tr>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center text-black dark:text-slate-300">{item.unit_number}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{item.unit.available?"AVAILABLE":item.unit.booked?"BOOKED":item.unit.hold?"HOLD":"NO STATUS FOUND"}</div>
			  </td>
			</tr>
		))}
	</tbody>
  </table>
</div>
</div>
	  </div>
	</div>
  )
}
