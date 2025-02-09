import React, { useEffect, useRef, useState } from 'react'
import Transition from '../utils/Transition';
import NewLead from './NewLead';
import { Link } from 'react-router-dom';
import Button from './Button';
import Axios from '../Axios';
import { useSelector } from 'react-redux';
import SingleInput from './SingleInput';
import { toast } from 'sonner';
import SingleSelectInput from './SingleSelectInput';

export default function ModalSiteUpdate({modalOpen,page,setModalOpen,id,searchId,itemID,unit,stage,prevStageAdmin ,prevStageWorker,finalAmount,previousAdmin,currentWorker,clearDelayId}) {
	const userType=JSON.parse(useSelector((state)=>state.userType.userType));
	// console.log(userType);
	const modalContent = useRef(null);
	const searchInput = useRef(null);
	const [amount,setAmount]=useState(0)
	const [targetStage,setTargetStage]=useState('');
	const [targetDate,setTargetDate]=useState('');
	const accessToken=useSelector((state)=>state.user.user);

	// close on click outside
	useEffect(() => {
	  const clickHandler = ({ target }) => {
		if (!modalOpen || modalContent.current.contains(target)) return
		setModalOpen(false);
	  };
	  document.addEventListener('click', clickHandler);
	  return () => document.removeEventListener('click', clickHandler);
	});
  
	// close if the esc key is pressed
	useEffect(() => {
	  const keyHandler = ({ keyCode }) => {
		if (!modalOpen || keyCode !== 27) return;
		setModalOpen(false);
	  };
	  document.addEventListener('keydown', keyHandler);
	  return () => document.removeEventListener('keydown', keyHandler);
	});
  
	useEffect(() => {
	  modalOpen && searchInput.current.focus();
	}, [modalOpen]);

	const includesAny = (array, values) => {
		return values.some(value =>array&& array.includes(value));
		
	  };


	const stageDataMapping = {
		'site_worker' : {
			'Stage 1': { worker_stage1: true },
			'Stage 2': { worker_stage2: true },
			'Stage 3': { worker_stage3: true },
			'Stage 4': { worker_stage4: true },
			'Stage 5': { worker_stage5: true },
			'Stage 6': { worker_stage6: true },
			'Stage 7': { worker_stage7: true },
		},
		'admin': {
			'Stage 1': { admin_stage1: true },
			'Stage 2': { admin_stage2: true },
			'Stage 3': { admin_stage3: true },
			'Stage 4': { admin_stage4: true },
			'Stage 5': { admin_stage5: true },
			'Stage 6': { admin_stage6: true },
			'Stage 7': { admin_stage7: true },
			'Clear Delay':{
				delay_stage1:false,
				delay_stage2:false,
				delay_stage3:false,
				delay_stage4:false,
				delay_stage5:false,
				delay_stage6:false,
				delay_stage7:false,
			}
		},
	};

	const handleSubmit=()=>{
		let data = {};

		if (Array.isArray(userType)) {
			userType.forEach(role => {
				if (stageDataMapping[role]) {
					const stageData = stageDataMapping[role][stage];
					if (stageData) {
						data = { ...stageData, total_rec: amount,unit_no:unit };
					}
				}
			});
		}
		const url=stage=='Clear Delay'?`/site/worker/${unit}/`:`/site/worker/`
		Axios.patch(url,data,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			// console.log(res.data)
			toast.success(`${stage} updated successfully`)
			setAmount(0)
			setModalOpen(false);
			if(includesAny(userType,["site_worker"])){
			const data={
					accept:false,
					}
					Axios.patch(`/site/worker/patch/${itemID}/`,data,{
						headers:{
							Authorization:`Bearer ${accessToken}`
						}
					})
					.then(res=>{
						// console.log(res.data)
						toast.success(`Target set successfully`)
						setModalOpen(false);
					})
					.catch(err=>{
						setAmount(0)
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
					})
			}
		})
		.catch(err=>{
			setAmount(0)
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
		})
	}



	  
	  const handleSubmitTarget=()=>{
		if(!targetDate || !targetStage){
			toast.error('Please select Date and Stage')
		}
		else{
			const data={
				stage_name:targetStage,
				admin_target_date:targetDate,
				target:true,
			}
			Axios.patch(`/site/worker/patch/${unit}/`,data,{
				headers:{
					Authorization:`Bearer ${accessToken}`
				}
			})
			.then(res=>{
				// console.log(res.data)
				toast.success(`Target set successfully`)
				setModalOpen(false);
			})
			.catch(err=>{
				setAmount(0)
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
			})
		}
	  }

	  const handleAcceptTarget=()=>{
		if(!targetDate ){
			toast.error('Please select Date')
		}
		const data={
			worker_target_date:targetDate,
			accept:true,
		}
		Axios.patch(`/site/worker/patch/${unit}/`,data,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			// console.log(res.data)
			toast.success(`Target set successfully`)
			setModalOpen(false);
		})
		.catch(err=>{
			setAmount(0)
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
		})
	  }
  return (
	<>
	{/* Modal backdrop */}
	<Transition
	  className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
	  show={modalOpen}
	  enter="transition ease-out duration-200"
	  enterStart="opacity-0"
	  enterEnd="opacity-100"
	  leave="transition ease-out duration-100"
	  leaveStart="opacity-100"
	  leaveEnd="opacity-0"
	  aria-hidden="true"
	/>
	{/* Modal dialog */}
	<Transition
	  id={id}
	  className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
	  role="dialog"
	  aria-modal="true"
	  show={modalOpen}
	  enter="transition ease-in-out duration-200"
	  enterStart="opacity-0 translate-y-4"
	  enterEnd="opacity-100 translate-y-0"
	  leave="transition ease-in-out duration-200"
	  leaveStart="opacity-100 translate-y-0"
	  leaveEnd="opacity-0 translate-y-4"
	>
	  <div
		ref={modalContent}
		className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
	  >
		{page=="YES/NO"?<>
		{includesAny(userType,["admin"]) && (stage=='Clear Delay'?<div className="py-4 px-2 flex items-center justify-center flex-col gap-4" ref={searchInput}>
			<p className='text-base text-center'>Are you sure you want to clear all delays?</p>
		 <div className='w-full flex items-center justify-evenly'>
			<Button title={'Yes'} onClick={handleSubmit}/>
			<Button title={'No'} onClick={()=>setModalOpen(false)}/>
		 </div>
		</div>:(previousAdmin&&currentWorker)?<div className="py-4 px-2 flex items-center justify-center flex-col gap-4" ref={searchInput}>
			<div className='flex items-start justify-start flex-col gap-4'>
				<p className='text-base text-center'>Are you sure you want to update the stage ?</p>
				<SingleInput label={'Money Received:'} placeholder={'Enter Money Received'} value={amount} onChange={(e)=>setAmount(e.target.value)}/>
			</div>
			
	
		 <div className='w-full flex items-center justify-evenly'>
			<Button title={'Yes'} onClick={handleSubmit}/>
			<Button title={'No'} onClick={()=>setModalOpen(false)}/>
		 </div>
		</div>:(previousAdmin&&!currentWorker)?<div className="py-4 px-2 flex items-center justify-center flex-col gap-4" ref={searchInput}>
			<p className='text-base text-center'>You cannot update this stage before worker !</p>
	
		 <div className='w-full flex items-center justify-evenly'>
			<Button title={'Ok'} onClick={()=>setModalOpen(false)}/>
		 </div>
		</div>:(!previousAdmin&&currentWorker)?<div className="py-4 px-2 flex items-center justify-center flex-col gap-4" ref={searchInput}>
			<p className='text-base text-center'>Please update previous Stage, before updating this Stage !</p>
	
		 <div className='w-full flex items-center justify-evenly'>
			<Button title={'Ok'} onClick={()=>setModalOpen(false)}/>
		 </div>
		</div>:<div className="py-4 px-2 flex items-center justify-center flex-col gap-4" ref={searchInput}>
			<p className='text-base text-center'>You cannot update this stage before worker !</p>
	
		 <div className='w-full flex items-center justify-evenly'>
			<Button title={'Ok'} onClick={()=>setModalOpen(false)}/>
		 </div>
		</div>)}

		{includesAny(userType,["site_worker"]) && (prevStageWorker?<div className="py-4 px-2 flex items-center justify-center flex-col gap-4" ref={searchInput}>
			<p className='text-base text-center'>{'Are you sure you want to update the stage?'}</p>
	
		 <div className='w-full flex items-center justify-evenly'>
			<Button title={'Yes'} onClick={handleSubmit}/>
			<Button title={'No'} onClick={()=>setModalOpen(false)}/>
		 </div>
		</div>:<div className="py-4 px-2 flex items-center justify-center flex-col gap-4" ref={searchInput}>
			<p className='text-base text-center'>{'Please update previous Stage, before updating this Stage !'}</p>
	
		 <div className='w-full flex items-center justify-evenly'>
			{/* <Button title={'Yes'} onClick={handleSubmit}/> */}
			<Button title={'Ok'} onClick={()=>setModalOpen(false)}/>
		 </div>
		</div>)}
		</>: page=='Target'?(
			<div className="py-4 px-2 flex items-center justify-start flex-col gap-4 w-full h-[30rem]" ref={searchInput}>
				<p className='text-base text-center'>Set Target for Stage</p>
				<SingleSelectInput label={'Stage'} placeholder={'Select Stage'} width={'19rem'} value={targetStage} onChange={setTargetStage} option={[
					 { label: 'Stage 1', value: 'Stage 1' },
					 { label: 'Stage 2', value: 'Stage 2' },
					 { label: 'Stage 3', value: 'Stage 3' },
					 { label: 'Stage 4', value: 'Stage 4' },
					 { label: 'Stage 5', value: 'Stage 5' },
					 { label: 'Stage 6', value: 'Stage 6' },
					 { label: 'Stage 7', value: 'Stage 7' }
				]}/>
				<SingleInput label={'Date'} placeholder={'Traget Date'} value={targetDate} onChange={(e)=>setTargetDate(e.target.value)} type={'date'}/>
				
				
				<div className='w-full flex items-center justify-evenly gap-10'>
					<Button title={'Submit'} onClick={handleSubmitTarget}/>
					<Button title={'Cancel'} onClick={()=>setModalOpen(false)}/>
		 		</div>
			</div>
		):(
			<div className="py-4 px-2 flex items-center justify-start flex-col gap-4 w-full" ref={searchInput}>
				<p className='text-base text-center'>Accept Target</p>
				<SingleInput label={'Date'} placeholder={'Traget Date'} value={targetDate} onChange={(e)=>setTargetDate(e.target.value)} type={'date'}/>
					<div className='w-full flex items-center justify-evenly gap-10'>
						<Button title={'Submit'} onClick={handleAcceptTarget}/>
						<Button title={'Cancel'} onClick={()=>setModalOpen(false)}/>
					</div>
				</div>
			
		)}
		
		

	  </div>
	</Transition>
  </>
  )
}
