import React, { useState } from 'react'
import Heading from '../../../components/Heading'
import SingleInput from '../../../components/SingleInput'
import Button from '../../../components/Button';
import SingleSelectInput from '../../../components/SingleSelectInput';
import Axios from '../../../Axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function ApplicantBankInformation() {
	const accessToken=useSelector((state)=>state.user.user);
	const {state}=useLocation();
	const navigate=useNavigate();

	const [bankName, setBankName] = useState('');
	const [bankAddress, setBankAddress] = useState('');
	const [bankIFSC, setBankIFSC] = useState('');
	const [loanFileNo, setLoanFileNo] = useState('');
	const [loanDate, setLoanDate] = useState('');
	const [loanAccountNumber, setLoanAccountNumber] = useState('');
	const [loanAmountSanctioned, setLoanAmountSanctioned] = useState('');
	const [executiveName, setExecutiveName] = useState('');
	const [executiveNumber, setExecutiveNumber] = useState('');
	const [status, setStatus] = useState('');
	const [loanApprovalDate, setLoanApprovalDate] = useState('');
	const [marginAmount, setMarginAmount] = useState('');
	const [loading,setLoading]=useState(false)
	const [errorRes,setErrorRes]=useState('');
	

	const handleSubmit=()=>{
		setLoading(true)
		const data={
			bookings:state.booking.id,
			bank_name:bankName,
			bank_address:bankAddress,
			bank_ifsc:bankIFSC,
			loan_file_no:loanFileNo,
			loan_date:loanDate,
			loan_amount_sanctioned:loanAmountSanctioned,
			excutive_name:executiveName,
			excutive_number:executiveNumber,
			status_active_inactive:status,
			loan_approval_date:loanApprovalDate,
			margin_amount:marginAmount,
		}
		Axios.post('/client-loan/loan/',data,{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			toast.success(res.data.message)
			// console.log(res.data)
			navigate('/account/myjobdesk')

		})
		.catch(err=>{
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
			console.log(err.response.data);
			setErrorRes(err.response.data);
		})
		setLoading(false)
	}
  return (loading?<Spinner/>:
	<div>
	<Heading title={"Client Loan File"}/>
	<div className="py-3 w-full  mx-auto space-y-5">
	  <div className="flex justify-end  items-end gap-5 xl:flex-row flex-col">
	  <Button
            title={"Back"}
            onClick={()=>navigate(-1)}
          />
	  </div>
	  </div>
	<div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
	<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
	  <h2 className="font-semibold text-slate-800 dark:text-slate-100">Applicant Bank Information</h2>
	</header>
	  <div className="p-2 w-full   mx-auto">
		<div className="p-2 w-full   mx-auto flex items-center justify-evenly flex-wrap gap-5">
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Bank Name'} placeholder={'Enter Bank Name'} value={bankName} onChange={(e) => setBankName(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Bank Address'} placeholder={'Enter Bank Address'} value={bankAddress} onChange={(e) => setBankAddress(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Bank IFSC'} placeholder={'Enter Bank IFSC'} value={bankIFSC} onChange={(e) => setBankIFSC(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Loan File No.'} placeholder={'Enter Loan File No.'} value={loanFileNo} onChange={(e) => setLoanFileNo(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Loan Date'} type={"date"} placeholder={'Enter Loan Date'} value={loanDate} onChange={(e) => setLoanDate(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Loan Account Number'} placeholder={'Enter Loan Account Number'} value={loanAccountNumber} onChange={(e) => setLoanAccountNumber(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Loan Amount Sanctioned'} placeholder={'Enter Loan Amount Sanctioned'} value={loanAmountSanctioned} onChange={(e) => setLoanAmountSanctioned(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Executive Name'} placeholder={'Enter Executive Name'} value={executiveName} onChange={(e) => setExecutiveName(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Executive Number'} placeholder={'Enter Executive Number'} value={executiveNumber} onChange={(e) => setExecutiveNumber(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				{/* <SingleInput label={'Status'} placeholder={'Enter Status'} value={status} onChange={(e) => setStatus(e.target.value)} /> */}
				<SingleSelectInput label={'Status'} placeholder={'--Select Status--'} value={status} onChange={setStatus} option={[{label:"Active",value:"Active",},{label:"Inactive",value:"Inactive",}]}/>
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Loan Approval Date'} type={"date"} placeholder={'Enter Loan Approval Date'} value={loanApprovalDate} onChange={(e) => setLoanApprovalDate(e.target.value)} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Margin Amount'} placeholder={'Enter Margin Amount'} value={marginAmount} onChange={(e) => setMarginAmount(e.target.value)} />
			</div>
		</div>
		<div className='flex items-center justify-center m-5'>
			<Button title={'Submit'} onClick={handleSubmit}/>
		</div>
		
	  </div>
	</div>
  </div>
  )
}
