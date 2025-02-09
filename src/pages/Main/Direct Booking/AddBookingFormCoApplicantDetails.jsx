import React, { useEffect, useState } from 'react'
import SingleInput from '../../../components/SingleInput'
import SingleSelectInput from '../../../components/SingleSelectInput'
import Button from '../../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

export default function AddBookingFormCoApplicantDetails() {
	const navigate=useNavigate()
	const location=useLocation();

	const accessToken=useSelector((state)=>state.user.user);
	

	const [personalDetails, setPersonalDetails] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [name, setName] = useState('');
	const [sowodo, setSowodo] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [age, setAge] = useState('');
	const [presentAddress, setPresentAddress] = useState('');
	const [permanentAddress, setPermanentAddress] = useState('');
	const [residenceAddress, setResidenceAddress] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [adhaarNumber, setAdhaarNumber] = useState('');
	const [nationality, setNationality] = useState('');
	const [panNumber, setPanNumber] = useState('');
	const [profession, setProfession] = useState('');
	const [faxNumber, setFaxNumber] = useState('');
	const [maritalStatus, setMaritalStatus] = useState('');

	const[photoPreview,setPhotoPreview]=useState(null);
	const [loading,setLoading]=useState(true);
	const [errorRes,setErrorRes]=useState(false);

	useEffect(()=>{
		if(profilePicture){
			const objectUrl = URL.createObjectURL(profilePicture)
			setPhotoPreview(objectUrl)
		}
	},[profilePicture])


	const handleSubmit=()=>{
		setLoading(true)
		const formData = new FormData();
		formData.append('personal_details',location.state);
		formData.append('profile_picture', profilePicture);
		formData.append('name', name);
		formData.append('date_of_birth', dateOfBirth);
		formData.append('age', age);
		formData.append('present_address', presentAddress);
		formData.append('permanent_address', presentAddress);
		formData.append('residence_address', residenceAddress);
		formData.append('email_address', emailAddress);
		formData.append('adhar_no', adhaarNumber);
		formData.append('nationality', nationality);
		formData.append('pan_number', panNumber);
		formData.append('profession', profession);
		formData.append('fax_number', faxNumber);
		formData.append('matial_status', maritalStatus);
		Axios.post('/booking-form/co-deatils/',formData,{
			headers:{
					Authorization:`Bearer ${accessToken}`
				}
			})
		.then(res=>{
			// console.log(res.data)
			setPersonalDetails('');
			setProfilePicture(null);
			setName('');
			setDateOfBirth('');
			setAge('');
			setPresentAddress('');
			setPermanentAddress('');
			setResidenceAddress('');
			setEmailAddress('');
			setAdhaarNumber('');
			setNationality('');
			setPanNumber('');
			setProfession(null);
			setFaxNumber('');
			setMaritalStatus(null);
			setSowodo('');
			setPhotoPreview(null)

			toast.success(res.data.message)
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
	const handleFinish=()=>{
		toast.success("Booking Created Successfully")
		navigate('/main/db/addbookingform/projectdetails')
	}
  return (
	<div>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Co-Applicant Details</h2>
      </header>
		<div className="p-8 w-full   mx-auto flex items-start justify-evenly flex-wrap gap-7">
		<div className="p-8 w-full   mx-auto flex items-start justify-evenly flex-wrap">
			<div className='h-[30rem] md:w-2/5 w-full p-4 rounded-md flex items-center justify-evenly flex-col'>
				<div className='h-5/6 w-full'>
					<img className='h-full w-full object-contain' src={photoPreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
				</div>
				<div className='flex items-center justify-center space-x-5'>
					<input type="file" id='photo' className='hidden' onChange={(e)=>setProfilePicture(e.target.files[0])}/>
					<label htmlFor="photo" className='btn bg-indigo-500 hover:bg-indigo-600 text-white px-8 gap-2 cursor-pointer'>Select Photo</label>
					<Button title={'Remove Image'} id={'file'} onClick={()=>{setProfilePicture('');setPhotoPreview('')}}/>
				</div>
			</div>
			<div className='md:w-2/5 w-full space-y-5'>
				<SingleInput label={'Co-Applicant Name'} placeholder={'Enter Co-Applicant Name'}  value={name} onChange={e => setName(e.target.value)}/>
				<SingleInput label={'S/o or W/o or D/o'} placeholder={'Enter S/O W/O D/O'} value={sowodo} onChange={e => setSowodo(e.target.value)}/>
				<SingleInput label={'Date of Birth'} placeholder={'Enter Date of birth'} type={"date"}  value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}/>
				<SingleInput label={'Age'} placeholder={"Enter Age"}  value={age} onChange={e => setAge(e.target.value)}/>
			</div>
			<div className='md:w-2/5 w-full space-y-5'>
				<SingleInput label={'Present Address'} placeholder={'Enter Present Address'} value={presentAddress} onChange={e => setPresentAddress(e.target.value)}/>
				<SingleInput label={'Permanent Address'} placeholder={'Enter Permanent Address'} value={permanentAddress} onChange={e => setPermanentAddress(e.target.value)}/>
				<SingleInput label={'Residence Address'} placeholder={'Enter Residence Address'} value={residenceAddress} onChange={e => setResidenceAddress(e.target.value)}/>
				<SingleInput label={'Email Address'} placeholder={'Enter Email Address'} type={"Email"} value={emailAddress} onChange={e => setEmailAddress(e.target.value)}/>
				<SingleInput label={'Aadhar Number'} placeholder={'Enter Aadhar Number'} value={adhaarNumber} onChange={e => setAdhaarNumber(e.target.value)}/>
			</div>
			<div className='md:w-2/5 w-full space-y-5'>
				<SingleInput label={'Nationality'} placeholder={'Enter Nationality'} value={nationality} onChange={e => setNationality(e.target.value)}/>
				<SingleInput label={'PAN No.'} placeholder={'Enter PAN No.'} value={panNumber} onChange={e => setPanNumber(e.target.value)}/>
				<SingleSelectInput label={'Profession'} option={[{value:"Business",label:"Business"},{value:"Government",label:"Government"},{value:"Private",label:"Private"}]} placeholder={'--Enter Prosession--'} value={profession} onChange={setProfession}/>
				<SingleInput label={'FAX No.'} placeholder={'Enter FAX No.'}  value={faxNumber} onChange={e => setFaxNumber(e.target.value)}/>
				<SingleSelectInput label={'Marital Status'} option={[{value:"Single",label:"Single"},{value:"Married",label:"Married"},{value:"Other",label:"Other"}]} placeholder={'--Select Maritial Status--'}  value={maritalStatus} onChange={setMaritalStatus}/>
			</div>
			
		</div>
		</div>
		<div className='flex items-center justify-center m-5 gap-5'>
			<Button title={'Add Co-Applicant'} onClick={handleSubmit}/>
			<Button title={'Finish'} onClick={handleFinish}/>
		</div>
	</div>
	</div>
  )
}
