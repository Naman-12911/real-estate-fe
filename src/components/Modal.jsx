import React, { useEffect, useRef, useState } from 'react'
import Transition from '../utils/Transition';
import NewLead from './NewLead';
import { Link } from 'react-router-dom';
import Button from './Button';
import Axios from '../Axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function Modal({modalOpen,setModalOpen,id,searchId,phoneNumber}) {
	const modalContent = useRef(null);
	const searchInput = useRef(null);
	const [projectData,setProjectData]=useState('');
	const [allButton,setAllButton]=useState('')
	const accessToken=useSelector((state)=>state.user.user);
	const [whatAppMessage,setWhatAppMessage]=useState('');

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


	useEffect(()=>{
		Axios.get("/misc/project/", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			})
			.then((res) => {
				// console.log(res.data);
				setProjectData(res.data);
			})
			.catch((err) => {
				// console.log(err);
			});
	},[])

	useEffect(()=>{
		Axios.get("/whats-app/message/all/", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			})
			.then((res) => {
				// console.log(res.data);
				setAllButton(res.data[0]);
			})
			.catch((err) => {
				// console.log(err);
			});
	},[])

	const redirectToWhatsapp=(whatsappMessage)=>{
		const data={
			phone_number:phoneNumber,
		}
		Axios.post('/whats-app/track-whats-message/',data,{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then(res=>{
			const message = encodeURIComponent(`${whatsappMessage}`);
			const url = `https://wa.me/${phoneNumber}?text=${message}`;
			window.open(url, '_blank');
		})
		.then(err=>{
			// console.log(err.response.data);
		})
	}

	const getWhatsAppMessage = (name) => {
			Axios.get(`/whats-app/filter/?project_name=${name}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				})
				.then((res) => {
					// console.log(res.data);
					if(res.data){
						redirectToWhatsapp(res.data[0].description);
					}
					else{
						toast.error("Whatsapp Redirect Message not Available")
					}
				})
				.catch((err) => {
					// console.log(err);
				});
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
		 <p className='font-semibold'>Select Project</p>
		 {projectData&&projectData.map((item,index)=>(
			<Button title={item.project_name} key={index} onClick={()=>getWhatsAppMessage(item.project_name)}/>
		 ))}
		  {allButton&&<Button title={'All Projects'} onClick={()=>redirectToWhatsapp(allButton.description)}/>}
		</div>
	  </div>
	</Transition>
  </>
  )
}
