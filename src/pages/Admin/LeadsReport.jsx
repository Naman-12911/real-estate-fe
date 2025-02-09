import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from '../../Axios';
import Heading from '../../components/Heading';
import DashboardCard06_Small from '../../partials/dashboard/DashboardCard06_Small';
// import Datepicker from '../../components/Datepicker';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import DateFilter from '../../components/DateFilter';

export default function LeadsReport() {
	const navigate=useNavigate();
	const accessToken = useSelector((state) => state.user.user);
	const {state}=useLocation();

	const [universalLeads,setUniversalLeads]=useState('');
	const [leadSource,setLeadSource]=useState('');



	const [dateSearchGrt,setdateSearchGrt]=useState(state?.start_date||"");
	const [dateSearchLess,setdateSearchLess]=useState(state?.end_date||"");
	const [leadSourceArray,setLeadSourceArray]=useState([]);
	const [leadSourceData,setLeadSourceData]=useState([]);

	const [loading,setLoading]=useState(true)

	const handleSearch=()=>{
		setUniversalLeads(null);
		const paramObject={
			start_date:dateSearchGrt,
			end_date:dateSearchLess,
		}
		const paramArray=[];
	
		for(const key in paramObject){
			if(paramObject[key]){
				paramArray.push(`${key}=${paramObject[key]}`)
			}
		}
		const queryString = paramArray.join("&");

		//Universal Leads
		Axios.get(`/lead-report/lead-counts/?${queryString}`,{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			  },
		})
		.then(res=>{
			// console.log(res.data)
			setUniversalLeads(res.data);
		})
		.catch(err=>{
			console.log(err.response.data)
		})

		//LeadSource
		Axios.get(`/lead-report/lead-source/?${queryString}`,{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			  },
		})
		.then(res=>{
			// console.log(res.data)
			setLeadSource(res.data);
		})
		.catch(err=>{
			console.log(err.response.data)
		})
	}

	useEffect(()=>{
		handleSearch();
	},[dateSearchGrt,dateSearchLess])

useEffect(()=>{
	if(leadSource){
	const newDataName=leadSource.map(element=>element.name.replace(/_/g, ' '));
	const newData=leadSource.map(element=>element.total_count);
	// console.log(newData);
	// console.log(newDataName);
	if(newDataName){
		setLeadSourceArray(newDataName)
	}
	if(newData){
		setLeadSourceData(newData)
	}
	setTimeout(() => {
		setLoading(false)
}, 500);
	}
},[leadSource])

  return (loading?<Spinner/>:
	<div>
		<div className='flex items-center justify-between my-5 flex-col md:flex-row'>
		<Heading title={"Leads Report"}/>
		<DateFilter placeholderGRT={'Date Greater then'} placeholderLES={'Date Less then'} valueGRT={dateSearchGrt} valueLES={dateSearchLess} onChangeGRT={setdateSearchGrt} onChangeLES={setdateSearchLess}/>
		</div>
    
    <div className="py-8 w-full   mx-auto">
	<div className="flex justify-end items-end mb-5 space-y-5 flex-col">
				
				<Button title={'Compare Source'} onClick={()=>navigate('/admin/comparesource',{state:leadSource})}/>
			
			</div>
		{universalLeads&&<div className="grid grid-cols-12 gap-5 mt-2 mb-5">
				<div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">All Leads | Total Leads : {universalLeads && universalLeads.total_count}</h2>
				</header>
				<div className="p-3">
					{/* Table */}
					<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
						<tr>
							<th className="p-2">
							<div className="font-semibold text-center">Leads</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Count</div>
							</th>
						</tr>
						</thead>
						{universalLeads && <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
						
							<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Intrested</div>
								</td>
								<td className="p-2">
									<div className="text-center">{universalLeads.interested_count || 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Dump</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {universalLeads.dump_lead_count || 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Site Visit</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {universalLeads.site_visit_count || 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Corporate Visit</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {universalLeads.corporate_visit_count || 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Booked</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {universalLeads.booked_count || 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Lead Yet to be Contacted</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {universalLeads.lead_yet_to_be_contacted || 0}</div>
								</td>
						</tr>
						
						</tbody>}
					</table>
					</div>
				</div>
				</div>
				{universalLeads && <DashboardCard06_Small title={"Total Leads"} labels= {["Intrested", "Dump", "Site visit", "Corporate Visit", "Booked"]} data={[universalLeads.interested_count, universalLeads.dump_lead_count, universalLeads.site_visit_count, universalLeads.corporate_visit_count,universalLeads.booked_count]}/>}
        </div>}
		{leadSource&&<div className="grid grid-cols-12 gap-5 mt-2 mb-5">
				<div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">Leads Source</h2>
				</header>
				<div className="p-3">
					{/* Table */}
					<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
						<tr>
							<th className="p-2">
							<div className="font-semibold text-center">Leads Source</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Count</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Action</div>
							</th>
						</tr>
						</thead>
						<tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
							{leadSource.map((item,index)=>(
								<tr key={index}>
								<td className="p-2" >
									<div className="text-center dark:text-white text-black" >{item.name.replace(/_/g, ' ')}</div>
								</td>
								<td className="p-2">
									<div className="text-center">{item.total_count}</div>
								</td>
								<td className="p-4 whitespace-nowrap">
								<div className="flex items-center justify-center">
								<div className='flex justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' onClick={()=>{navigate('/admin/subleadsource',{state:item});window.scroll(0,0)}}>
									<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 576 512">
										<path className=' fill-current ' d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"/>
									</svg>
								</div>
								</div>
							</td>
							</tr>
							))}
						</tbody>
					</table>
					</div>
				</div>
				</div>
				{leadSourceArray && leadSourceData && <DashboardCard06_Small title={"Leads Source"} labels= {leadSourceArray} data={leadSourceData}/>}
        </div>}
    </div>
      
	</div>
  )
}
