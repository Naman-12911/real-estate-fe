import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import InfoTable_Big from '../../../components/InfoTable_Big'
import InfoTable from '../../../components/InfoTable'
import SingleInput from '../../../components/SingleInput'
import TextArea from '../../../components/TextArea'
import Button from '../../../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from '../../../Axios'

export default function EditBookingCostForm() {
	const navigate=useNavigate();
	const location=useLocation();
	const data=location.state;
	// console.log(data);
	const [personalDetails,setPersonalDetails]=useState("");

	const [unitCost, setUnitCost] = useState(data.unit_cost);
	const [discount, setDiscount] = useState(data.discount);
	const [totalAfterDiscount, setTotalAfterDiscount] = useState(data.unit_cost-data.discount);
	const [tax, setTax] = useState('');
	const [externalElectrificationCharges, setExternalElectrificationCharges] = useState(data.external_electrical_charges);
	const [waterConnectionCharges, setWaterConnectionCharges] = useState(data.water_connection_charges);
	const [maintenanceChargesFor2Years, setMaintenanceChargesFor2Years] = useState(data.maintainance_charges_2_year);
	const [societyCharges, setSocietyCharges] = useState(data.socity_maintaince_charges);
	const [mutationCharges, setMutationCharges] = useState(data.mutation_charges);
	const [parkFacingCharges, setParkFacingCharges] = useState(data.park_face_charges);
	const [cornerPlotCharges, setCornerPlotCharges] = useState(data.corner_plot_charges);
	const [govtTax, setGovtTax] = useState(data.govt_extra_charges);
	const [wideRoadFacingCharges, setWideRoadFacingCharges] = useState(data.wide_road_facing_charges);
	const [otherCharges, setOtherCharges] = useState(data.other_charges);
	const [registryCharges, setRegistryCharges] = useState(data.registry_extra_charges);
	const [costPayable, setCostPayable] = useState(data.cost_payable_to_company);
	
	  useEffect(()=>{
		Axios.get(`/booking-form/personal-deatils/${data.personal_details_id}/`)
		.then(res=>{
			// console.log(res.data)
			setPersonalDetails(res.data);
		})
		.catch(err=>{
			console.log(err)
		})
	  },[])
	  
	  const UserInfo=[
		{ key: 'Name', value: personalDetails.applicant_name},
		{ key: 'Mobile No', value:personalDetails.mobile_number },
		{ key: 'Project', value:data.project_names},
		{ key: 'Unit No.', value:data.unit_nos },
		{ key: 'Type', value:data.type_names},
		{ key: 'Tax Name', value: data.tax_types},
		{ key: 'Plot Area (Sqft)', value:""},
	  ]
	  const handleSubmit=()=>{
		const data={

		}
	  }
  return (
	<div>
	  <Heading title={"Tentative Cost"}/>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Calculation Sheet</h2>
      </header>
	  <InfoTable data={UserInfo}/>
	  </div>
	  <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
	  <div className='px-5 py-4 flex items-center justify-between flex-wrap gap-5'>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Unit Cost'} placeholder={''} type={'number'} value={unitCost} onChange={e => setUnitCost(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Discount'} placeholder={''} type={'number'} value={discount} onChange={e => setDiscount(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Total After Discount'} placeholder={''} value={totalAfterDiscount} onChange={e => setTotalAfterDiscount(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Tax'} placeholder={''} type={'number'} value={tax} onChange={e => setTax(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'External Electrification Charges'} placeholder={''} type={'number'} value={externalElectrificationCharges} onChange={e => setExternalElectrificationCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Water Connection Charges'} placeholder={''} type={'number'} value={waterConnectionCharges} onChange={e => setWaterConnectionCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Maintainance Charges for 2 years'} placeholder={''} type={'number'} value={maintenanceChargesFor2Years} onChange={e => setMaintenanceChargesFor2Years(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Society Charges'} placeholder={''} type={'number'} value={societyCharges} onChange={e => setSocietyCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Mutation Charges'} placeholder={''} type={'number'} value={mutationCharges} onChange={e => setMutationCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Park Facing Charges Extra'} placeholder={''} type={'number'} value={parkFacingCharges} onChange={e => setParkFacingCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Corner Plot Charges Extra'} placeholder={''} type={'number'} value={cornerPlotCharges} onChange={e => setCornerPlotCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Govt. Taxes Extra (GST) or any other Tax (if applicable)'} placeholder={''} type={'number'} value={govtTax} onChange={e => setGovtTax(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Wide Road Facing Charges'} placeholder={''} type={'number'} value={wideRoadFacingCharges} onChange={e => setWideRoadFacingCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Other Charges'} placeholder={''} type={'number'} value={otherCharges} onChange={e => setOtherCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Registry Charges Extra'} placeholder={''} type={'number'} value={registryCharges} onChange={e => setRegistryCharges(e.target.value)}/>
		</div>
		<div className='md:w-2/5 w-full'>
			<SingleInput label={'Cost Payable to Company'} placeholder={''} type={'number'} value={costPayable} onChange={e => setCostPayable(e.target.value)}/>
		</div>
		<div className='w-full space-y-5'>
			<span className=' font-semibold text-xl'>Other Charges To be born by the Customer</span>
			{/* <TextArea label={'Discussion'} /> */}
		</div>
	  </div>
	  <div className='flex items-center justify-center m-5 space-x-5'>
			<Button title={'Update'} onClick={handleSubmit}/>
			<Button title={'Cancel'} onClick={()=>navigate('/main/db/viewbookingform')}/>
		</div>
	  </div>
	</div>
  )
}
