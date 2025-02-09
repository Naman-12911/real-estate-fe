import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import Axios from '../../../Axios'
import SingleSelectInput from '../../../components/SingleSelectInput'
import SingleInput from '../../../components/SingleInput'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SingleDemandLetter() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	const {state}=useLocation();

	const [selectedProject,setSelectedProject]=useState(state?.project_name.id||"")
	const [selectedType,setSelectedType]=useState(state?.project_type.id||"")
	const [selectedUnit,setSelectedUnit]=useState(state?.unit_number.id||"")
	const [project,setProject]=useState('')
	const [profile,setProfile]=useState('')
	const [type,setType]=useState('')
	const [unit,setUnit]=useState('')
	const [paymentid,setPaymentid]=useState(state?.id||"");
	const [selectedPaymentStage,setSelectedPaymentStage]=useState();
	const [date,setDate]=useState(state?.date||"")
	const [tax,setTax]=useState(state?.tax_percentage||"");
	const [loading,setLoading]=useState(false)
	
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

		//Types
		Axios.get(`/misc/project-type-filter/?project_id=${selectedProject}`,{
	headers:{
		Authorization:`Bearer ${accessToken}`
}
})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>(
				{
					label:item.property_type,
					value:item.id
				}
			))
			setType(data);
		})
		.catch(err=>{
			console.log(err)
		})

		//Units
		Axios.get(`/misc/unit-number-filter/?project_id=${selectedProject}`,{
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
					value:item.id,
				}
			))
			setUnit(data);
			setLoading(false)
		})
		.catch(err=>{
			console.log(err)
			setLoading(false)
		})
	},[selectedProject,selectedUnit])


	useEffect(()=>{
		const newData=unit&&unit.find(element=>element.value==selectedUnit)
		if(newData){
			//Profile
			Axios.get(`/profile/filter-name-unitno/?unit_no=${newData.label}`,{
				headers:{
					Authorization:`Bearer ${accessToken}`
			}
			})
			.then(res=>{
					//Payment Stage		
					Axios.get(`/profile/payment-stage-deatils/?personal_id=${res.data[0].id}`,{
						headers:{
							Authorization:`Bearer ${accessToken}`
					}
					})
					.then(res=>{
						// console.log(res.data.personal_deatils[0])
						setPaymentid(res.data.personal_deatils[0].id);
						setSelectedPaymentStage(res.data.personal_deatils[0].stage_name)
						setInstallmentNo(res.data.personal_deatils[0].step_no)
						setStageDue(res.data.personal_deatils[0].paybale_amount)
					})
					.catch(err=>{
						console.log(err)
					})
			})
			.catch(err=>{
				console.log(err)
			})
		}
	},[selectedUnit,unit])

	const handleSubmit=()=>{
		setLoading(true)
		const data={
			project_name:selectedProject,
			unit_number:selectedUnit,
			payment_stage:paymentid,
			date,
			tax_percentage:tax,
			project_type:selectedType,
		}

		const axiosRequest = state
		? Axios.patch(`/admin-pannel/demand-letter/${state.id}/`, data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  })
		: Axios.post('/admin-pannel/demand-letter/', data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  });

		axiosRequest
		.then(res=>{
			// console.log(res.data)
			toast.success(res.data.message)
			navigate(-1)
			setLoading(false)
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
			setLoading(false)
		})
	}
  return (loading?<Spinner/>:
	<div>
	  <Heading title={'Demand Letter'}/>
	  <div className="w-full flex justify-end items-end">
          <Button title={'Back'} onClick={()=>navigate(-1)}/>
        </div>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Add Demand Letter</h2>
      </header>
		<div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
				<div className='md:w-1/4 w-full'>
					<SingleSelectInput label={'Project'} option={project || []} placeholder={"--Select Project--"} value={selectedProject} onChange={setSelectedProject}/>
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleSelectInput label={'Type'} option={type || []} placeholder={"--Select Project Type--"} value={selectedType} onChange={setSelectedType}/>
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleSelectInput label={'Unit Number'} option={unit || []} placeholder={"--Select Unit--"} value={selectedUnit} onChange={setSelectedUnit}/>
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleInput label={'Payment Stage'} placeholder={"Enter Payment Stage"} isDisable={true} value={selectedPaymentStage} onChange={(e)=>setSelectedPaymentStage(e.target.value)}/>
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleInput type={'date'} value={date} label={'Date'} onChange={(e)=>setDate(e.target.value)}/>
				</div>
				<div className='md:w-1/4 w-full'>
				<SingleInput type={'text'} value={tax} label={'Tax Percentage'} onChange={(e)=>setTax(e.target.value)} placeholder={"Enter Tax Percentage"}/>
				</div>
			</div>
			<div className='flex items-center justify-center m-5'>
				<Button title={state?"Update":"Submit"} onClick={handleSubmit}/>
		</div>
		
	  </div>
	</div>
  )
}
