import React, { useEffect, useRef, useState } from 'react'
import Heading from '../../../components/Heading'
import Button from '../../../components/Button'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useReactToPrint } from 'react-to-print';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import grand from '../../../images/grand.png'
// import park from '../../../images/park.png'
import { AgeFromDateString } from 'age-calculator';

export default function PrintViewBookingForm() {
  const accessToken=useSelector((state)=>state.user.user);
  const navigate=useNavigate();
  const {state}=useLocation();
  // console.log(state);
  const [data,setData]=useState('');
	const ref=useRef();

	const generatePdf = () => {
		const element = document.getElementById('pdf-content');
		element.style.width = '210mm'; // A4 width
		element.style.height = '297mm'; // A4 height
		element.style.padding = '20mm'; // Padding to ensure content does not touch page edges
	
		html2canvas(element, {
			// width: 595.28,
			// height: 841.89,
			scale: 2,
			logging: false,
			useCORS: true
		}).then(canvas => {
			const pdf = new jsPDF('p', 'mm','a4');
			pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, 210, 297);
			// const imgData = canvas.toDataURL('image/png',1.0);
	
			// pdf.addImage(imgData, 'PNG', 0, 0, width, height);
			pdf.save('final_cost_calculation_sheet.pdf');
		});
		
		setTimeout(() => {
			element.style.width = '';
			element.style.height = '';
			element.style.padding = '';
		  }, 1000);
	};
	// const styles = StyleSheet.create({
	// 	page: {
	// 	  fontFamily: 'Helvetica',
	// 	  padding: 20,
	// 	},
	// 	section: {
	// 	  marginBottom: 10,
	// 	},
	//   });

		const generatePrint = useReactToPrint({
		  content: () => ref.current,
		});

    useEffect(()=>{
      Axios.get(`/misc/unit-number/${state.booking.unit_no}/`,{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      .then(res=>{
        // console.log(res.data)
        setData(res.data) 
      })
      .catch(err=>{
        console.log(err)
      })
    },[])

    const handleDocDownload=()=>{
      Axios.get(`/docx/final-cost-sheet/?unit_no=${state.booking.unit_nos}`,{
        headers:{
          Authorization:`Bearer ${accessToken}`
      },
      responseType: 'blob',
      })
      .then(response => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `Final Cost Sheet ${state.booking.unit_nos}.docx`; // Specify the filename you want
        document.body.appendChild(a); // Append the anchor to the body
        a.click(); // Trigger the download
        a.remove(); // Remove the anchor from the body
  
        // Optional: Revoke the object URL after a certain period to free up memory
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      })
      .catch(err=>{
        console.log(err)
      })
    }

  return (
	<div>
	{/* <Heading title={"Booking Form"}/> */}
	<div className='py-3 w-full   mx-auto space-y-7'>
			<div className=' flex items-end md:items-center justify-end md:gap-5 gap-2 flex-col md:flex-row '>
					<Button title={"Print"} onClick={generatePrint} icon={<svg className="w-4 h-4 fill-current opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M111.998 48H366.061L400 81.943V160H448V81.943C448 69.213 442.943 57.006 433.943 48.004L400.004 14.061C391.002 5.057 378.793 0 366.061 0H111.998C85.494 0 64.012 21.479 64 47.982V75.422L64.004 130.264C64.002 130.264 64.002 130.264 64 130.264V160H112.006L111.998 48ZM440 192H72C32.297 192 0 224.297 0 264V376C0 389.25 10.75 400 24 400H80V480C80 497.672 94.326 512 112 512H400C417.674 512 432 497.672 432 480V400H488C501.25 400 512 389.25 512 376V264C512 224.297 479.703 192 440 192ZM384 464H128V368H384V464ZM464 352H432C432 334.326 417.674 320 400 320H112C94.326 320 80 334.326 80 352H48V264C48 250.766 58.766 240 72 240H440C453.234 240 464 250.766 464 264V352Z"/>
						</svg>}/>
            <Button title={"Download Doc"} onClick={handleDocDownload} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 512 512"><path d="M448 304H394.5L346.5 352H448C456.822 352 464 359.178 464 368V448C464 456.822 456.822 464 448 464H64C55.178 464 48 456.822 48 448V368C48 359.178 55.178 352 64 352H165.5L117.5 304H64C28.654 304 0 332.654 0 368V448C0 483.346 28.654 512 64 512H448C483.348 512 512 483.346 512 448V368C512 332.654 483.348 304 448 304ZM432 408C432 394.744 421.254 384 408 384S384 394.744 384 408C384 421.254 394.746 432 408 432S432 421.254 432 408ZM239.031 368.969C243.719 373.656 249.844 376 256 376S268.281 373.656 272.969 368.969L408.969 232.969C418.344 223.594 418.344 208.406 408.969 199.031S384.406 189.656 375.031 199.031L280 294.062V24C280 10.75 269.25 0 256 0S232 10.75 232 24V294.062L136.969 199.031C127.594 189.656 112.406 189.656 103.031 199.031S93.656 223.594 103.031 232.969L239.031 368.969Z"/>
</svg>}/>

										<Button title={"Download"} onClick={generatePdf} icon={<svg className="w-4 h-4 fill-current opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M448 304H394.5L346.5 352H448C456.822 352 464 359.178 464 368V448C464 456.822 456.822 464 448 464H64C55.178 464 48 456.822 48 448V368C48 359.178 55.178 352 64 352H165.5L117.5 304H64C28.654 304 0 332.654 0 368V448C0 483.346 28.654 512 64 512H448C483.348 512 512 483.346 512 448V368C512 332.654 483.348 304 448 304ZM432 408C432 394.744 421.254 384 408 384S384 394.744 384 408C384 421.254 394.746 432 408 432S432 421.254 432 408ZM239.031 368.969C243.719 373.656 249.844 376 256 376S268.281 373.656 272.969 368.969L408.969 232.969C418.344 223.594 418.344 208.406 408.969 199.031S384.406 189.656 375.031 199.031L280 294.062V24C280 10.75 269.25 0 256 0S232 10.75 232 24V294.062L136.969 199.031C127.594 189.656 112.406 189.656 103.031 199.031S93.656 223.594 103.031 232.969L239.031 368.969Z"/>
						</svg>}/>
            <Button title={'Back'} onClick={()=>navigate(-1)}/>
			</div>
	<div className='w-full flex items-center justify-center'>
	{state&&<div className="p-6 bg-white text-black" id='pdf-content' ref={ref}>
      <div className="flex items-center justify-between text-center mb-8">
        <img src={grand} alt="Company Logo" className="h-20 w-32" />
        <h1 className="text-2xl font-bold">Final Cost Calculation Sheet</h1>
        <div className="h-20 w-32"></div>
      </div>
      <hr className="mb-8 border-black" />
      <div className="mb-8">
        <h2 className="text-xs font-semibold mb-2">Personal Details</h2>
        <table className="table-auto w-full border border-black">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Booking:</td>
              <td className="px-4 py-2 border border-black">{state.booking.id}</td>
              <td className="px-4 py-2 font-semibold border border-black">Applicant Name:</td>
              <td className="px-4 py-2 border border-black">{state.applicant_name}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Plot Area Sqft:</td>
              <td className="px-4 py-2 border border-black">{data.square_fit}</td>
              <td className="px-4 py-2 font-semibold border border-black">Present Address:</td>
              <td className="px-4 py-2 border border-black">{state.persent_address}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Permanent Address:</td>
              <td className="px-4 py-2 border border-black">{state.permanent_address}</td>
              <td className="px-4 py-2 font-semibold border border-black">Pincode:</td>
              <td className="px-4 py-2 border border-black">{state.pin_code}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Date of Birth:</td>
              <td className="px-4 py-2 border border-black">{state.date_of_birth}</td>
              <td className="px-4 py-2 font-semibold border border-black">Age:</td>
              <td className="px-4 py-2 border border-black">{state.age|| new AgeFromDateString(state.date_of_birth).age}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Mobile Number:</td>
              <td className="px-4 py-2 border border-black">{state.mobile_number}</td>
              <td className="px-4 py-2 font-semibold border border-black">Residence Address:</td>
              <td className="px-4 py-2 border border-black">{state.residence_address}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Email Address:</td>
              <td className="px-4 py-2 border border-black">{state.email_address}</td>
              <td className="px-4 py-2 font-semibold border border-black">Adhar Number:</td>
              <td className="px-4 py-2 border border-black">{state.adhar_no}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Nationality:</td>
              <td className="px-4 py-2 border border-black">{state.nationality}</td>
              <td className="px-4 py-2 font-semibold border border-black">Pan Number:</td>
              <td className="px-4 py-2 border border-black">{state.pan_number}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Profession:</td>
              <td className="px-4 py-2 border border-black">{state.profession}</td>
              <td className="px-4 py-2 font-semibold border border-black">Fax Number:</td>
              <td className="px-4 py-2 border border-black">{state.fax_number}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Martial Status:</td>
              <td className="px-4 py-2 border border-black">{state.matial_status}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="mb-8 border-black" />
      <div className="mb-8">
        <h2 className="text-xs font-semibold mb-2">Unit Cost</h2>
        <table className="table-auto w-full border border-black">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Unit Cost:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.unit_cost)}</td>
              <td className="px-4 py-2 font-semibold border border-black">Discount:</td>
              <td className="px-4 py-2 border border-black">{Intl.NumberFormat('en-IN').format(state.booking.discount)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Total After Discount:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.unit_cost-state.booking.discount)}</td>
              <td className="px-4 py-2 font-semibold border border-black">Tax:</td>
              <td className="px-4 py-2 border border-black">{state.booking.tax_percent}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">External Electrification Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.external_electrical_charges)}</td>
              <td className="px-4 py-2 font-semibold border border-black">Water Connection Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.water_connection_charges)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Maintenance Charges for 2 Years:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.maintainance_charges_2_year)}</td>
              <td className="px-4 py-2 font-semibold border border-black">Society Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.socity_maintaince_charges)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Mutation Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.mutation_charges)}</td>
              <td className="px-4 py-2 font-semibold border border-black">Park Facing Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.park_face_charges)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Corner Plot Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.corner_plot_charges)}</td>
              <td className="px-4 py-2 font-semibold border border-black">Govt Tax:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.govt_extra_charges)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Wide Road Facing Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.wide_road_facing_charges)}</td>
              <td className="px-4 py-2 font-semibold border border-black">Other Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.other_charges)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border border-black">Registry Charges:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.registry_extra_charges)}</td>
              <td className="px-4 py-2 font-semibold border border-black">Cost Payable:</td>
              <td className="px-4 py-2 border border-black">₹{Intl.NumberFormat('en-IN').format(state.booking.cost_payable_to_company)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="mb-8 border-black" />
      {/* <div>
        <h2 className="text-xs font-semibold mb-2">Discussion</h2>
        <p>{state.discussion}</p>
      </div> */}
    </div>}	
	{/* <div className="p-6 bg-gray-100 text-black w-[595px] h-[842px]" id='pdf-content'>
      <div className="text-center mb-2">
        <h1 className="text-xl font-bold">Final Cost Calculation Sheet</h1>
      </div>
      <hr className="mb-2 border-black" />
      <div className="mb-2">
        <h2 className="text-md font-semibold mb-2">Personal Details</h2>
        <table className="table-auto w-full border border-black">
          <tbody>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Booking:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.booking}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Applicant Name:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.applicantName}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Sowodo:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.sowodo}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Present Address:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.presentAddress}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Permanent Address:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.permanentAddress}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Pincode:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.pincode}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Date of Birth:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.dateOfBirth}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Age:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.age}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Mobile Number:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.mobileNumber}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Residence Address:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.residenceAddress}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Email Address:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.emailAddress}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Adhar Number:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.adharNumber}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Nationality:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.nationality}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Pan Number:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.panNumber}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Profession:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.profession}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Fax Number:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.faxNumber}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Martial Status:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.martialStatus}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="mb-2 border-black" />
      <div className="mb-2">
        <h2 className="text-md font-semibold mb-2">Unit Cost</h2>
        <table className="table-auto w-full border border-black">
          <tbody>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Unit Cost:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.unitCost}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Discount:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.discount}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Total After Discount:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.totalAfterDiscount}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Tax:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.tax}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">External Electrification Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.externalElectrificationCharges}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Water Connection Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.waterConnectionCharges}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Maintenance Charges for 2 Years:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.maintenanceChargesFor2Years}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Society Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.societyCharges}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Mutation Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.mutationCharges}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Park Facing Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.parkFacingCharges}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Corner Plot Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.cornerPlotCharges}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Govt Tax:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.govtTax}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Wide Road Facing Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.wideRoadFacingCharges}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Other Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.otherCharges}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Registry Charges:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.registryCharges}</td>
              <th className="px-4 py-2 font-semibold border border-black text-xs">Cost Payable:</th>
              <td className="px-4 py-2 border border-black text-xs">{data.costPayable}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="mb-2 border-black" />
      <div>
        <h2 className="text-md font-semibold mb-2">Discussion</h2>
        <p className="text-xs">{data.discussion}</p>
      </div>
    </div> */}
	{/* <PDFViewer width={"100%"} height={"100vh"} style={{height:"100vh"}}>
			<Document>
					<Page size="A4" style={styles.page}>
					<Text style={{ fontSize: 12 }}>{content}</Text>
					</Page>
		</Document>
	</PDFViewer> */}
	</div>
	</div>
  </div>
  )
}
