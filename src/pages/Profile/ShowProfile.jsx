import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import SingleInput from '../../components/SingleInput'
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import Axios from '../../Axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function ShowProfile() {
	const data=JSON.parse(localStorage.getItem('user'))
	const accessToken=useSelector((state)=>state.user.user);

	const [email,setEmail]=useState("");
	const [name,setName]=useState('');
	const [phone,setPhone]=useState('');
	const [role,setRole]=useState('');
	const [loading,setLoading]=useState(false);
	const [edit,setEdit]=useState(false);
	const [error,setError]=useState(false);
	const [errorRes,setErrorRes]=useState(false);
	
useEffect(()=>{
	setEmail(data.email)
	setName(data.name)
	setPhone(data.phone_no)
	setRole(data.accounts_employee?"Accountant":data.sales_employee?"Sales Representative":data.site_worker?"Construction Professional":data.admin?"Admin":"404 Role Not Found")
	setLoading(false)
	setError(false)
},[])

useEffect(()=>{
	if(!data){
		location.reload();
	}
},[])

const handleUpdate=()=>{
	setLoading(true)
	const data={
		role,name
	}
	Axios.patch('/account/update-profile/',data,{
		headers:{
			Authorization:`Bearer ${accessToken}`
	}
	})
	.then(res=>{
		// console.log(res.data)
		toast.success("Profile Update Successfull")
		localStorage.setItem('profile',JSON.stringify(res.data))
		setLoading(false)
	})
	.catch(err=>{
		console.log(err.response.data)
		setLoading(false)
		toast.error("Profile Update  Not Successfull")
	})
}
  return (loading?<Spinner/>:
	<div>
	   <Heading title={"Profile"}/>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Welcome {data.name}</h2>
      </header>
		<div className="p-8 w-full   mx-auto flex flex-col md:flex-row flex-wrap gap-2 justify-evenly items-center space-y-5">
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Email'} type={'email'} value={email} onChange={e=>setEmail(e.target.value)} placeholder={'Enter your Email'} isDisable={true} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Name'} type={'text'} value={name} onChange={e=>setName(e.target.value)} placeholder={'Enter your Name'} isDisable={!edit} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Phone Number'} type={'number'} value={phone} onChange={e=>setPhone(e.target.value)} placeholder={'Enter your Phone'} isDisable={true} />
			</div>
			<div className='md:w-2/5 w-full'>
				<SingleInput label={'Role'} type={'text'} value={role} onChange={e=>setRole(e.target.value)} placeholder={'Enter your Role'} isDisable={true} />
			</div>
		</div>
		<div className='w-full flex items-center justify-center space-x-5 my-5'>
				{edit?<Button title={'Update'} onClick={handleUpdate}/>:<Button title={'Edit'} onClick={()=>setEdit(true)}/>}
			</div>
			<div className='w-full flex items-center justify-center'>
				<span className='text-center text-green-700 font-semibold self-center'>{error}</span>
			</div>
	  </div>
	</div>
  )
}
