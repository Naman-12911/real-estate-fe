import React, { useEffect, useState } from 'react'
import SingleInput from '../../../components/SingleInput'
import SingleSelectInput from '../../../components/SingleSelectInput'
import Button from '../../../components/Button'
import Axios from '../../../Axios'
import Spinner from '../../../components/Spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import SubHeading from '../../../components/SubHeading'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'


export default function EditBookingFormProjectDetails() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	
	const {state}=useLocation();
	// console.log(state);

	const [selectedProject,setSelectedProject]=useState(state.booking.project_name)
	const [selectedType,setSelectedType]=useState(state.booking.type_name)
	const [selectedUnit,setSelectedUnit]=useState(state.booking.unit_no)
	const [status,setStatus]=useState('')
	const [selectedTaxType,setSelectedTaxType]=useState(state.booking.tax_type)
	const [taxPercentage,setTaxPercentage]=useState(state.booking.tax_percent)
	const [unitCost,setUnitCost]=useState(state.booking.unit_cost)
	const [interestRate,setInterestRate]=useState(state.booking.interst_rate)
	const [annulIncome,setAnnualIncome]=useState(state.booking.Annual_income)
	const [east,setEast]=useState(state.booking.east_by)
	const [west,setWest]=useState(state.booking.west_by)
	const [north,setNorth]=useState(state.booking.north_by)
	const [south,setSouth]=useState(state.booking.south_by)
	const [booking,setBooking]=useState(state.booking.booking_amount)
	const [applicationDate,setApplicationDate]=useState(state.booking.application_date)
	const [gender,setGender]=useState(state.booking.gender)
	const [loan,setLoan]=useState(state.booking.loan_required)
	const [photo,setPhoto]=useState(state.booking.profile_picture||"")
	const [externalElectrificationCharges, setExternalElectrificationCharges] = useState(state.booking.external_electrical_charges);
	const [waterConnectionCharges, setWaterConnectionCharges] = useState(state.booking.water_connection_charges);
	const [maintenanceChargesFor2Years, setMaintenanceChargesFor2Years] = useState(state.booking.maintainance_charges_2_year);
	const [societyCharges, setSocietyCharges] = useState(state.booking.socity_maintaince_charges);
	const [mutationCharges, setMutationCharges] = useState(state.booking.mutation_charges);
	const [parkFacingCharges, setParkFacingCharges] = useState(state.booking.park_face_charges);
	const [cornerPlotCharges, setCornerPlotCharges] = useState(state.booking.corner_plot_charges);
	const [govtTax, setGovtTax] = useState(state.booking.govt_extra_charges);
	const [wideRoadFacingCharges, setWideRoadFacingCharges] = useState(state.booking.wide_road_facing_charges);
	const [otherCharges, setOtherCharges] = useState(state.booking.other_charges);
	const [registryCharges, setRegistryCharges] = useState(state.booking.registry_extra_charges);
	// const [costPayable, setCostPayable] = useState(state.booking.cost_payable_to_company);
	const [registryDate,setRegistryDate]=useState(state.booking.registry_date||'');
	const [registry,setRegistry]=useState(state.booking.registry_true_false);
	const [muatationDate,setmuatationDate]=useState(state.booking.mutation_date||'');
	const [muatation,setmuatation]=useState(state.booking.mutation_True_false);
	const [possessionDate,setpossessionDate]=useState(state.booking.posession_date||'');
	const [possession,setpossession]=useState(state.booking.posession_true_false);
	const [finalTotal,setFinalTotal]=useState('');

	const [project,setProject]=useState('')
	const [photoPreview,setPhotoPreview]=useState('')
	const [type,setType]=useState('')
	const [unit,setUnit]=useState('')
	// console.log(unit);
	const [tax,setTax]=useState('')
	const [taxData,setTaxData]=useState([])
	const [unitData,setUnitData]=useState([])
	const [projectData,setProjectData]=useState([])

	const [loading,setLoading]=useState(true);
	// const [error,setError]=useState(false);
	const [errorRes,setErrorRes]=useState(false);

	useEffect(()=>{
		// setSelectedProject(state.booking.project_name)
		//Projects
		Axios.get('/misc/project/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			setProjectData(res.data)
			// console.log(res.data)
			const data=res.data.map(item=>(
				{
					label:item.project_name,
					value:item.id,
					// selected:state.booking.project_name==item.id?true:false
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
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>(
				{
					label:item.property_type,
					value:item.id,
					// selected:state.booking.type_name==item.id?true:false
				}
			))
			setType(data);
		})
		.catch(err=>{
			console.log(err)
		})

		//Units
		Axios.get(`/misc/unit-number-filter/?project_id=${selectedProject}`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			// setStatus(res.data.available?"AVAILABLE":res.data.hold?"HOLD":res.data.booked?"BOOKED":"CHECKING")
			setUnitData(res.data)
			const data=res.data.map(item=>(
				{
					label:item.unit_no,
					value:item.id,
					// selected:state.booking.unit_no==item.id?true:false
				}
			))
			setUnit(data);
			//Status
			for(let i=0;i<res.data.length;i++){
				if(res.data[i].id==selectedUnit){
					setStatus(res.data[i].available?"AVAILABLE":res.data[i].hold?"HOLD":res.data[i].booked?"BOOKED":"NO STATUS FOUND")
				}
			}
			})
		.catch(err=>{
			console.log(err)
		})

		//Tax
		Axios.get('/misc/tax/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			setTaxData(res.data)
			const data=res.data.map(item=>(
				{
					label:item.tax_type,
					value:item.id,
					// selected:state.booking.tax_type==item.id?true:false
					
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

   const handleSubmit=()=>{
		setLoading(true)
		const formData = new FormData();
		formData.append("profile_picture", photo);		
		formData.append('project_name', selectedProject);
		formData.append('loan_required', loan);
		formData.append('type_name', selectedType);
		formData.append('unit_no', selectedUnit);
		// formData.append('tax_type', selectedTaxType);
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
		// formData.append('cost_payable_to_company', costPayable);
		formData.append('mutation_date',muatationDate);
		formData.append('mutation_True_false',muatation);
		formData.append('registry_date',registryDate);
		formData.append('registry_true_false',registry);
		formData.append('posession_date',possessionDate);
		formData.append('posession_true_false',possession);
		Axios.patch(`/booking-form/booking/${state.booking.id}/`,formData,{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
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
			// setErrorRes(err.response.data)
		})
		setLoading(false)
   }

   useEffect(()=>{
     
	Axios.get(`/admin-pannel/unit-number/${selectedUnit}/`,{
		headers:{
			Authorization:`Bearer ${accessToken}`
	}
	})
	.then(res=>{
		setEast(res.data.east_by)
  setWest(res.data.west_by)
  setNorth(res.data.north_by)
  setSouth(res.data.south_by)
	})
	.catch(err=>{
		console.log(err)
	})
},[selectedUnit])


useEffect(()=>{
	projectData.forEach(element => {
		setExternalElectrificationCharges(0)
			setWaterConnectionCharges(0)
			setMutationCharges(0)
			setMaintenanceChargesFor2Years(0)
			setSocietyCharges(0)
		if(selectedProject==element.id){
			setExternalElectrificationCharges(element.ecternal_electric_charges)
			setWaterConnectionCharges(element.water_connection_charges)
			setMutationCharges(element.mutation_charges)
			setMaintenanceChargesFor2Years(element.maintaince_charges_2_year)
			setSocietyCharges(element.society_charges)
			// console.log('INSIDE WORKING')
		}
	});
},[selectedProject])

   useEffect(() => {
	const total = parseInt(unitCost) + parseInt(maintenanceChargesFor2Years) + parseInt(externalElectrificationCharges) + parseInt(waterConnectionCharges) + parseInt(cornerPlotCharges) + parseInt(parkFacingCharges) + parseInt(registryCharges) + parseInt(mutationCharges) + parseInt(societyCharges) + parseInt(govtTax) + parseInt(otherCharges) + parseInt(wideRoadFacingCharges);
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
		<div className='h-[30rem] md:w-2/5 w-full p-4 rounded-md flex items-center justify-evenly flex-col'>
					<div className='h-5/6 w-full'>
						<img className='h-full w-full object-contain' src={photoPreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
					</div>
					<div className='flex items-center justify-center space-x-5'>
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
						<SingleInput label={'Application Date'} type={'date'} value={applicationDate} onChange={(e)=>setApplicationDate(e.target.value)}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleSelectInput label={'Gender'} placeholder={"--Select Gender--"} option={[{label:"Male",value:"Male"},{label:"Female",value:"Female"},{label:"Transgender",value:"Transgender"}]} value={gender} onChange={setGender}/>
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
						<SingleInput label={'Total Charges'} placeholder={'Enter Total Charges'} type={'number'} value={finalTotal} onChange={e => setFinalTotal(e.target.value)}/>
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
						<SingleInput label={'Possession Date'} type={'date'} value={possessionDate} onChange={setpossessionDate}/>
					</div>
					<div className="md:w-2/5 w-full">
						<SingleSelectInput label={'Possession YES/NO'} placeholder={"--Select--"} option={[{label:"Yes",value:true},{label:"No",value:false}]} value={possession} onChange={setpossession}/>
					</div>
				</div>
		</div>
	  </div>
		<div className='flex items-center justify-center m-5'>
			<Button title={'Update'} onClick={handleSubmit}/>
		</div>
	  </div>
	</div>
  )
}