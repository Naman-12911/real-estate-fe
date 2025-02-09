import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import SingleInput from '../../../components/SingleInput'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import SingleSelectInput from '../../../components/SingleSelectInput';

export default function SingleProjectPhase() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	const {state}=useLocation();

	const [project, setProject] = useState(state?.projects||'');
	const [projectData, setProjectData] = useState([]);
	const [unitNumber, setUnitNumber] = useState(state?.unit.id||'');
	const [unitNumberData, setUnitNumberData] = useState([]);
	const [projectPhase, setProjectPhase] = useState(state?.phase_name||'');

	const [loading,setLoading]=useState(false);


	useEffect(()=>{
		Axios.get('/admin-pannel/project/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>({
				value:item.id,
				label:item.project_name
			}))
			setProjectData(data)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			setLoading(false)
		})
	},[])

	useEffect(()=>{
		Axios.get('/admin-pannel/unit-number/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>({
				value:item.unit_no,
				label:item.unit_no
			}))
			setUnitNumberData(data)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			setLoading(false)
		})
	},[])

	const handleSubmit=()=>{
		setLoading(true);
		const data={
			projects:project,
			unit:unitNumber,
			phase_name:projectPhase,
		}

		const axiosRequest = state
		? Axios.patch(`/admin-pannel/phase/${state.id}/`, data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  })
		: Axios.post('/admin-pannel/phase/', data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  });

		axiosRequest
		.then(res=>{
			// console.log(res.data)
			toast.success(res.data.message)
			navigate(-1)
		})
		.catch(err=>{
			console.log(err)
			toast.error(<ul>
                {Object.entries(err.response.data).map(([fieldName, fieldErrors]) => (
                    <li key={fieldName}>
                        <strong>{fieldName}:</strong>
                        <ul>
                            {fieldErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>)
		})
		setLoading(false);
	}
  return (
	<div>
	  <Heading title={"Project Phase"} />
	  <div className="py-3 w-full   mx-auto space-y-5">
	  <div className="w-full flex justify-end items-end">
          <Button title={'Back'} onClick={()=>navigate(-1)}/>
        </div>
		<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
			<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">{state?'Edit':'Add'} Project Phase</h2>
			</header>
			<div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
			<div className='md:w-1/2 w-full'>
					<SingleSelectInput label={"Project"} option={projectData} placeholder={"Select Project"} value={project} onChange={setProject} />
				</div>
				<div className='md:w-1/2 w-full'>
					<SingleSelectInput label={"Unit Number"} option={unitNumberData} placeholder={"Select Unit Number"} value={unitNumber} onChange={setUnitNumber} />
				</div>
				<div className='md:w-1/2 w-full'>
					<SingleInput label={"Project Phase"} placeholder={"Enter Project Phase Name"} value={projectPhase} onChange={e => setProjectPhase(e.target.value)} />
				</div>
			</div>
			<div className='flex items-center justify-center m-5 gap-5'>
				<Button title={state?"Update":"Submit"} onClick={handleSubmit}/>
		</div>
		</div>
	  </div>
	</div>
  )
}
