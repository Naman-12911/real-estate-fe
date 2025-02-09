import React, { useState } from 'react'
import Heading from '../../../components/Heading'
import SingleInput from '../../../components/SingleInput'
import Button from '../../../components/Button'
import Axios from '../../../Axios'
import { useLocation } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

export default function UploadDocument() {
	const {state}=useLocation();
	const accessToken=useSelector((state)=>state.user.user);
	// console.log(state);
	const [documentType,setDocumentType]=useState('')
	const [file,setFile]=useState('')
	const [loading,setLoading]=useState(false)
	
	const handleSubmit=()=>{
		setLoading(true)
		if(!file){
			toast.error('Document Not Selected')
			setLoading(false)
		}
		else if(!documentType){
			toast.error('Document type is Empty')
			setLoading(false)
		}
		else{
			const formData = new FormData();
			formData.append('document_name',documentType)
			formData.append('document',file)
			Axios.patch(`/booking-form/personal-deatils/${state.booking.personal_details_id}/`,formData,{
				headers:{
					Authorization:`Bearer ${accessToken}`
			}
			})
			.then(res=>{
				// console.log(res.data)
				toast.success(res.data.message)
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
		}
	}
  return (loading?<Spinner/>:
	<div>
	  <Heading title={"Upload Document"}/>
	  	<div className="py-3 w-full   mx-auto space-y-5">
	  		<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
			  <div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
				<div className='md:w-1/4 w-full'>
					<SingleInput label={'Type of Document'} placeholder={"Type of Document"} onChange={(e)=>setDocumentType(e.target.value)}/>
				</div>
				<div className='md:w-1/4 w-full'>
					<label htmlFor="">Select File</label>
					<input type='file'  placeholder={"--Select Project Type--"} onChange={(e)=>setFile(e.target.files[0])}/>
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
