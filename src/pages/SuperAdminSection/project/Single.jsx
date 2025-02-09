import React, { useState } from 'react'
import Heading from '../../../components/Heading'
import SingleInput from '../../../components/SingleInput'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function SingleProject() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	const {state}=useLocation();

	const [project, setProject] = useState(state?.project_name||'');
	const [loading, setLoading] = useState(state?.project_name||'');

	const [address, setAddress] = useState(state?.address||'');
	const [externalElectrificationCharges, setExternalElectrificationCharges] = useState(state?.ecternal_electric_charges||'');
	const [waterConnectionCharges, setWaterConnectionCharges] = useState(state?.water_connection_charges||'');
	const [mutationCharges, setMutationCharges] = useState(state?.mutation_charges||'');
	const [maintenanceChargesFor2Years, setMaintenanceChargesFor2Years] = useState(state?.maintaince_charges_2_year||'');
	const [societyCharges, setSocietyCharges] = useState(state?.society_charges||'');


	const handleSubmit=()=>{
		setLoading(true);
		const data={
			project_name:project,
			address,
			ecternal_electric_charges:externalElectrificationCharges,
			water_connection_charges:waterConnectionCharges,
			mutation_charges:mutationCharges,
			maintaince_charges_2_year:maintenanceChargesFor2Years,
			society_charges:societyCharges,
		}

		const axiosRequest = state
		? Axios.patch(`/admin-pannel/project/${state.id}/`, data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  })
		: Axios.post('/admin-pannel/project/', data, {
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
	  <Heading title={"Project"} />
	  <div className="py-3 w-full   mx-auto space-y-5">
	  <div className="w-full flex justify-end items-end">
          <Button title={'Back'} onClick={()=>navigate(-1)}/>
        </div>
		<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
			<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">{state?'Edit':'Add'} Project</h2>
			</header>
			<div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
				<div className='md:w-1/2 w-full'>
					<SingleInput label={"Project"} placeholder={"Enter Project Name"} value={project} onChange={e => setProject(e.target.value)} />
				</div>
				<div className='md:w-1/2 w-full'>
        <SingleInput
          label={"Address"}
          placeholder={"Enter Address"}
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </div>
      <div className='md:w-1/2 w-full'>
        <SingleInput
          label={"External Electrification Charges"}
          placeholder={"Enter External Electrification Charges"}
          value={externalElectrificationCharges}
          onChange={e => setExternalElectrificationCharges(e.target.value)}
		  type={'number'}
        />
      </div>
      <div className='md:w-1/2 w-full'>
        <SingleInput
          label={"Water Connection Charges"}
          placeholder={"Enter Water Connection Charges"}
          value={waterConnectionCharges}
          onChange={e => setWaterConnectionCharges(e.target.value)}
		  type={'number'}

        />
      </div>
      <div className='md:w-1/2 w-full'>
        <SingleInput
          label={"Mutation Charges"}
          placeholder={"Enter Mutation Charges"}
          value={mutationCharges}
          onChange={e => setMutationCharges(e.target.value)}
		  type={'number'}

        />
      </div>
      <div className='md:w-1/2 w-full'>
        <SingleInput
          label={"Maintenance Charges for 2 Years"}
          placeholder={"Enter Maintenance Charges for 2 Years"}
          value={maintenanceChargesFor2Years}
          onChange={e => setMaintenanceChargesFor2Years(e.target.value)}
		  type={'number'}

        />
      </div>
      <div className='md:w-1/2 w-full'>
        <SingleInput
          label={"Society Charges"}
          placeholder={"Enter Society Charges"}
          value={societyCharges}
          onChange={e => setSocietyCharges(e.target.value)}
		  type={'number'}

        />
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
