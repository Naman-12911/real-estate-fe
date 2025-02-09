import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from '../../Axios';
import Heading from '../../components/Heading';
// import Button from '../../components/Button';
// import DashboardCard04_Label from '../../partials/dashboard/DashboardCard04_Label';
// import DashboardCard06 from '../../partials/dashboard/DashboardCard06';
// import DashboardCard07 from '../../partials/dashboard/DashboardCard07';
import DashboardCard06_Small from '../../partials/dashboard/DashboardCard06_Small';
// import Datepicker from '../../components/Datepicker';
import Spinner from '../../components/Spinner';
import DateFilter from '../../components/DateFilter';
import { useLocation } from 'react-router-dom';

export default function PerformanceReport() {
	const accessToken = useSelector((state) => state.user.user);
	
	const {state}=useLocation();

	const [whatsappMessages,setWhatsappMessages]=useState('');
	const [whatsAppLabels, setWhatsAppLabels] = useState([]);
    const [whatsAppData, setWhatsAppData] = useState([]);

	const [nextSchedule,setNextSchedule]=useState('');
	const [nextScheduleLabels, setNextScheduleLabels] = useState([]);
    const [nextScheduleData, setNextScheduleData] = useState([]);

	const [salePerson,setSalePerson]=useState('');
	const [salePersonLabels, setalePersonLabels] = useState([]);
    const [salePersonData, setalePersonData] = useState([]);

	const [booked,setBooked]=useState('');
	const [bookedLabels, setBookedLabels] = useState([]);
    const [bookedData, setBookedData] = useState([]);


	const [dateSearchGrt,setdateSearchGrt]=useState(state?.start_date||"");
	const [dateSearchLess,setdateSearchLess]=useState(state?.end_date||"");
	const [loading,setLoading]=useState(true);


const handleSearch = () => {
    setLoading(true);
    setNextSchedule(null);
    setSalePerson(null);
    setBooked(null);

    const paramObject = {
        start_date: dateSearchGrt,
        end_date: dateSearchLess,
    }
    const paramArray = [];

    for (const key in paramObject) {
        if (paramObject[key]) {
            paramArray.push(`${key}=${paramObject[key]}`)
        }
    }
    const queryString = paramArray.join("&");

    const nextSchedulePromise = Axios.get(`/admin-leads/next-shedule-date/?${queryString}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).then(res => {
        setNextSchedule(res.data);

        const newLabels = res.data.map(entry => entry.name);
        const newData = res.data.map(entry => entry.count);
        setNextScheduleLabels(newLabels);
        setNextScheduleData(newData);
    }).catch(err => {
        console.log(err.response.data);
    });

    const salePersonPromise = Axios.get(`/admin-leads/sales-person-count/?${queryString}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).then(res => {
        setSalePerson(res.data);
    }).catch(err => {
        console.log(err.response.data);
    });

    const bookedPromise = Axios.get(`/admin-leads/next-booking-date/?${queryString}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).then(res => {
        setBooked(res.data);

        const newLabels = res.data.map(entry => entry.agent_name);
        const newData = res.data.map(entry => entry.shedule_count);
        setBookedLabels(newLabels);
        setBookedData(newData);
    }).catch(err => {
        console.log(err.response.data);
    });

    Promise.all([nextSchedulePromise, salePersonPromise, bookedPromise])
        .finally(() => {
            setLoading(false);
        });
}

useEffect(() => {
    handleSearch();
}, [dateSearchGrt, dateSearchLess]);

	const calculateDateDifference=(date) =>{
		const today = new Date();
		const specificDate = new Date(date);
		const differenceMs = today - specificDate;
		const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
		return differenceDays;
	}

  return (loading?<Spinner/>:
	<div>
		<div className='flex items-center justify-between my-5 flex-col md:flex-row'>
		<Heading title={"Performance Report"}/>
		<DateFilter placeholderGRT={'Date Greater then'} placeholderLES={'Date Less then'} valueGRT={dateSearchGrt} valueLES={dateSearchLess} onChangeGRT={setdateSearchGrt} onChangeLES={setdateSearchLess}/>
		</div>
   
    <div className="py-8 w-full   mx-auto">
			{/* WHATSAPP */}
      {/* <div className="grid grid-cols-12 gap-5 mt-2 mb-5">
				<div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">Whatsapp Conversation</h2>
				</header>
				<div className="p-3">
					<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
						<tr>
							<th className="p-2">
							<div className="font-semibold text-center">Agent Name</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Conversation Count</div>
							</th>
						</tr>
						</thead>
						{whatsappMessages && <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
						{whatsappMessages.map((item,index)=>(
							<tr>
							<td className="p-2">
							<div className="text-center dark:text-white text-black">{item.agent_name}</div>
							</td>
							<td className="p-2">
							<div className="text-center">{item.message_count}</div>
							</td>
						</tr>
						))}
						
						</tbody>}
					</table>
					</div>
				</div>
				</div>
				{whatsAppData.length && whatsAppLabels && <DashboardCard06_Small title={"Whatsapp Conversation"} labels={whatsAppLabels} data={whatsAppData}/>}
        </div> */}
		
		<div className="grid grid-cols-12 gap-5 mt-2 mb-5">
				<div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">Task Scheduled</h2>
				</header>
				<div className="p-3">
					{/* Table */}
					<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						{/* Table header */}
						<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
						<tr>
							<th className="p-2">
							<div className="font-semibold text-center">Agent Name</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Delay</div>
							</th>
							{/* <th className="p-2">
							<div className="font-semibold text-center">Delay</div>
							</th> */}
						</tr>
						</thead>
						{/* Table body */}
						{nextSchedule && <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
						{/* Row */}
						{nextSchedule.map((item,index)=>(
							<tr key={index}>
							<td className="p-2">
							<div className="text-center dark:text-white text-black">{item.name}</div>
							</td>
							<td className="p-2">
							<div className="text-center">{item.count}</div>
							</td>
							{/* <td className="p-2">
							<div className="text-center">{item.delay} Days</div>
							</td> */}
						</tr>
						))}
						
						</tbody>}
					</table>
					</div>
				</div>
				</div>
				{nextScheduleData.length && nextScheduleLabels && <DashboardCard06_Small title={"Task Scheduled"} labels={nextScheduleLabels} data={nextScheduleData}/>}
        </div>
		
		<div className="grid grid-cols-12 gap-5 mt-2 mb-5">
				<div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">All Leads</h2>
				</header>
				<div className="p-3">
					{/* Table */}
					<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						{/* Table header */}
						<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
						<tr>
							<th className="p-2">
							<div className="font-semibold text-center">Agent Name</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Leads</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Delayed Leads</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Site Visit</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Corporate Visit</div>
							</th>
						</tr>
						</thead>
						{/* Table body */}
						{salePerson && <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
						{/* Row */}
						{salePerson.map((item,index)=>(
							<tr key={index}>
							<td className="p-2">
							<div className="text-center dark:text-white text-black">{item.user}</div>
							</td>
							<td className="p-2">
							<div className="text-center">{item.stats.total_leads}</div>
							</td>
							<td className="p-2">
							<div className="text-center">{item.stats.total_delayed_leads}</div>
							</td>
							<td className="p-2">
							<div className="text-center">{item.stats.total_site_visits}</div>
							</td>
							<td className="p-2">
							<div className="text-center">{item.stats.total_corporate_visits}</div>
							</td>
						</tr>
						))}
						</tbody>}
					</table>
					</div>
				</div>
				</div>
				{/* {salePersonData.length && salePersonLabels && <DashboardCard06_Small title={"Task Scheduled"} labels={salePersonLabels} data={salePersonData}/>} */}
        </div>

		<div className="grid grid-cols-12 gap-5 mt-2 mb-5">
				<div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
					<h2 className="font-semibold text-slate-800 dark:text-slate-100">Booking</h2>
				</header>
				<div className="p-3">
					{/* Table */}
					<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						{/* Table header */}
						<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
						<tr>
							<th className="p-2">
							<div className="font-semibold text-center">Agent Name</div>
							</th>
							<th className="p-2">
							<div className="font-semibold text-center">Booked</div>
							</th>
						</tr>
						</thead>
						{/* Table body */}
						{booked && <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
						{/* Row */}
						{booked.map((item,index)=>(
							<tr key={index}>
							<td className="p-2">
							<div className="text-center dark:text-white text-black">{item.agent_name}</div>
							</td>
							<td className="p-2">
							<div className="text-center">{item.shedule_count}</div>
							</td>
						</tr>
						))}
						
						</tbody>}
					</table>
					</div>
				</div>
				</div>
				{bookedData.length && bookedLabels && <DashboardCard06_Small title={"Booking"} labels={bookedLabels} data={bookedData}/>}
        </div>

    </div>
      
	</div>
  )
}

