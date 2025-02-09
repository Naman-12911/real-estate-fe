import React, { useEffect, useRef, useState } from 'react'
import Transition from '../utils/Transition';
import NewLead from './NewLead';
import { Link } from 'react-router-dom';
import Button from './Button';
import Axios from '../Axios';
import { useSelector } from 'react-redux';
import SingleInput from './SingleInput';
import { toast } from 'sonner';

export default function ModalDeleteCancelBill({modalOpen,setModalOpen,id,searchId,url,title}) {
	const modalContent = useRef(null);
	const searchInput = useRef(null);
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

	const handleSubmit=()=>{
		const data={
			cancel:title=='Are you sure you want to delete this Receipt ?'?false:true,
			delete:title=='Are you sure you want to delete this Receipt ?'?true:false,
		}
		Axios.patch(url,data,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			// console.log(res.data)
			toast.success(title=='Are you sure you want to delete this Receipt ?'?'Your receipt has been deleted successfully !':'Your receipt has been canceled successfully !')
			setModalOpen(false);
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
		<div className="py-4 px-2 flex items-center justify-center flex-col gap-4" ref={searchInput}>
			<p className='text-base text-center'>{title}</p>
	
		 <div className='w-full flex items-center justify-evenly'>
			<Button title={'Yes'} onClick={handleSubmit}/>
			<Button title={'No'} onClick={()=>setModalOpen(false)}/>

		 </div>
		  
		</div>
	  </div>
	</Transition>
  </>
  )
}
