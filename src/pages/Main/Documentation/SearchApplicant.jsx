import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import SingleSelectInput from '../../../components/SingleSelectInput'
import Axios from '../../../Axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import { useSelector } from 'react-redux'

export default function SearchApplicantDocumentation() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	const {state}=useLocation();
	// console.log(state.link);
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
	  <Heading title={"Documentation"} />
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
				  {/* <Button title={"Allotment Letter"} onClick={()=>navigate('/main/documentation/allotmentletter',{state:item})}/> */}
				  {/* <Button title={"Allotment Letter 2" } onClick={()=>navigate('/main/documentation/allotmentletter2')}/> */}
				  {/* <Button title={"T&CP Letter"} onClick={()=>navigate('/main/documentation/tcpletter',{state:item})}/> */}
				  {/* <Button title={"NOC"}/> */}
				  {/* <Button title={"NOC RACPC SBI"} onClick={()=>navigate('/main/documentation/racpcsbi',{state:item})}/>
				  <Button title={"NOC AXIS"} onClick={()=>navigate('/main/documentation/axis',{state:item})}/>
				  <Button title={"NOC PNB"} onClick={()=>navigate('/main/documentation/pnb',{state:item})}/>
				  <Button title={"NOC CANARA"} onClick={()=>navigate('/main/documentation/canara',{state:item})}/>
				  <Button title={"NOC HDFC"} onClick={()=>navigate('/main/documentation/hdfc',{state:item})}/>
				  <Button title={"NOC LIC"} onClick={()=>navigate('/main/documentation/lic',{state:item})}/>
				  <Button title={"Possession Letter"} onClick={()=>navigate('/main/documentation/possessionletter',{state:item})}/> 
				  <Button title={"Upload Document"} onClick={()=>navigate('/main/documentation/upload',{state:item})}/> */}
				  <div className='flex justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='Download/Print' onClick={()=>navigate(`${state.link}`,{state:item})}>
					<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 576 512">
						<path className=' fill-current ' d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"/>
					</svg>
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
