import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import Button from '../../components/Button'
import ModalTicketRaising from '../../components/ModalTicketRaising'
import { useSelector } from 'react-redux';
import Axios from '../../Axios';
import Spinner from '../../components/Spinner';
import { toast } from 'sonner';
import { baseURL } from '../../Constant';

export default function TicketRaiseing() {
	const accessToken=useSelector((state)=>state.user.user);
	
	const [data,setData]=useState('')
	const [loading,setLoading]=useState(false)
	const [del,setDel]=useState(false);

	const [searchModalOpen, setSearchModalOpen] = useState(false);

	const handleDelete=(id)=>{
		setLoading(true)
		Axios.delete(`/ticket/ticket/${id}/`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			// setData(res.data)
			toast.success(res.data.message)
			setDel(!del)
			setLoading(false)
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

	useEffect(()=>{
		// setLoading(fals)
		Axios.get(`/ticket/ticket/`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			setData(res.data)
			setLoading(false)
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
	},[searchModalOpen,del])

  return (loading?<Spinner/>:
	<div>
	  <Heading title={"Tickets"} />
	  <div className="py-3 w-full   mx-auto space-y-5">
		<div className='w-full flex item-end justify-end'>
			<Button title={'New Ticket'} onClick={(e)=>{e.stopPropagation();setSearchModalOpen(true)}}/>
		</div>
		<div className='w-full flex items-center justify-start flex-col gap-5'>
			{data.length>0?data.map((item,index)=>(
				<div key={index} className="w-full p-5 flex items-start justify-start gap-2 flex-col col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
					<p className='text-lg font-semibold dark:text-white text-black underline'>Your Info</p>
					<p><span className='font-semibold dark:text-white text-black'>Name : </span>{item.name} | <span className='font-semibold dark:text-white text-black'>Phone Number : </span>{item.phone_number} | <span className='font-semibold dark:text-white text-black'>Email : </span>{item.email}</p>
					<p className='text-lg font-semibold dark:text-white text-black mt-5 underline'>Issue Topic</p>
						<p><span className='font-semibold dark:text-white text-black'>Project : </span>{item.project_names}</p>
						<p><span className='font-semibold dark:text-white text-black'>Unit Number : </span>{item.unit_number}</p>
						<p><span className='font-semibold dark:text-white text-black'>Year Of Purchase : </span>{item.year_of_purchase}</p>
						<p><span className='font-semibold dark:text-white text-black'>Possesssion Received : </span>{item.possession_recieved?'Yes':'No'}</p>
						<p><span className='font-semibold dark:text-white text-black'>Possesssion Date : </span>{item.possession_date||'-'}</p>
						<p><span className='font-semibold dark:text-white text-black'>Message : </span>{item.query}</p>
					{item.admin_message&&<><p className='text-lg font-semibold dark:text-white text-black mt-5 underline'>Admin Response</p>
					<p><span className='font-semibold dark:text-white text-black'>Message : </span>{item.admin_message}</p>
					<div className='flex items-start justify-start flex-wrap gap-2'>
					{item.image&&<a href={baseURL+item.image.slice(1)} target='_blank'><Button title={'Image'}/></a>}
					{item.image1&&<a href={baseURL+item.image1.slice(1)} target='_blank'><Button title={'Image'}/></a>}
					{item.image2&&<a href={baseURL+item.image2.slice(1)} target='_blank'><Button title={'Image'}/></a>}
					{item.file&&<a href={baseURL+item.file.slice(1)} target='_blank'><Button title={'File'}/></a>}
					</div></>}
					

					<p className={`${item.solved?'bg-green-600':'bg-red-600'} px-1 py-1 text-white rounded-sm text-sm`}><span className='font-semibold'>Solved : </span> {item.solved?'Solved':'Not Solved'}</p>
					<Button title={'Delete'} onClick={()=>handleDelete(item.id)}/>
			</div>
			)):<div className='w-full flex items-center justify-center'>
			<p className='lg:text-xl text-base font-semibold'>No Tickets Found</p>
		  </div>}
			
		</div>
	  
	  </div>
	  <ModalTicketRaising id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen}/>
	</div>
  )
}
