import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useSelector } from 'react-redux';
import Axios from '../../Axios';
import { toast } from 'sonner';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
// import SingleInput from '../../components/SingleInput';
import SingleTextArea from '../../components/SingleTextArea';
import SingleFileInput from '../../components/SingleFileInput';

export default function AdminTicketUpdate() {
	const {state}=useLocation();
	const navigate=useNavigate();

	const accessToken=useSelector((state)=>state.user.user);
	const [adminMessage, setAdminMessage] = useState(state.admin_message||"");
	const [image1, setImage1] = useState(state.image||"");
	const [image2, setImage2] = useState(state.image1||"");
	const [image3, setImage3] = useState(state.image2||"");
	const [file, setFile] = useState(state.file||"");

	const [loading,setLoading]=useState(false)



		const handleSolved=()=>{
			if(!adminMessage){
				toast.error('Please enter admin Message')
			}
			else{
				const formData=new FormData()
				formData.append('solved',true)
				formData.append('admin_message',adminMessage)
				{(typeof image1==='string') ?"":formData.append("image", image1);}
				{(typeof image2==='string') ?"":formData.append("image1", image2);}
				{(typeof image3==='string') ?"":formData.append("image2", image3);}
				{(typeof file==='string') ?"":formData.append("file", file);}

				Axios.patch(`/ticket/ticket-admin/${state.id}/`,formData,{
					headers:{
						Authorization:`Bearer ${accessToken}`
					}
				})
				.then(res=>{
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
		}
		
  return (loading?<Spinner/>:
	<div>
	  <Heading title={"Tickets"} />
	  <div className="py-3 w-full   mx-auto space-y-5">
	  <div className="flex justify-end  items-end gap-5 xl:flex-row flex-col">
	  <Button
            title={"Back"}
            onClick={()=>navigate(-1)}
          />
	  </div>
		<div className='w-full flex items-center justify-start flex-col gap-5'>
				<div className="w-full p-5 flex items-start justify-start gap-2 flex-col col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
				<p className='text-lg font-semibold dark:text-white text-black underline'>Your Info</p>
					<p><span className='font-semibold dark:text-white text-black'>Name : </span>{state.name} | <span className='font-semibold dark:text-white text-black'>Phone Number : </span>{state.phone_number} | <span className='font-semibold dark:text-white text-black'>Email : </span>{state.email}</p>
					<p className='text-lg font-semibold dark:text-white text-black mt-5 underline'>Issue Topic</p>
						<p><span className='font-semibold dark:text-white text-black'>Project : </span>{state.project_names}</p>
						<p><span className='font-semibold dark:text-white text-black'>Unit Number : </span>{state.unit_number}</p>
						<p><span className='font-semibold dark:text-white text-black'>Year Of Purchase : </span>{state.year_of_purchase}</p>
						<p><span className='font-semibold dark:text-white text-black'>Possesssion Received : </span>{state.possession_recieved?'Yes':'No'}</p>
						<p><span className='font-semibold dark:text-white text-black'>Possesssion Date : </span>{state.possession_date||'-'}</p>
						<p><span className='font-semibold dark:text-white text-black'>Message : </span>{state.query}</p>
						<div className='w-full flex items-start justify-center flex-col mt-10'>
								<SingleTextArea
									label={'Admin Message'}
									placeholder={'Enter admin message'}
									onChange={(e) => setAdminMessage(e.target.value)}
									value={adminMessage}
								/>
								<div className='flex items-center justify-center gap-5 flex-wrap'> 
									<SingleFileInput label={'Image'} onChange={(e)=>setImage1(e.target.files[0])}/>
									<SingleFileInput label={'Image'} onChange={(e)=>setImage2(e.target.files[0])}/>
									<SingleFileInput label={'Image'} onChange={(e)=>setImage3(e.target.files[0])}/>
									<SingleFileInput label={'File'} onChange={(e)=>setFile(e.target.files[0])}/>
								</div>
						</div>

					<Button title={'Update & Mark as Solved'} onClick={handleSolved}/>
			</div>
			
		</div>
	  </div>
	</div>
  )
}
