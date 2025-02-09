import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import SingleSelectInput from '../../components/SingleSelectInput'
// import DashboardCard04_Label from '../../partials/dashboard/DashboardCard04_Label'
import BarChart from '../../charts/BarChart01_Label'
import { tailwindConfig } from '../../utils/Utils';
import Axios from '../../Axios'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import Spinner from '../../components/Spinner'
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';


export default function CompareAgents() {
	const accessToken = useSelector((state) => state.user.user);
	const navigate=useNavigate();


	const [firstAgent,setFirstAgent]=useState('')
	const [secondAgent,setSecondAgent]=useState('')
	const [firstAgentData,setFirstAgentData]=useState({})
	const [secondAgentData,setSecondAgentData]=useState({})
	const [firstAgentName,setFirstAgentName]=useState('');
	const [secondAgentName,setSecondAgentName]=useState('');
	const [agentData,setAgentData]=useState([]);
	const [data,setData]=useState('');

	const [loading,setLoading]=useState(true)

	useEffect(()=>{
		Axios.get('/admin-leads/sales-person-count/',{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			  },
		})
		.then(res=>{
			// console.log(res.data);	
			setData(res.data)
			const data=res.data.map(item=>(
				{
					label:item.user,
					value:item.id,
				}
			))
			setAgentData(data);
				setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			setLoading(false)
		})
	},[])

	const handleSelectAgents = () => {
		setLoading(true)
        const agent1Stats = data&&data.find(element => element.id == firstAgent);
        const agent2Stats = data&&data.find(element => element.id == secondAgent);

		// console.log(agent1Stats);
		// console.log(agent2Stats);
        if (agent1Stats && agent2Stats) {
            setFirstAgentData(agent1Stats.stats)
            setSecondAgentData(agent2Stats.stats)
			setFirstAgentName(agent1Stats.user)
			setSecondAgentName(agent2Stats.user)
			setTimeout(() => {
				setLoading(false)
			}, 500);
        } else {
            console.log('Agent not found!');
			setLoading(false)
        }
		
    };


	useEffect(()=>{
		if(firstAgent==secondAgent){
			toast.error("Please select two different Agents")
		}
	},[firstAgent,secondAgent])


	useEffect(()=>{
		handleSelectAgents()
	},[firstAgent,secondAgent])

	const chartData = {
		labels: [
		  'Total Leads', 'Dump', 'Delayed','Intrested', 'Site Vists', 'Corporate Vists', 'Booked',
		],
		datasets: [
		  {
			label:firstAgentName,
			data: [
				firstAgentData.total_leads,firstAgentData.total_dump_lead, firstAgentData.total_delayed_leads, firstAgentData.total_intersted, firstAgentData.total_site_visits,firstAgentData.total_booked
			],
			backgroundColor: tailwindConfig().theme.colors.indigo[300],
			hoverBackgroundColor: tailwindConfig().theme.colors.indigo[400],
			barPercentage: 0.66,
			categoryPercentage: 0.66,
		  },
		  {
			label: secondAgentName,
			data: [
				secondAgentData.total_leads,secondAgentData.total_dump_lead, secondAgentData.total_delayed_leads, secondAgentData.total_intersted, secondAgentData.total_site_visits,secondAgentData.total_booked
			],
			backgroundColor: tailwindConfig().theme.colors.indigo[700],
			hoverBackgroundColor: tailwindConfig().theme.colors.indigo[800],
			barPercentage: 0.66,
			categoryPercentage: 0.66,
		  },
		],
	  };
// console.log(firstAgent);

  return (
	<div>
    <Heading title={"Compare Agents"}/>
	<div className="py-3 w-full  mx-auto space-y-5">
	  <div className="flex justify-end  items-end gap-5 xl:flex-row flex-col">
	  <Button
            title={"Back"}
            onClick={()=>navigate(-1)}
          />
	  </div>
	  </div>
		<div className="py-8 w-full   mx-auto flex justify-center items-center flex-col gap-5">
			<div className=" w-full flex items-center justify-center gap-5 md:flex-row flex-col">
				<div className="md:w-2/5 w-full">
					<SingleSelectInput placeholder={'Select Agent'} value={firstAgent} onChange={setFirstAgent} option={agentData}/>
				</div>
				<div className="md:w-2/5 w-full">
					<SingleSelectInput placeholder={'Select Agent'} value={secondAgent} onChange={setSecondAgent} option={agentData}/>
				</div>
			</div>
			{loading?<Spinner/>:firstAgent && secondAgent && firstAgentData && secondAgentData && firstAgent!=secondAgent ? <div className="md:w-3/4 w-full">
					<div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
						<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
							<h2 className="font-semibold text-slate-800 dark:text-slate-100">Agents</h2>
						</header>
						{/* Chart built with Chart.js 3 */}
						{/* Change the height attribute to adjust the chart height */}
						<BarChart data={chartData} width={400} height={300} />
					</div>
			</div>:''}
			
		</div>
	</div>
  )
}
