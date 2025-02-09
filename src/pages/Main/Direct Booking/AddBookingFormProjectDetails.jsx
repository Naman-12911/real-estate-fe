import React, { useEffect, useState } from 'react'
import SingleInput from '../../../components/SingleInput'
import SingleSelectInput from '../../../components/SingleSelectInput'
import Button from '../../../components/Button'
import Axios from '../../../Axios'
import Spinner from '../../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../../app/User'
import SubHeading from '../../../components/SubHeading'
import SingleDateInput from '../../../components/SingleDateInput'

export default function AddBookingFormProjectDetails() {
	const dispatch=useDispatch();
	dispatch(userLogin());
	
	
	const accessToken=useSelector((state)=>state.user.user);
	const navigate=useNavigate();

	const [selectedProject,setSelectedProject]=useState('')
	const [selectedType,setSelectedType]=useState('')
	const [selectedUnit,setSelectedUnit]=useState('')
	const [status,setStatus]=useState('')
	const [selectedTaxType,setSelectedTaxType]=useState('')
	const [taxPercentage,setTaxPercentage]=useState('')
	const [unitCost,setUnitCost]=useState('')
	const [interestRate,setInterestRate]=useState('')
	const [annulIncome,setAnnualIncome]=useState('')
	const [east,setEast]=useState('')
	const [west,setWest]=useState('')
	const [north,setNorth]=useState('')
	const [south,setSouth]=useState('')
	const [booking,setBooking]=useState('')
	const [applicationDate,setApplicationDate]=useState('')
	const [gender,setGender]=useState('')
	const [loan,setLoan]=useState('')
	const [photo,setPhoto]=useState('')
	const [discount, setDiscount] = useState('');
	const [totalAfterDiscount, setTotalAfterDiscount] = useState('');
	const [externalElectrificationCharges, setExternalElectrificationCharges] = useState(0);
	const [waterConnectionCharges, setWaterConnectionCharges] = useState(0);
	const [maintenanceChargesFor2Years, setMaintenanceChargesFor2Years] = useState(0);
	const [societyCharges, setSocietyCharges] = useState(0);
	const [mutationCharges, setMutationCharges] = useState(0);
	const [parkFacingCharges, setParkFacingCharges] = useState(0);
	const [cornerPlotCharges, setCornerPlotCharges] = useState(0);
	const [govtTax, setGovtTax] = useState(0);
	const [wideRoadFacingCharges, setWideRoadFacingCharges] = useState(0);
	const [otherCharges, setOtherCharges] = useState(0);
	const [registryCharges, setRegistryCharges] = useState(0);
	const [costPayable, setCostPayable] = useState(0);
	const [registryDate,setRegistryDate]=useState('');
	const [registry,setRegistry]=useState('');
	const [muatationDate,setmuatationDate]=useState('');
	const [muatation,setmuatation]=useState('');
	const [possessionDate,setpossessionDate]=useState('');
	const [possession,setpossession]=useState('');
	const [finalTotal,setFinalTotal]=useState('');



	const [project,setProject]=useState('')
	const [photoPreview,setPhotoPreview]=useState('')
	const [type,setType]=useState('')
	const [unit,setUnit]=useState('')
	const [tax,setTax]=useState('')
	const [taxData,setTaxData]=useState([])
	const [unitData,setUnitData]=useState([])
	const [projectData,setProjectData]=useState([])

	const [loading,setLoading]=useState(true);
	const [error,setError]=useState(false);
	const [errorRes,setErrorRes]=useState(false);

	useEffect(()=>{
		//Projects
		Axios.get('/misc/project/',{
			
headers:{
	Authorization: `Bearer ${accessToken}`
   }
		})
		.then(res=>{
			// console.log(res.data)
			setProjectData(res.data)
			const data=res.data.map(item=>(
				{
					label:item.project_name,
					value:item.id
				}
			))
			setProject(data);
		})
		.catch(err=>{
			console.log(err)
		})

		//Types
		Axios.get(`/misc/project-type-filter/?project_id=${selectedProject}`,{
			
headers:{
	Authorization: `Bearer ${accessToken}`
   }
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>(
				{
					label:item.property_type,
					value:item.id
				}
			))
			setType(data);
		})
		.catch(err=>{
			console.log(err)
		})

		//Units
		Axios.get(`/misc/unit-no-with-available/?projects_id=${selectedProject}`,{
			
headers:{
	Authorization: `Bearer ${accessToken}`
   }
		})
		.then(res=>{
			// console.log(res.data)
			// setStatus(res.data.available?"AVAILABLE":res.data.hold?"HOLD":res.data.booked?"BOOKED":"CHECKING")
			setUnitData(res.data)
			const data=res.data.map(item=>(
				{
					label:item.unit_no,
					value:item.id
				}
			))
			setUnit(data);
		})
		.catch(err=>{
			console.log(err)
		})

		//Status
		for(let i=0;i<unitData.length;i++){
			if(unitData[i].id==selectedUnit){
				setStatus(unitData[i].available?"AVAILABLE":unitData[i].hold?"HOLD":unitData[i].booked?"BOOKED":"NO STATUS FOUND")
			}
		}

		//Tax
		Axios.get('/misc/tax/',{
			
headers:{
	Authorization: `Bearer ${accessToken}`
   }
		})
		.then(res=>{
			// console.log(res.data)
			setTaxData(res.data)
			const data=res.data.map(item=>(
				{
					label:item.tax_type,
					value:item.id
				}
			))
			setTax(data);
		})
		.catch(err=>{
			console.log(err)
		})
		for(let i=0;i<taxData.length;i++){
			if(taxData[i].id==selectedTaxType){
				setTaxPercentage(taxData[i].tax_percent)
			}
		}
		
		//PhotoPreview
		if(photo){
			const objectUrl = URL.createObjectURL(photo)
			setPhotoPreview(objectUrl)
		}
		
		
		setLoading(false)
	},[selectedProject,selectedUnit,selectedTaxType,photo])

	useEffect(()=>{
		// console.log('TOP WORKING')
		unitData.forEach(element => {
			if(selectedUnit==element.id){
				setUnitCost(element.unit_cost)
				setEast(element.east_by)
				setWest(element.west_by)
				setNorth(element.north_by)
				setSouth(element.south_by)
				setUnitCost(element.unit_cost)
				// console.log('INSIDE WORKING')
			}
		});
	},[selectedUnit])

	useEffect(()=>{
		projectData.forEach(element => {
			setExternalElectrificationCharges(0)
				setWaterConnectionCharges(0)
				setMutationCharges(0)
				setMaintenanceChargesFor2Years(0)
				setSocietyCharges(0)
			if(selectedProject==element.id){
				setExternalElectrificationCharges(element?.ecternal_electric_charges??0)
				setWaterConnectionCharges(element?.water_connection_charges??0)
				setMutationCharges(element?.mutation_charges??0)
				setMaintenanceChargesFor2Years(element?.maintaince_charges_2_year??0)
				setSocietyCharges(element?.society_charges??0)
				// console.log('INSIDE WORKING')
			}
		});
	},[selectedProject])

   const handleSubmit=()=>{
		setLoading(true)
		const formData = new FormData();
		formData.append("profile_picture", photo);		
		formData.append('project_name', selectedProject);
		formData.append('loan_required', loan);
		formData.append('type_name', selectedType);
		formData.append('unit_no', selectedUnit);
		formData.append('tax_type', selectedTaxType);
		formData.append('gender', gender);
		formData.append('application_date', applicationDate);
		formData.append('booking_amount', booking);
		formData.append('south_by', south);
		formData.append('north_by', north);
		formData.append('west_by', west);
		formData.append('east_by', east);
		formData.append('Annual_income', annulIncome);
		formData.append('interst_rate', interestRate);
		formData.append('unit_cost', unitCost);
		formData.append('tax_percent', taxPercentage);
		// formData.append('discount', discount);
		// formData.append('totalAfterDiscount', totalAfterDiscount);
		formData.append('external_electrical_charges', externalElectrificationCharges);
		formData.append('water_connection_charges', waterConnectionCharges);
		formData.append('maintainance_charges_2_year', maintenanceChargesFor2Years);
		formData.append('socity_maintaince_charges', societyCharges);
		formData.append('mutation_charges', mutationCharges);
		formData.append('park_face_charges', parkFacingCharges);
		formData.append('corner_plot_charges', cornerPlotCharges);
		formData.append('govt_extra_charges', govtTax);
		formData.append('wide_road_facing_charges', wideRoadFacingCharges);
		formData.append('other_charges', otherCharges);
		formData.append('registry_extra_charges', registryCharges);
		// formData.append('cost_payable_to_company', finalTotal);
		formData.append('mutation_date',muatationDate);
		formData.append('mutation_True_false',muatation);
		formData.append('registry_date',registryDate);
		formData.append('registry_true_false',registry);
		formData.append('posession_date',possessionDate);
		formData.append('posession_true_false',possession);

		Axios.post('/booking-form/booking/',formData,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			// console.log(res.data)
			toast.success(res.data.message)
			navigate('/main/db/addbookingform/personaldetails',{state:res.data.data.id})
			setLoading(false)
		})
		.catch(err=>{
			console.log(err)
			setErrorRes(err.response.data)
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

   useEffect(() => {
	const total = parseInt(unitCost) + parseInt(maintenanceChargesFor2Years) + parseInt(externalElectrificationCharges) + parseInt(waterConnectionCharges) + parseInt(cornerPlotCharges) + parseInt(parkFacingCharges) + parseInt(registryCharges) + parseInt(mutationCharges) + parseInt(societyCharges) + parseInt(govtTax) + parseInt(otherCharges) + parseInt(wideRoadFacingCharges);
	console.log(total);
	if (!isNaN(total)) { // Check if total is not NaN
	  setFinalTotal(total);
	}
  }, [unitCost, maintenanceChargesFor2Years, externalElectrificationCharges, waterConnectionCharges, cornerPlotCharges, parkFacingCharges, registryCharges, mutationCharges, societyCharges, govtTax, otherCharges, wideRoadFacingCharges]);
  return (loading?<Spinner/>:
	<div>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Project Details</h2>
      </header>
	  <div className='flex justify-center items-center flex-col'>
		<div className='h-[30rem] md:w-2/5 w-full p-4 rounded-md flex items-center justify-evenly flex-col gap-2'>
					<div className='h-5/6 w-full'>
						<img className='h-full w-full object-contain' src={photoPreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
					</div>
					<div className='flex items-center justify-center space-x-5 lg:flex-row flex-col gap-2'>
						<input type="file" id='photo' className='hidden' onChange={(e)=>setPhoto(e.target.files[0])}/>
						<label htmlFor="photo" className='btn bg-indigo-500 hover:bg-indigo-600 text-white px-8 gap-2 cursor-pointer'>Select Photo</label>
						<Button title={'Remove Image'} id={'file'} onClick={()=>{setPhoto('');setPhotoPreview('')}}/>
					</div>
				</div>
			
			<div className="p-8 w-full   mx-auto flex items-start gap-5 justify-evenly flex-wrap flex-col">
			<SubHeading heading={"PROJECT INFORMATION"}/>
				<div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
   						<div className='md:w-2/5 w-full'>
						   <SingleSelectInput label={'Project'} option={project || []} placeholder={"--Select Project--"} value={selectedProject} onChange={setSelectedProject}/>
						</div>
						<div className='md:w-2/5 w-full'>
							<SingleSelectInput label={'Type'} option={type || []} placeholder={"--Select Project Type--"} value={selectedType} onChange={setSelectedType}/>						
						</div>
						<div className='md:w-2/5 w-full'>
							<SingleSelectInput label={'Unit Number'} option={unit || []} placeholder={"--Select Unit--"} value={selectedUnit} onChange={setSelectedUnit}/>
						</div>
						<div className='md:w-2/5 w-full'>
							<SingleInput label={'Unit Cost'} placeholder={'Enter Unit Cost'} value={unitCost} onChange={(e)=>setUnitCost(e.target.value)}/>
							{/* <SingleSelectInput label={'Tax Type'} option={tax || []} placeholder={"--Select Tax Type--"} value={selectedTaxType} onChange={(e)=>setSelectedTaxType(e.target.value)}/> */}
						</div>
						{/* <SingleInput label={'Status'} value={status} onChange={(e)=>setStatus(e.target.value)} isDisable={true}/> */}
				</div>
				<SubHeading heading={'EAST / WEST / NORTH / SOUTH'}/>
				<div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
					<div className='md:w-2/5 w-full'>
						<SingleInput label={'East By'} placeholder={'Enter East By'} value={east} onChange={(e)=>setEast(e.target.value)}/>
					</div>
					<div className='md:w-2/5 w-full'>
						<SingleInput label={'West By'} placeholder={'Enter West By'} value={west} onChange={(e)=>setWest(e.target.value)}/>
					</div>
					<div className='md:w-2/5 w-full'>
						<SingleInput label={'North By'} placeholder={'Enter North By'} value={north} onChange={(e)=>setNorth(e.target.value)}/>
					</div>
					<div className='md:w-2/5 w-full'>
						<SingleInput label={'South By'} placeholder={'Enter South By'} value={south} onChange={(e)=>setSouth(e.target.value)}/>
					</div>	
				</div>
				<SubHeading heading={'OTHER INFORMATION'}/>
				<div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
					{/* <div className="md:w-2/5 w-full">
					</div> */}
					{/* <div className="md:w-2/5 w-full">
						<SingleInput label={'Tax Percentage'} value={taxPercentage} onChange={(e)=>setTaxPercentage(e.target.value)}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleInput label={'Tax'} placeholder={''} type={'number'} value={tax} onChange={e => setTax(e.target.value)}/>
					</div> */}
					{/* <div className="md:w-2/5 w-full"></div> */}
					{/* <SingleInput label={'Interest Rate'} value={interestRate} onChange={(e)=>setInterestRate(e.target.value)}/> */}
					{/* <div className="md:w-2/5 w-full">
						<SingleInput label={'Annual Income'} placeholder={'Enter Annual Income'} value={annulIncome} onChange={(e)=>setAnnualIncome(e.target.value)}/>
					</div> */}
					{/* <div className="md:w-2/5 w-full">
						<SingleInput label={'Discount'} placeholder={'Enter Discount'} type={'number'} value={discount} onChange={e => setDiscount(e.target.value)}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleInput label={'Total After Discount'} placeholder={'Enter Total After Discount'} value={totalAfterDiscount} onChange={e => setTotalAfterDiscount(e.target.value)}/>
					</div> */}
					<div className="md:w-2/5 w-full">
						<SingleInput label={'Booking Amount'} placeholder={'Enter Booking'} value={booking} onChange={(e)=>setBooking(e.target.value)}/>
					</div>
					{/* <div className="md:w-2/5 w-full"></div> */}
				</div>
				<div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
					<div className="md:w-2/5 w-full">
						<SingleDateInput label={'Application Date'} placeholder={'Select Date'} type={'date'} value={applicationDate} onChange={setApplicationDate}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleSelectInput label={'Gender'} placeholder={"--Select Gender--"} option={[{label:"Male",value:"Male"},{label:"Female",value:"Female"}]} value={gender} onChange={setGender}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleSelectInput label={'Loan Required'} placeholder={"--Loan Required--"} option={[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]} value={loan} onChange={setLoan}/>
					</div>
				</div>
				<SubHeading heading={'OTHER CHARGES'}/>
				<div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
					<div className='md:w-2/5 w-full space-y-5'>
						<SingleInput label={'External Electrification Charges'} placeholder={'Enter External Electrification Charges'} type={'number'} value={externalElectrificationCharges} onChange={e => setExternalElectrificationCharges(e.target.value)}/>
						<SingleInput label={'Water Connection Charges'} placeholder={'Enter Water Connection Charges'} type={'number'} value={waterConnectionCharges} onChange={e => setWaterConnectionCharges(e.target.value)}/>
						<SingleInput label={'Maintainance Charges for 2 years'} placeholder={'Enter Maintainance Charges for 2 years'} type={'number'} value={maintenanceChargesFor2Years} onChange={e => setMaintenanceChargesFor2Years(e.target.value)}/>
						<SingleInput label={'Society Charges'} placeholder={'Enter Society Charges'} type={'number'} value={societyCharges} onChange={e => setSocietyCharges(e.target.value)}/>
					</div>
					<div className='md:w-2/5 w-full space-y-5'>
						
						<SingleInput label={'Mutation Charges'} placeholder={'Enter Mutation Charges'} type={'number'} value={mutationCharges} onChange={e => setMutationCharges(e.target.value)}/>
						<SingleInput label={'Park Facing Charges Extra'} placeholder={'Enter Park Facing Charges Extra'} type={'number'} value={parkFacingCharges} onChange={e => setParkFacingCharges(e.target.value)}/>
						<SingleInput label={'Corner Plot Charges Extra'} placeholder={'Enter Corner Plot Charges Extra'} type={'number'} value={cornerPlotCharges} onChange={e => setCornerPlotCharges(e.target.value)}/>
						<SingleInput label={'Govt. Taxes Extra (GST)'} placeholder={'Enter Govt. Taxes Extra (GST)'} type={'number'} value={govtTax} onChange={e => setGovtTax(e.target.value)}/>
						
					</div>
					<div className='md:w-2/5 w-full space-y-5'>
						<SingleInput label={'Wide Road Facing Charges'} placeholder={'Enter Wide Road Facing Charges'} type={'number'} value={wideRoadFacingCharges} onChange={e => setWideRoadFacingCharges(e.target.value)}/>
						<SingleInput label={'Other Charges'} placeholder={'Enter Other Charges'} type={'number'} value={otherCharges} onChange={e => setOtherCharges(e.target.value)}/>
						<SingleInput label={'Registry Charges Extra'} placeholder={'Enter Registry Charges Extra'} type={'number'} value={registryCharges} onChange={e => setRegistryCharges(e.target.value)}/>
						<SingleInput label={'Total Cost / Cost Payable to Company'} placeholder={'Enter Cost Payable to Company'} type={'number'} value={finalTotal} onChange={e => setFinalTotal(e.target.value)}/>
					</div>
				</div>
				{/* <div className='w-full space-y-5'>
						<SingleInput label={'Total Cost'} placeholder={'Enter Total Charges'} type={'number'} value={finalTotal} onChange={e => setFinalTotal(e.target.value)}/>
				</div> */}
				<SubHeading heading={'REGISTRY / MUATATION / POSSESSION'}/>
				<div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
					<div className="md:w-2/5 w-full">
						<SingleInput label={'Registry Date'} type={'date'} value={registryDate} onChange={(e)=>setRegistryDate(e.target.value)}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleSelectInput label={'Registry YES/NO'} placeholder={"--Select--"} option={[{label:"Yes",value:true},{label:"No",value:false}]} value={registry} onChange={setRegistry}/>
					</div>
				</div>
				<div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
					<div className="md:w-2/5 w-full">
						<SingleInput label={'Muatation Date'} type={'date'} value={muatationDate} onChange={(e)=>setmuatationDate(e.target.value)}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleSelectInput label={'Muatation YES/NO'} placeholder={"--Select--"} option={[{label:"Yes",value:true},{label:"No",value:false}]} value={muatation} onChange={setmuatation}/>
					</div>
				</div>
				<div className='w-full flex justify-between items-center md:flex-row flex-col gap-5'>
					<div className="md:w-2/5 w-full">
						<SingleInput label={'Possession Date'} type={'date'} value={possessionDate} onChange={(e)=>setpossessionDate(e.target.value)}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleSelectInput label={'Possession YES/NO'} placeholder={"--Select--"} option={[{label:"Yes",value:true},{label:"No",value:false}]} value={possession} onChange={setpossession}/>
					</div>
				</div>
		</div>
	  </div>
		<div className='flex items-center justify-center m-5'>
			<Button title={'Submit & Next'} onClick={handleSubmit}/>
		</div>
	  </div>
	</div>
  )
}
