import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from '../../Axios';
import Heading from '../../components/Heading';
import {  useNavigate } from 'react-router-dom';
import DashboardCard06_Small from '../../partials/dashboard/DashboardCard06_Small';
import Spinner from '../../components/Spinner';

export default function MyJobDesk() {

	const userData=useSelector((state) => state.user.userProfile)
	// console.log(userData);

	const accessToken = useSelector((state) => state.user.user);
	const navigate=useNavigate();

	const [data,setData]=useState('');
	const [siteVisitData,setSiteVisitData]=useState('');
	const [chartLabel,setChartLabel]=useState('');
	const [chartData,setChartData]=useState('');

	const [leadSource,setLeadSource]=useState('');
	const [leadSourceArray,setLeadSourceArray]=useState([]);
	const [leadSourceData,setLeadSourceData]=useState([]);


	const [loading,setLoading]=useState(true);
	const [dataProcessed, setDataProcessed] = useState(false);

	useEffect(() => {
		if (userData) {
		  setLoading(true);
		  Promise.all([getData(), getLeadSource(), getSiteVisitData()])
			.then(([dataResponse, leadSourceResponse, siteVisitResponse]) => {
			  setData(dataResponse);
			  setLeadSource(leadSourceResponse);
			  setSiteVisitData(siteVisitResponse);
			})
			.catch(error => {
			  console.error('Error fetching data:', error);
			});
		}
	  }, [userData.id]);
	
	  const getData = () => {
		return Axios.get(`/agent-report/data/?user_id=${userData.id}`, {
		  headers: {
			Authorization: `Bearer ${accessToken}`,
		  },
		}).then(res => res.data[0]);
	  };
	
	  const getLeadSource = () => {
		return Axios.get(`/social/lead-medium/?user=${userData.id}`, {
		  headers: {
			Authorization: `Bearer ${accessToken}`,
		  },
		}).then(res => res.data[userData.name]);
	  };
	
	  const getSiteVisitData = () => {
		return Axios.get(`/social/agent-site-visit/?user_id=${userData.id}`, {
		  headers: {
			Authorization: `Bearer ${accessToken}`,
		  },
		}).then(res => res.data);
	  };
	
	  useEffect(() => {
		if (siteVisitData) {
		  processSiteVisitData();
		}
	  }, [siteVisitData]);
	
	  useEffect(() => {
		if (leadSource) {
		  processLeadSourceData();
		}
	  }, [leadSource]);
	
	  useEffect(() => {
		if (dataProcessed) {
		  setLoading(false);
		}
	  }, [dataProcessed]);
	
	  const processSiteVisitData = () => {
		const keysArray = [];
		const countsArray = [];
		Object.keys(siteVisitData).forEach((key) => {
		  keysArray.push(key);
		  countsArray.push(siteVisitData[key]?.count);
		});
		setChartData(countsArray);
		setChartLabel(keysArray);
	
		// Check if lead source data has also been processed
		if (leadSource) {
		  setDataProcessed(true);
		}
	  };
	
	  const processLeadSourceData = () => {
		const keysArray = [];
		const countsArray = [];
		Object.keys(leadSource).forEach((key) => {
		  keysArray.push(key);
		  countsArray.push(leadSource[key]);
		});
		setLeadSourceData(countsArray);
		setLeadSourceArray(keysArray);
	
		// Check if site visit data has also been processed
		if (siteVisitData) {
		  setDataProcessed(true);
		}
	  };


 return (loading?<Spinner/>:
	<div>
    <Heading title={"Agent Report"}/>
    <div className="py-8 w-full   mx-auto">
		<div className="grid grid-cols-12 gap-5 mt-2 mb-5">
		
				<div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">Agent Name: {data&&data.agent_name} | Total Lead: {data&&data.status_counts.TotalLeads}</h2>
				</header>

				<div className="p-3">
				
					<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						
						<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
						<tr>
							<th className="p-2">
							<div className="font-semibold text-center"></div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Count</div>
							</th>
						</tr>
						</thead>
						
						{data && <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
						
							<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Intrested</div>
								</td>
								<td className="p-2">
									<div className="text-center">{data.status_counts.Intersted|| 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Dump</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {data.status_counts.Dump|| 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Site Visit</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {data.status_counts.SiteVisit|| 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Call</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {data.status_counts.Call|| 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Not Picked</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {data.status_counts.Notpicked|| 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Not Connected</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {data.status_counts.NotConnected|| 0}</div>
								</td>
						</tr>
						<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">Booked</div>
								</td>
								<td className="p-2">
									<div className="text-center"> {data.status_counts.Booked|| 0}</div>
								</td>
						</tr>
						
						</tbody>}
					</table>
					</div>
				</div>
				
				</div>
				{data&&<DashboardCard06_Small title={"Agent's Overview"} labels= {["Calls", "Not Connected", "Not Picked", "Interested", "Dump", "Booked", "Site Visit"]} data={[data.status_counts.Call, data.status_counts.NotConnected, data.status_counts.Notpicked, data.status_counts.Intersted,data.status_counts.Dump, data.status_counts.Booked, data.status_counts.SiteVisit]}/>}
        </div>

		{siteVisitData&&<div className="grid grid-cols-12 gap-5 mt-2 mb-5">
				<div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">Agents Site Vists</h2>
				</header>
				<div className="p-3">
					<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
						<tr>
							<th className="p-2">
							<div className="font-semibold text-center">Site Visits</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center">Count</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center">Action</div>
							</th>
						</tr>
						</thead>
						{siteVisitData && <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
						{Object.keys(siteVisitData).map((key,item)=>(
							<tr>
								<td className="p-2">
									<div className="text-center dark:text-white text-black">{key}</div>
								</td>
								<td className="p-2">
									<div className="text-center">{siteVisitData[key]?.count}</div>
								</td>
								<td className="p-4 whitespace-nowrap">
								<div className="flex items-center justify-center">
								<div className='flex justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='View Stages' onClick={()=>navigate('/agentsitevisit',{state:{key:key,id:userData.id}})}>
									<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 576 512">
										<path className=' fill-current ' d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"/>
									</svg>
								</div>
								</div>
							</td>
						</tr>
						))} 
						</tbody>}
					</table>
					</div>
				</div>
				</div>
				<DashboardCard06_Small title={"Site Visits Overview"} labels= {chartLabel} data={chartData}/>
        </div>}

		{leadSource&&<div className="grid grid-cols-12 gap-5 mt-2 mb-5">
				<div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">Leads Source  </h2>
				</header>
				<div className="p-3">

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
						</tr>
						</thead>
						<tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
							{Object.keys(leadSource).map((key,item)=>(
								<tr>
								<td className="p-2" >
									<div className="text-center dark:text-white text-black" >{key}</div>
								</td>
								<td className="p-2">
									<div className="text-center">{leadSource[key]}</div>
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
