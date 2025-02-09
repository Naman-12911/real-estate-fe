import React, { useEffect, useState } from 'react'
import SingleInput from '../../../components/SingleInput'
import SingleSelectInput from '../../../components/SingleSelectInput'
import Button from '../../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import Heading from '../../../components/Heading';

export default function SingleCoApplicantDetail() {
	const {state}=useLocation();
	const navigate=useNavigate()
	const accessToken=useSelector((state)=>state.user.user);

	const [personalDetail, setPersonalDetail] = useState(state?.personal_deatils.id||"");
	const [personalDetailData, setPersonalDetailData] = useState([]);
	const [profilePicture, setProfilePicture] = useState();
	const [name, setName] = useState(state?.name);
	const [dateOfBirth, setDateOfBirth] = useState(state?.date_of_birth);
	const [age, setAge] = useState(state?.age);
	const [presentAddress, setPresentAddress] = useState(state?.present_address);
	const [permanentAddress, setPermanentAddress] = useState(state?.permanent_address);
	const [residenceAddress, setResidenceAddress] = useState(state?.residence_address);
	const [emailAddress, setEmailAddress] = useState(state?.email_address);
	const [adhaarNumber, setAdhaarNumber] = useState(state?.adhar_no);
	const [nationality, setNationality] = useState(state?.nationality);
	const [panNumber, setPanNumber] = useState(state?.pan_number);
	const [profession, setProfession] = useState(state?.profession);
	const [faxNumber, setFaxNumber] = useState(state?.fax_number);
	const [maritalStatus, setMaritalStatus] = useState(state?.matial_status);

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
		const data={
			personal_deatils:state.booking.personal_details_id,
			profile_picture:profilePicture,
			name:name,
			date_of_birth:dateOfBirth,
			age:age,
			present_address:presentAddress,
			permanent_address:presentAddress,
			residence_address:residenceAddress,
			email_address:emailAddress,
			adhar_no:adhaarNumber,
			nationality:nationality,
			pan_number:panNumber,
			profession:profession,
			fax_number:faxNumber,
			matial_status:maritalStatus
		}
		const formData = new FormData();
		formData.append('personal_details',personalDetail);
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

		const axiosRequest = state
		? Axios.patch(`/admin-pannel/personal-deatils/${state.id}/`, formData, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  })
		: Axios.post('/admin-pannel/personal-deatils/', formData, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  });

		axiosRequest
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
			setErrorRes(err.response.data)
		})
	}

	useEffect(()=>{
		Axios.get('/admin-pannel/personal-deatils/',{
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
			setPersonalDetailData(data)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			setLoading(false)
		})
	},[])

  return (
	<div>
		<div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Co-Applicant Details"} />
      </div>
      <div className="w-full flex justify-end items-end">
          <Button title={'Back'} onClick={()=>navigate(-1)}/>
        </div>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{state?'Edit':'Add'} Co-Applicant Details</h2>
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
			</div >
			<div className='md:w-2/5 w-full space-y-5'>
				<SingleSelectInput label={'Personal Detail'} placeholder={'Select Personal Detail ID'} option={personalDetailData}  value={personalDetail} onChange={setPersonalDetail}/>
				<SingleInput label={'Co-Applicant Name'} placeholder={'Enter Co-Applicant Name'}  value={name} onChange={e => setName(e.target.value)}/>
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
			<Button title={state?"Update":"Submit"} onClick={handleSubmit}/>
		</div>
		
	</div>
	</div>
  )
}
