import React, { useState } from 'react'
import Heading from '../../../components/Heading'
import SingleInput from '../../../components/SingleInput'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function EditPaymentStage() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	

	const {state}=useLocation();
	// console.log(state);
	// console.log(state);

	const [stage, setStage] = useState(state.stage_name);
	const [step, setStep] = useState(state.step_no);
	const [amount, setAmount] = useState(state.paybale_amount);
	const [date, setDate] = useState(state.payable_date);
	const [loading,setLoading]=useState(false);
	const [error,setError]=useState(false);
	const [errorRes,setErrorRes]=useState(false);

	const handleSubmit=()=>{
		setLoading(true);
		setError(false)
		const data={
			stage_name:stage,
			step_no:step,
			payable_date:date,
			paybale_amount:amount,
			// personal_deatils:state.booking.personal_details_id,
		}
		Axios.patch(`/profile/payment-stage-deatils/${state.id}/`,data,{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
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
			setError(true);
			// setErrorRes(err.response.data)
		})
		setLoading(false);
	}

  return (
	<div>
	  <Heading title={"Payment Stages"} />
	  <div className="py-3 w-full   mx-auto space-y-5">
		<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
			<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">Edit Payment Stages</h2>
			</header>
			<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
				{/* <h2 className="font-semibold text-slate-800 dark:text-slate-100 space-x-10"><span>Name: {state.applicant_name}</span><span>Unit Number: {state.booking.unit_nos}</span></h2> */}
			</header>
			<div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
				<div className='md:w-1/4 w-full'>
					<SingleInput label={"Step No."} placeholder={"Enter Step Number"} value={step} onChange={e => setStep(e.target.value)} />
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleInput label={"Stage Name"} placeholder={"Enter Stage Name"} value={stage} onChange={e => setStage(e.target.value)} />
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleInput label={"Payable Amount"} placeholder={"Enter Payable Amount"} value={amount} onChange={e => setAmount(e.target.value)} />
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleInput label={"Payable Date"} placeholder={""} type={"date"} value={date} onChange={e => setDate(e.target.value)} />
				</div>
			</div>
			<div className='flex items-center justify-center m-5 gap-5'>
				<Button title={'Update Payment Stage'} onClick={handleSubmit}/>
				{/* <Button title={'Finish'} onClick={()=>navigate(-1)}/> */}
		</div>
		<span className='text-center text-red-700 font-semibold'>{error}</span>
		{/* <div className='w-full flex items-center justify-center'>
			<span className='text-center text-red-700 font-semibold'>{
						errorRes.advance_amount?errorRes.advance_amount[0]:errorRes.amount_to_be_paid?errorRes.amount_to_be_paid[0]:errorRes.date?errorRes.date[0]:errorRes.demand_date?errorRes.demand_date[0]:errorRes.due_amount?errorRes.due_amount[0]:errorRes.stage?errorRes.stage[0]:""}</span>
		</div> */}
		
		</div>
	  </div>
	</div>
  )
}
