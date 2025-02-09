import React, { useEffect, useState } from 'react'
import SingleInput from '../components/SingleInput'
import Heading from '../components/Heading'
import Button from '../components/Button'
// import SingleSelectInput from '../components/SingleSelectInput'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { toast } from 'sonner'
import { baseURL } from '../Constant'

export default function Register() {
	const navigate=useNavigate();

	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const [name,setName]=useState('');
	const [phone,setPhone]=useState('');
	const [role,setRole]=useState('');

	const [acc,setAcc]=useState(false);
	const [sale,setSale]=useState(false);
	const [work,setWork]=useState(false);
	const [user,setUser]=useState(false);

	const [loading,setLoading]=useState(false);
	const [error,setError]=useState(false);
	const [errorRes,setErrorRes]=useState(false);
	

	function checkPassword(str)
		{
		var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
		return re.test(str);
		}

	const handleSubmit=(e)=>{
		e.preventDefault()
		setError('')
		if(email===''){
			toast.error('Enter your Email')
		}
		else if(name===''){
			toast.error('Enter your Full Name')
		}
		// else if(phone===''||phone.length<10){
		// 	toast.error('Enter your Phone Number / Correct Phone Number')
		// }
		// else if(role===''){
		// 	toast.error('Select your Role')
		// }
		else if(password===''){
			toast.error('Enter Password')
		}
		else if(!checkPassword(password)){
			toast.error('Enter a Password with\nMinimum 8 Characters,\nUpper Case and Lower Case,\nand a Number')
		}
		else{
			setLoading(true)
			const data={
				email,
				name,
				// accounts_employee:acc,
				// site_worker:work,
				// sales_employee:sale,
				// phone_no:phone,
				normal_user:true,
				password
			}
			axios.post(`${baseURL}account/register/`,data)
			
			.then(res=>{
				// console.log(res.data)
				setEmail('')
				setName('')
				setRole('')
				setPhone('')
				setPassword('')
				toast.success('Registration Successful',{
					description:'Login to contiune.'
				})
				navigate('/login')
				setLoading(false)
			})
			.catch(err=>{
				console.log(err.response.data)
				toast.error(err.response.data)
				setLoading(false)
			})
	
		}
	}
	useEffect(()=>{
		if(role==1){
			setAcc(true)
			setWork(false)
			setSale(false)
			setUser(false)
		}
		else if(role==2){
			setAcc(false)
			setWork(false)
			setUser(false)
			setSale(true)
		}
		else if(role==3){
			setAcc(false)
			setWork(true)
			setSale(false)
			setUser(false)
		}
		else if(role==4){
			setAcc(false)
			setWork(false)
			setSale(false)
			setUser(true)
		}
		// console.log(role)
	},[role])
  return (loading?<Spinner/>:
	<div className='h-screen w-screen flex items-center justify-center flex-row'>
			<div className='w-3/6  flex items-center justify-center flex-col space-y-4'>
					<Heading title={'REGISTER'}/>
					<form onSubmit={handleSubmit} className='space-y-4 md:w-[30rem] w-screen px-10'>
						<SingleInput label={"Email"} type={"email"} value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder={'Enter Your Email'}/>
						<SingleInput label={"Full Name"} type={"text"} value={name} onChange={(e)=>setName(e.target.value)}  placeholder={'Enter Your Full Name'}/>
						{/* <SingleInput label={"Phone Number"} type={"number"} value={phone} onChange={(e)=>setPhone(e.target.value.slice(0,10))}  placeholder={'Enter Your Full Name'}/> */}
						{/* <SingleInput label={"Role"} type={"text"} value={role} onChange={(e)=>setRole(e.target.value)}  placeholder={'Enter Role'}/> */}
						{/* <SingleSelectInput label={"Role"} type={"select"} value={role} onChange={(e)=>setRole(e.target.value)}  placeholder={'Select Role'} option={[
							{label:"User",value:4},
							{label:"Accountant",value:1},
							{label:"Sales Representative",value:2},
							{label:"Construction Professionals",value:3},
							
						]}/> */}
						<SingleInput label={"Password"} type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={'Enter Password'}/>
						<div className='flex flex-row items-center justify-between'>
							<p>Forget Password?</p>
							<Button title={'Login'} type={'submit'}/>
						</div>
						<span className='inline-block h-[1px] bg-slate-300 w-[20rem] opacity-50'></span>
						<p>Already have an Account? <span className=' text-indigo-700 cursor-pointer font-semibold' onClick={()=>navigate('/login')}>Login</span></p>
					</form>
					<span className='text-center text-red-700 font-semibold'>{error}</span>
					<span className='text-center text-red-700 font-semibold'>{
						errorRes.email ?errorRes.email[0]:errorRes.phone_no?errorRes.phone_no[0]:errorRes.name?errorRes.name[0]:errorRes.role?errorRes.role[0]:errorRes.password?errorRes.password[0]:""
					}</span>
			</div>
			<div className='w-3/6 h-screen md:flex hidden'>
				<img className='w-full h-full object-cover' src="https://images.pexels.com/photos/93400/pexels-photo-93400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
			</div>
	</div>
  )
}
