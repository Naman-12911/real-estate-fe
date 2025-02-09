import React, { useEffect, useRef, useState } from 'react'
// import Heading from '../../../components/Heading'
import Button from '../../../components/Button'
// import logo from '../../../images/logo.png'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import grand from '../../../images/grand.png'
import park from '../../../images/park.png'
import moment from 'moment';

export default function PrintBookingForm() {
	const accessToken=useSelector((state)=>state.user.user);
	const navigate=useNavigate();
	const ref=useRef();
	const {state}=useLocation();
	
	const [projectDeatils,setProjectDetails]=useState('');
	const [loading,setLoading]=useState(true);

	// console.log(state);
	const data = {
		paymentDetails: "I/We further agree to pay the installments of basic cost and allied charges as stipulated/demanded by the company and/or as contained in the payment plan opted by me.",
		declaration: "I/We the above applicant(s) do hereby declare that the above particulars given by me/us are true and correct and nothing has been concealed there from. I/We agree that any allotment based on this application shall be subject to the basic terms and conditions of the company. I/We shall abide by the terms and conditions, and the payment plans attached to this application, and which shall ipso-facto be applicable to my/our legal heirs and successors. I/We declare that in case of non-allotment of the flat, my/our claim shall be limited only to the refund of the deposited amount without any interest.",
	  };
	  const generatePrint = useReactToPrint({
		content: () => ref.current,
		
	  });
	  
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
	useEffect(()=>{
		Axios.get(`/misc/project/${state.booking.project_name}/`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
		//   console.log(res.data)
		  setProjectDetails(res.data);
		})
		.catch(err=>{
		  console.log(err.response.data)
		})
		setLoading(false);
	},[])

	const handleDocDownload=()=>{
        Axios.get(`/docx/booking-form/?unit_no=${state.booking.unit_nos}`,{
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
          a.download = `Booking Form ${state.booking.unit_nos}.docx`; // Specify the filename you want
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
	<div className="p-6 bg-white text-black" id='pdf-content' ref={ref}>
	<div className="mb-8">
        <img src={projectDeatils.project_name==='CI Grand'?grand:park} alt="Company Logo" className="h-20 w-auto float-left mr-4 mb-4" />
      </div>
      <div className="text-center mt-24">
        <h1 className="text-2xl font-bold mb-4">BOOKING FORM</h1>
        <p className="text-lg font-bold mb-4">APPLICATION FOR ALLOTMENT OF RES PLOT NO. {state.booking.unit_nos} IN THE RESIDENTIAL PROJECT NAMED “{projectDeatils.project_name}” {projectDeatils.address}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">First Applicant</h2>
        <table className="table-auto w-full border border-black">
          <tbody>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black">Name:</th>
              <td className="px-4 py-2 border border-black">{state.applicant_name}</td>
              <th className="px-4 py-2 font-semibold border border-black">Father's Name:</th>
              <td className="px-4 py-2 border border-black">{state.sowodo}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black">Date of Birth:</th>
              <td className="px-4 py-2 border border-black">{moment(new Date(state.date_of_birth)).format('DD-MM-YYYY')}</td>
              <th className="px-4 py-2 font-semibold border border-black">Profession:</th>
              <td className="px-4 py-2 border border-black">{state.profession}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black">PAN No.:</th>
              <td className="px-4 py-2 border border-black">{state.pan_number}</td>
              <th className="px-4 py-2 font-semibold border border-black">Aadhar No.:</th>
              <td className="px-4 py-2 border border-black">{state.adhar_no}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black">Marital Status:</th>
              <td className="px-4 py-2 border border-black">{state.matial_status}</td>
              <th className="px-4 py-2 font-semibold border border-black">Nationality:</th>
              <td className="px-4 py-2 border border-black">{state.nationality}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black">Residential Address:</th>
              <td className="px-4 py-2 border border-black">{state.residence_address}</td>
			  <th className="px-4 py-2 font-semibold border border-black">Fax No.:</th>
              <td className="px-4 py-2 border border-black">{state.fax_number}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold border border-black">Email:</th>
              <td className="px-4 py-2 border border-black">{state.email_address}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Payment Details</h2>
        <p className="mb-4">{data.paymentDetails}</p>
        <p>{data.declaration}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">Place:</p>
        <p className="font-semibold">Date: {state.booking.created_at.slice(0,state.booking.created_at.indexOf("T"))}</p>
      </div>
    </div>
	</div>
	</div>
  </div>
  )
}
