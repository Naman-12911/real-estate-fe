import React, { useEffect, useState } from 'react'
import SingleInput from '../../../components/SingleInput';
import Button from '../../../components/Button';
import SingleSelectInput from '../../../components/SingleSelectInput';
import Axios from '../../../Axios';
import Spinner from '../../../components/Spinner';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import SubHeading from '../../../components/SubHeading';
import { useLocation, useNavigate } from 'react-router-dom';
import Heading from '../../../components/Heading';

export default function EditBillingReceipt() {
	const {state}=useLocation();
	// console.log(state);

	const navigate=useNavigate();
		const accessToken=useSelector((state)=>state.user.user);

		// const [paymentReceivedDate, setPaymentReceivedDate] = useState('');
		const [receiptDate, setReceiptDate] = useState(state?.receipt_date);
		const [selectedProject, setSelectedProject] = useState(state?.project_name?.id);
		const [selectedUnit, setSelectedUnit] = useState(state?.unit_number?.id);
		const [selectedPaymentStage, setSelectedPaymentStage] = useState(state?.payment_stage?.stage_name);
		// const [stepNumber, setStepNumber] = useState('');
		// const [customerId, setCustomerId] = useState('');
		const [stageDue, setStageDue] = useState(state?.payment_stage?.paybale_amount);
		// const [customerName, setCustomerName] = useState('');
		// const [totalAmount, setTotalAmount] = useState('');
		// const [interestAmount, setInterestAmount] = useState('');
		// const [delay, setDelay] = useState('');
		const [installmentNo, setInstallmentNo] = useState(state?.payment_stage?.step_no);
		// const [arrears, setArrears] = useState('');
		const [modeOfPayment, setModeOfPayment] = useState(state?.mode_of_payment?.id);
		const [transactionDate, setTransactionDate] = useState(state?.transation_date);
		const [drawnOnBank, setDrawnOnBank] = useState(state?.bank_name?.id);
		const [transactionNo, setTransactionNo] = useState(state?.cheque_number);
		const [branchName, setBranchName] = useState(state?.branch_name);
		const [project,setProject]=useState([]);
		// const [type,setType]=useState('')
		const [unit,setUnit]=useState([])
		const [paymentData,setPaymentData]=useState([]);
		// const [profile,setProfile]=useState('');
		// const [paymentMainData,setPaymentMainData]=useState('');
		const [modeOfPaymentData, setModeOfPaymentData] = useState([]);
		const [bankNameData,setBankNameData]=useState([]);
		const [paymentid,setPaymentid]=useState(state?.payment_stage?.id);
		// const[profileSearchUnit,setProfileSearchUnit]=useState('');
		const [by,setBy]=useState(state?.by_customer?'Customer':'Bank');
		const [loading,setLoading]=useState('');

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

		// useEffect(()=>{
		// 	const newData=unit&&unit.find(element=>element.value==selectedUnit)
		// 	if(newData){
		// 		//Profile
		// 		Axios.get(`/profile/filter-name-unitno/?unit_no=${newData.label}`,{
		// 			headers:{
		// 				Authorization:`Bearer ${accessToken}`
		// 		}
		// 		})
		// 		.then(res=>{
		// 				//Payment Stage		
		// 				Axios.get(`/profile/payment-stage-deatils/?personal_id=${res.data[0].id}`,{
		// 					headers:{
		// 						Authorization:`Bearer ${accessToken}`
		// 				}
		// 				})
		// 				.then(res=>{
		// 					console.log(res.data.personal_deatils[0])
		// 					setPaymentid(res.data.personal_deatils[0].id);
		// 					setSelectedPaymentStage(res.data.personal_deatils[0].stage_name)
		// 					setInstallmentNo(res.data.personal_deatils[0].step_no)
		// 					setStageDue(res.data.personal_deatils[0].paybale_amount)
		// 				})
		// 				.catch(err=>{
		// 					console.log(err)
		// 				})
		// 		})
		// 		.catch(err=>{
		// 			console.log(err)
		// 		})
		// 	}
		// },[selectedUnit])

		//Mode of Payment
		useEffect(()=>{
			Axios.get(`/documentation/mode-of-payment/`,{
				headers:{
					Authorization:`Bearer ${accessToken}`
			}
			})
			.then(res=>{
				// console.log(res.data)
				const data=res.data.map(item=>(
					{
						label:item.mode_of_payment,
						value:item.id,
					}
				))
				setModeOfPaymentData(data);
			})
			.catch(err=>{
				console.log(err)
			})
			Axios.get(`/documentation/bank-name/`,{
				headers:{
					Authorization:`Bearer ${accessToken}`
			}
			})
			.then(res=>{
				// console.log(res.data)
				const data=res.data.map(item=>(
					{
						label:item.bank_name,
						value:item.id,
					}
				))
				setBankNameData(data);
			})
			.catch(err=>{
				console.log(err)
			})
		},[])
		
		// useEffect(()=>{
		// 	if(paymentMainData.length){
		// 		paymentMainData.forEach(element => {
		// 			if(selectedPaymentStage==element.id){
		// 				console.log("Working")
		// 				setInstallmentNo(element.step_no)
		// 				setStageDue(element.paybale_amount)
		// 				// set
		// 			}
		// 		});
		// 	}
		// },[selectedPaymentStage])

		const handleSubmit=()=>{
			setLoading(true)
			const data={
				receipt_date:receiptDate,
				project_name:selectedProject,
				unit_number:selectedUnit,
				payment_stage:paymentid,
				mode_of_payment:modeOfPayment,
				cheque_number:transactionNo,
				// drawn_on:drawnOnBank,
				transation_date:transactionDate,
				bank_name:drawnOnBank,
				branch_name:branchName,
				by_bank:by=="Bank"?true:false,
				by_customer:by=="Customer"?true:false
			}
			Axios.patch(`/documentation/receipt/${state.id}/`,data,{
				headers:{
					Authorization:`Bearer ${accessToken}`
			}
			})
			.then(res=>{
				// console.log(res.data)
				toast.success(res.data.message)
				setLoading(false)
				navigate(-1)
			})
			.catch(err=>{
				console.log(err.response.data)
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
		<Heading title={'Edit Receipt'}/>
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
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Billing Reciept</h2>
      </header>
	  <div className="p-8 w-full   mx-auto flex items-start gap-5 justify-evenly flex-wrap flex-col">
	  {/* <SubHeading heading={"DATES"}/> */}
	  <div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
		<div className='md:w-2/5 w-full'>
			<SingleInput
					label={'Receipt Date'}
					value={receiptDate}
					type={'date'}
					onChange={(e) => setReceiptDate(e.target.value)}
					placeholder={'Enter Receipt Date'}
				/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleSelectInput
					label={'By'}
					value={by}
					onChange={setBy}
					placeholder={'Select Type of Payment'}
					option={[{label:"Customer",value:"Customer"},{label:"Bank",value:"Bank"}]}
				/>
		</div>
	  </div>
	  <SubHeading heading={"PROJECT DETAILS"}/>
	  <div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
	  	<div className='md:w-2/5 w-full'>
		  <SingleSelectInput
					label={'Project'}
					value={selectedProject}
					onChange={setSelectedProject}
					placeholder={'Select Project'}
					option={project}
				/>	
		</div>
		<div className='md:w-2/5 w-full'>
		<SingleSelectInput
					label={'Unit'}
					value={selectedUnit}
					onChange={setSelectedUnit}
					placeholder={'Select Unit'}
					option={unit}
				/>
		</div>
	  </div>
	  <SubHeading heading={"STAGE DEATILS"}/>
	  <div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
		<div className='md:w-2/5 w-full'>
			<SingleInput
						isDisable={true}
						label={'Payment Stage'}
						value={selectedPaymentStage}
						onChange={(e) => setSelectedPaymentStage(e.target.value)}
						placeholder={'Select Payment Stage'}
						option={paymentData}
					/>
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput
						label={'Installment No'}
						value={installmentNo}
						onChange={(e) => setInstallmentNo(e.target.value)}
						placeholder={'Enter Installment No'}
						isDisable={true}
					/>
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput
						label={'Stage Due'}
						value={stageDue}
						onChange={(e) => setStageDue(e.target.value)}
						placeholder={'Enter Stage Due'}
						isDisable={true}
					/>
			</div>
	  </div>
	  <SubHeading heading={"MODE OF PAYMENT / DETAILS"}/>
	  <div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
		<div className='md:w-2/5 w-full'>
		<SingleSelectInput
					label={'Mode of Payment'}
					value={modeOfPayment}
					onChange={setModeOfPayment}
					placeholder={'Select Mode of Payment'}
					option={modeOfPaymentData}
				/>
			</div>
			<div className='md:w-2/5 w-full'>
			<SingleSelectInput
					label={'Drawn On Bank'}
					value={drawnOnBank}
					onChange={setDrawnOnBank}
					placeholder={'Select Bank Name'}
					option={bankNameData}
				/>
			</div>
			<div className='md:w-2/5 w-full'>
			<SingleInput
					label={'Branch Name'}
					value={branchName}
					onChange={(e) => setBranchName(e.target.value)}
					placeholder={'Enter Branch Name'}
				/>
			</div>
			<div className='md:w-2/5 w-full'>
			<SingleInput
					label={'Transaction No.'}
					value={transactionNo}
					onChange={(e) => setTransactionNo(e.target.value)}
					placeholder={'Enter Transaction No.'}
				/>
			</div>
			<div className='md:w-2/5 w-full'>
			<SingleInput
					label={'Transaction Date'}
					value={transactionDate}
					onChange={(e) => setTransactionDate(e.target.value)}
					placeholder={'Enter Transaction Date'}
					type={"Date"}
				/>
			</div>
	  </div>
	  </div>
		<div className='flex items-center justify-center m-5'>
			<Button title={'Submit'} onClick={handleSubmit}/>
		</div>
	  </div>
	</div>
  )
}
