import React, { useEffect, useState } from 'react'
import SingleInput from '../../../components/SingleInput'
import Button from '../../../components/Button'
import SingleSelectInput from '../../../components/SingleSelectInput';
import Spinner from '../../../components/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import Heading from '../../../components/Heading';

export default function SinglePersonalDetail() {
	const {state}=useLocation();
	// console.log(state)
	const accessToken=useSelector((state)=>state.user.user);

	const navigate=useNavigate();
	

	const [booking, setBooking] = useState(state?.booking.id || "");
	const [bookingData, setBookingData] = useState([]);
	const [applicantName, setApplicantName] = useState(state?.applicant_name||"");
	const [sowodo, setSowodo] = useState(state?.sowodo||"");
	const [presentAddress, setPresentAddress] = useState(state?.persent_address||"");
	const [permanentAddress, setPermanentAddress] = useState(state?.permanent_address||"");
	const [pincode, setPincode] = useState(state?.pin_code||"");
	const [dateOfBirth, setDateOfBirth] = useState(state?.date_of_birth||"");
	const [age, setAge] = useState(state?.age||"");
	const [mobileNumber, setMobileNumber] = useState(state?.mobile_number||"");
	const [residenceAddress, setResidenceAddress] = useState(state?.residence_address||"");
	const [emailAddress, setEmailAddress] = useState(state?.email_address||"");
	const [adharNumber, setAdharNumber] = useState(state?.adhar_no||"");
	const [nationality, setNationality] = useState(state?.nationality||"");
	const [panNumber, setPanNumber] = useState(state?.pan_number||"");
	const [profession, setProfession] = useState(state?.profession||"");
	const [faxNumber, setFaxNumber] = useState(state?.fax_number||"");
	const [prefix,setPrefix]=useState(state?.so_wo_do||"");
	const [maritalStatus, setMaritalStatus] = useState(state?.matial_status||"");
	const [loading,setLoading]=useState(false);
	const [error,setError]=useState(false);
	const [errorRes,setErrorRes]=useState(false);
	
	const handleSubmit=()=>{
		setLoading(true)
		const data={
			booking:booking,
			applicant_name:applicantName,
			so_wo_do:sowodo,
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

		const axiosRequest = state
		? Axios.patch(`/admin-pannel/personal-deatils/${state.id}/`, data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  })
		: Axios.post('/admin-pannel/personal-deatils/', data, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  });

		axiosRequest
		.then(res=>{
			// console.log(res.data)
			toast.success(res.data.message)
			navigate('/main/bf/editbookingform/searchapplicant')
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
			
		})
		setLoading(false)
	}

	useEffect(()=>{
		Axios.get('/booking-form/booking/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>({
				value:item.id,
				label:item.id
			}))
			setBookingData(data)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			setLoading(false)
		})
	},[])
  return (loading?<Spinner/>:
	<div>
		<div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Personal Details"} />
      </div>
      <div className="w-full flex justify-end items-end">
          <Button title={'Back'} onClick={()=>navigate(-1)}/>
        </div>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{state?'Edit':'Add'} Personal Details</h2>
      </header>
		<div className="p-8 w-full   mx-auto flex items-start justify-evenly flex-wrap gap-7">
				<div className='md:w-2/5 w-full'>
						<SingleSelectInput label={'Booking'} placeholder={'Select Booking ID'} option={bookingData} value={booking} onChange={setBooking}/>
				</div>
				<div className='md:w-2/5 w-full'>
						<SingleInput label={'Applicant Name'} placeholder={'Applicant Name'} value={applicantName} onChange={e => setApplicantName(e.target.value)}/>
				</div>
				<div className='md:w-2/5 w-full flex items-center justify-between gap-2'>
						<SingleSelectInput option={[{value:"S/O",label:"S/O"},{value:"D/O",label:"D/O"},{value:"W/O",label:"W/O"}]} label={'Select Type'} placeholder={'Select Type'} value={prefix} onChange={e => setPrefix(e.target.value)}/>
						<SingleInput label={'Name'} placeholder={''} value={sowodo} onChange={setSowodo}/>
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
						<SingleInput label={'Email Address'} placeholder={'Enter Email Address'} value={emailAddress} onChange={e => setEmailAddress(e.target.value)}/>
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
			<Button title={state?"Update":"Submit"} onClick={handleSubmit}/>
		</div>
	</div>
	</div>
  )
}
