import React, { useState } from 'react'
import SingleInput from '../components/SingleInput'
import Heading from '../components/Heading'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { userLogin } from '../app/User'
import { baseURL } from '../Constant'
import { userTypePush } from '../app/UserType'
import SingleTextArea from '../components/SingleTextArea'

export default function ContactUs() {
	const dispatch=useDispatch();
	const navigate=useNavigate();

	const [email,setEmail]=useState("");
	const [subject,setSubject]=useState("");
	const [message,setMessage]=useState('');

	const [loading,setLoading]=useState(false);

	// const getActiveRoles = (response) => {
	// 	const roles = ["sales_employee", "accounts_employee", "site_worker", "admin", "normal_user"];
	// 	return roles.filter(role => response[role]);
	//   };


const handleSubmit=(e)=>{
	e.preventDefault()
		if(!email||!message||!subject){
			toast.error('Please fill all the fields')
		}
		else{
			setLoading(true)
			const data={
				name:email,
				subject,
				message
			}
			axios.post(`${baseURL}contact/contact/`,data)
			.then(res=>{
				// console.log(res.data)
				toast.success(res.data.message)
				setEmail('')
				setMessage('')
				setMessage('')
				setLoading(false)
			})
			.catch(err=>{
				console.log(err)
				if(err.response.data.detail){
					toast.error(err.response.data.detail)
				}
				else{
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
				}
				setLoading(false)
			})
		}
}
  return (loading?<Spinner/>:
	<div className='h-screen w-screen flex items-center justify-center flex-row'>
			<div className='w-3/6 flex items-center justify-center flex-col space-y-4'>
					<Heading title={'Contact Us'}/>
					<form onSubmit={handleSubmit} className='space-y-4 w-96'>
						<SingleInput label={"Email"} type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={'Enter Email'}/>
						<SingleInput label={"Subject"}  value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder={'Enter Subject'}/>
						<SingleTextArea label={"Message"}  value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={'Enter Message'}/>

						<div className='flex flex-row items-center justify-between'>
							{/* <p>Forget Password?</p> */}
							<Button title={'Submit'} type={'submit'}/>
						</div>
					</form>
			</div>
			<div className='w-3/6 h-screen md:flex hidden'>
				<img className='w-full h-full object-cover' src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
			</div>
	</div>
  )
}
