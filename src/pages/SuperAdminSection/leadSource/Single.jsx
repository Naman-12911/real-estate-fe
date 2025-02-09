import React, { useState } from 'react'
import Heading from '../../../components/Heading'
import SingleInput from '../../../components/SingleInput'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function SingleLeadSource() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	const {state}=useLocation();

	const [project, setProject] = useState(state?.medium||'');
	const [loading,setLoading]=useState(false);


	const handleSubmit=()=>{
		setLoading(true);
		const data={
			medium:project,
		}

		const axiosRequest = state
		? Axios.patch(`/social/medium-lead/${state.id}/`, data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  })
		: Axios.post('/social/medium-lead/', data, {
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
	  <Heading title={"Lead Source"} />
	  <div className="py-3 w-full   mx-auto space-y-5">
	  <div className="w-full flex justify-end items-end">
          <Button title={'Back'} onClick={()=>navigate(-1)}/>
        </div>
		<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
			<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">{state?'Edit':'Add'} Lead Source</h2>
			</header>
			<div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
				<div className='md:w-1/2 w-full'>
					<SingleInput label={"Lead Source"} placeholder={"Enter Lead Source Name"} value={project} onChange={e => setProject(e.target.value)} />
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
