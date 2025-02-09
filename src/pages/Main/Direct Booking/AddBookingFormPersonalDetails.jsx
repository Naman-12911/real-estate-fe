import React, { useState } from 'react'
import SingleInput from '../../../components/SingleInput'
import Button from '../../../components/Button'
import SingleSelectInput from '../../../components/SingleSelectInput';
import Spinner from '../../../components/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

export default function AddBookingFormPersonalDetails() {
	const location=useLocation();
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	
	// console.log(location);

	const [booking, setBooking] = useState('');
	const [applicantName, setApplicantName] = useState('');
	const [sowodo, setSowodo] = useState('');
	const [presentAddress, setPresentAddress] = useState('');
	const [permanentAddress, setPermanentAddress] = useState('');
	const [pincode, setPincode] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [age, setAge] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [residenceAddress, setResidenceAddress] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [adharNumber, setAdharNumber] = useState('');
	const [nationality, setNationality] = useState('');
	const [panNumber, setPanNumber] = useState('');
	const [profession, setProfession] = useState('');
	const [faxNumber, setFaxNumber] = useState('');
	const [maritalStatus, setMaritalStatus] = useState('');
	const [prefix,setPrefix]=useState('');
	const [loading,setLoading]=useState(false);
	const [error,setError]=useState(false);
	const [errorRes,setErrorRes]=useState(false);
	
	const handleSubmit=()=>{
		setLoading(true)
		const data={
			booking:location.state,
			applicant_name:applicantName,
			so_wo_do:prefix,
			sowodo:sowodo,
			persent_address:presentAddress,
			permanent_address:presentAddress,
			pin_code:pincode,
			date_of_birth:dateOfBirth,
			age:age,
			mobile_number:mobileNumber,
			residence_address:residenceAddress,
			email_address:emailAddress,
			adhar_no:adharNumber,
			nationality:nationality,
			pan_number:panNumber,
			profession:profession,
			fax_number:faxNumber,
			matial_status:maritalStatus
		}
		Axios.post('/booking-form/personal-deatils/',data,{
			headers:{
					Authorization:`Bearer ${accessToken}`
				}
			})
		.then(res=>{
			// console.log(res.data)
			toast.success(res.data.message)
			navigate('/main/db/addbookingform/co-applicantdetails',{state:res.data.id})
			setLoading(false)
		})
		.catch(err=>{
			console.log(err)
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
// console.log(`${prefix} ${sowodo}`)
// console.log(sowodo);
  return (loading?<Spinner/>:
	<div>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Personal Details</h2>
      </header>
		<div className="p-8 w-full   mx-auto flex items-start justify-evenly flex-wrap gap-7">
				<div className='md:w-2/5 w-full'>
						<SingleInput  label={'Applicant Name'} placeholder={'Applicant Name'} value={applicantName} onChange={e => setApplicantName(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full flex items-center justify-between gap-2'>
						<SingleSelectInput option={[{value:"S/O",label:"S/O"},{value:"D/O",label:"D/O"},{value:"W/O",label:"W/O"}]} label={'Select Type'} placeholder={'Select Type'} value={prefix} onChange={setPrefix}/>
						<SingleInput label={'Name'} placeholder={'Enter Name'} value={sowodo} onChange={(e)=>setSowodo(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full' >
						<SingleInput label={'Present Address'} placeholder={'Enter Present Address'} value={presentAddress} onChange={e => setPresentAddress(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Permanent Address'} placeholder={'Enter Permanent Address'} value={permanentAddress} onChange={e => setPermanentAddress(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Pin Code'} placeholder={'Enter PinCode'} value={pincode} onChange={e => setPincode(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Date of Birth'} placeholder={'Enter Date of birth'} type={'date'} value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Age'} placeholder={'Enter Age'} value={age} onChange={e => setAge(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full '>
						<SingleInput label={'Mobile'} placeholder={'Enter Mobile Number'} value={mobileNumber} onChange={e => setMobileNumber(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Residence Number'} placeholder={'Enter Residence Number'} value={residenceAddress} onChange={e => setResidenceAddress(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Email Address'} type={"Email"} placeholder={'Enter Email Address'} value={emailAddress} onChange={e => setEmailAddress(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Aadhar Number'} placeholder={'Enter Aadhar Number'} value={adharNumber} onChange={e => setAdharNumber(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Nationality'} placeholder={'Enter Nationality'} value={nationality} onChange={e => setNationality(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'PAN No.'} placeholder={'Enter PAN No.'} value={panNumber} onChange={e => setPanNumber(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleSelectInput option={[{value:"Business",label:"Business"},{value:"Government",label:"Government"},{value:"Private",label:"Private"}]} label={'Profession'} placeholder={'--Select Prosession--'} value={profession} onChange={setProfession}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'FAX No.'} placeholder={'Enter FAX No.'} value={faxNumber} onChange={e => setFaxNumber(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleSelectInput option={[{value:"Single",label:"Single"},{value:"Married",label:"Married"},{value:"Other",label:"Other"}]} label={'Marital Status'} placeholder={'--Select Maritial Status--'} value={maritalStatus} onChange={setMaritalStatus}/>
				</div>
		</div>
		<div className='flex items-center justify-center m-5'>
			<Button title={'Submit & Next'} onClick={handleSubmit}/>
		</div>
		<div className='w-full flex items-center justify-center'>
			<span className='text-center text-red-700 font-semibold'>
			{errorRes.adhar_no?.[0] ||
              errorRes.age?.[0] ||
              errorRes.applicant_name?.[0] ||
              errorRes.date_of_birth?.[0] ||
              errorRes.email_address?.[0] ||
              errorRes.fax_number?.[0] ||
              errorRes.matial_status?.[0] ||
              errorRes.mobile_number?.[0] ||
              errorRes.nationality?.[0] ||
              errorRes.pan_number?.[0] ||
              errorRes.permanent_address?.[0] ||
              errorRes.persent_address?.[0] ||
              errorRes.pin_code?.[0] ||
              errorRes.profession?.[0] ||
              errorRes.residence_address?.[0] ||
              errorRes.so_wo_do?.[0] ||
              ""}
						</span>
		</div>
	</div>
	</div>
  )
}
