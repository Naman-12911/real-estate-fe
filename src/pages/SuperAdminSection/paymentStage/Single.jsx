import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import SingleInput from '../../../components/SingleInput'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import SingleSelectInput from '../../../components/SingleSelectInput';

export default function SinglePaymentStage() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	

	const {state}=useLocation();
	// console.log(state);

	const [personalDetail, setPersonalDetail] = useState(state?.personal_deatils.id||"");
	const [personalDetailData, setPersonalDetailData] = useState([]);
	const [stage, setStage] = useState('');
	const [step, setStep] = useState('');
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');
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
			personal_deatils:state.booking.personal_details_id,
		}
		const axiosRequest = state
		? Axios.patch(`/admin-pannel/payment-stage-deatils/${state.id}/`, data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  })
		: Axios.post('/admin-pannel/payment-stage-deatils/', data, {
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
			setError(true);
			// setErrorRes(err.response.data)
		})
		setLoading(false);
	}

	useEffect(()=>{
		Axios.get('/admin-pannel/personal-deatils/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>({
				value:item.id,
				label:item.id
			}))
			setPersonalDetailData(data)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			setLoading(false)
		})
	},[])

  return (
	<div>
	  <Heading title={"Payment Stage"} />
	  <div className="w-full flex justify-end items-end">
          <Button title={'Back'} onClick={()=>navigate(-1)}/>
        </div>
	  <div className="py-3 w-full   mx-auto space-y-5">
		<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
			<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">{state?'Edit':'Add'} Payment Stage</h2>
			</header>
			<div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
				<div className='md:w-1/4 w-full'>
				<SingleSelectInput label={'Personal Detail'} placeholder={'Select Personal Detail ID'} option={personalDetailData}  value={personalDetail} onChange={setPersonalDetail}/>
				</div>
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
				<Button title={state?"Update":"Submit"} onClick={handleSubmit}/>
		</div>		
		
		</div>
	  </div>
	</div>
  )
}
