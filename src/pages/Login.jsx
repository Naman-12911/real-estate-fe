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
// import { requestForToken } from '../firebase'
// import { initializePushNotifications } from '../components/advanceComponent/pushNotifications'
// import { Capacitor } from '@capacitor/core'

export default function Login() {
	const dispatch=useDispatch();
	const navigate=useNavigate();

	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const [name,setName]=useState('');
	const [role,setRole]=useState('');
	const [loading,setLoading]=useState(false);
	const [error,setError]=useState(false);
	const [errorRes,setErrorRes]=useState(false);

	const getActiveRoles = (response) => {
		const roles = ["sales_employee", "accounts_employee", "site_worker", "admin", "normal_user"];
		return roles.filter(role => response[role]);
	  };


const handleSubmit=(e)=>{
	e.preventDefault()
		setError('')
		if(email===''){
			setError('Enter your Email')
		}
		else if(password===''){
			setError('Enter Password')
		}
		else{
			setLoading(true)
			const data={
				email,
				password
			}
			axios.post(`${baseURL}account/login/`,data)
			.then(res=>{
				// console.log(res.data)
				localStorage.setItem("access_token", res.data.tokens.access);
				localStorage.setItem("user", JSON.stringify(res.data));
				dispatch(userLogin(res.data.tokens.access));
				const activeRoles=getActiveRoles(res.data)
				localStorage.setItem("user_type",JSON.stringify(activeRoles));
				dispatch(userTypePush(JSON.stringify(activeRoles)));
				// if(Capacitor.isNativePlatform()){
				// 	initializePushNotifications(navigate);
				// }
				// else{
				// 	// requestForToken();
				// }
				setEmail('')
				setPassword('')
				if(res.data.email=="sureshsirci@gmail.com"){
					navigate('/admin/accountreport')
				}
				else if(res.data.admin){
					navigate('/admin/viewleads')	
				}
				else if(res.data.accounts_employee){
					navigate('/main/db/propertystatus')
				}
				else if(res.data.sales_employee){
					navigate('/sale/viewleads')
				}
				else if(res.data.site_worker){
					navigate('/constructor/searchapplicant')
				}
				else if(res.data.normal_user){
					navigate('/ticket/raising')
				}			
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
			<div className='md:w-3/6 w-full flex items-center justify-center flex-col space-y-4'>
					<Heading title={'LOGIN'}/>
					<form onSubmit={handleSubmit} className='space-y-4 w-5/6 md:w-1/2'>
						<SingleInput label={"Email"} type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={'Enter Email'}/>
						<SingleInput label={"Password"} type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={'Enter Password'}/>
						<div className='flex flex-row items-center justify-between'>
							<p>Forget Password?</p>
							<Button title={'Login'} type={'submit'}/>
						</div>
						<span className='inline-block h-[1px] bg-slate-300 w-[20rem] opacity-50'></span>
						<p>Don’t you have an account? <span className=' text-indigo-700 cursor-pointer font-semibold' onClick={()=>navigate('/register')}>Sign Up</span></p>
					</form>
					<span className='text-center text-red-700 font-semibold'>{error}</span>
					<span className='text-center text-red-700 font-semibold'>{
						errorRes.email ?errorRes.email[0]:errorRes.password?errorRes.phone_no[0]:errorRes.detail?errorRes.detail:""
					}</span>
			</div>
			<div className='w-3/6 h-screen md:flex hidden'>
				<img className='w-full h-full object-cover' src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
			</div>
	</div>
  )
}
