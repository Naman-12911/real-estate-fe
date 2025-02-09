import React, { useRef } from 'react'
import Heading from '../../../components/Heading'
import Button from '../../../components/Button'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../images/logo.png'
// import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';
import { useReactToPrint } from 'react-to-print';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import downloadWordExcel from '../../../components/advanceComponent/downloadWordExcel';


export default function Axis() {
	const accessToken=useSelector((state)=>state.user.user);
	const ref=useRef();
	const navigate=useNavigate();

	const {state}=useLocation();

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
	const generatePrint = useReactToPrint({
		content: () => ref.current,
	  });

	  const handleDocDownload=()=>{
		downloadWordExcel(
			`docx/bank-noc-axis-bank-noc-draft/?unit_no=${state.booking.unit_nos}`,
			`Axis Bank ${state.booking.unit_nos}.docx`,
			accessToken,
			'Processing Document File...',
			'Document File Saved to your Device Successfully',
			'Document File Downloaded Successfully',
			'There was a problem with Document file, please try again'
			)
      }
  return (
	<div>
	<Heading title={"Documentation"}/>
	<div className='py-3 w-full   mx-auto space-y-7'>
			<div className=' flex items-end md:items-center justify-end md:gap-5 gap-2 flex-col md:flex-row '>
					<Button title={"Print"} onClick={generatePrint} icon={<svg className="w-4 h-4 fill-current opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M111.998 48H366.061L400 81.943V160H448V81.943C448 69.213 442.943 57.006 433.943 48.004L400.004 14.061C391.002 5.057 378.793 0 366.061 0H111.998C85.494 0 64.012 21.479 64 47.982V75.422L64.004 130.264C64.002 130.264 64.002 130.264 64 130.264V160H112.006L111.998 48ZM440 192H72C32.297 192 0 224.297 0 264V376C0 389.25 10.75 400 24 400H80V480C80 497.672 94.326 512 112 512H400C417.674 512 432 497.672 432 480V400H488C501.25 400 512 389.25 512 376V264C512 224.297 479.703 192 440 192ZM384 464H128V368H384V464ZM464 352H432C432 334.326 417.674 320 400 320H112C94.326 320 80 334.326 80 352H48V264C48 250.766 58.766 240 72 240H440C453.234 240 464 250.766 464 264V352Z"/>
						</svg>}/>
						<Button title={"Download Doc"} onClick={handleDocDownload} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 512 512"><path d="M448 304H394.5L346.5 352H448C456.822 352 464 359.178 464 368V448C464 456.822 456.822 464 448 464H64C55.178 464 48 456.822 48 448V368C48 359.178 55.178 352 64 352H165.5L117.5 304H64C28.654 304 0 332.654 0 368V448C0 483.346 28.654 512 64 512H448C483.348 512 512 483.346 512 448V368C512 332.654 483.348 304 448 304ZM432 408C432 394.744 421.254 384 408 384S384 394.744 384 408C384 421.254 394.746 432 408 432S432 421.254 432 408ZM239.031 368.969C243.719 373.656 249.844 376 256 376S268.281 373.656 272.969 368.969L408.969 232.969C418.344 223.594 418.344 208.406 408.969 199.031S384.406 189.656 375.031 199.031L280 294.062V24C280 10.75 269.25 0 256 0S232 10.75 232 24V294.062L136.969 199.031C127.594 189.656 112.406 189.656 103.031 199.031S93.656 223.594 103.031 232.969L239.031 368.969Z"/>
</svg>}/>
						{/* <Button title={"Download"} onClick={generatePdf} icon={<svg className="w-4 h-4 fill-current opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M448 304H394.5L346.5 352H448C456.822 352 464 359.178 464 368V448C464 456.822 456.822 464 448 464H64C55.178 464 48 456.822 48 448V368C48 359.178 55.178 352 64 352H165.5L117.5 304H64C28.654 304 0 332.654 0 368V448C0 483.346 28.654 512 64 512H448C483.348 512 512 483.346 512 448V368C512 332.654 483.348 304 448 304ZM432 408C432 394.744 421.254 384 408 384S384 394.744 384 408C384 421.254 394.746 432 408 432S432 421.254 432 408ZM239.031 368.969C243.719 373.656 249.844 376 256 376S268.281 373.656 272.969 368.969L408.969 232.969C418.344 223.594 418.344 208.406 408.969 199.031S384.406 189.656 375.031 199.031L280 294.062V24C280 10.75 269.25 0 256 0S232 10.75 232 24V294.062L136.969 199.031C127.594 189.656 112.406 189.656 103.031 199.031S93.656 223.594 103.031 232.969L239.031 368.969Z"/>
						</svg>}/> */}
						<Button title={'Back'} onClick={()=>navigate(-1)}/>
						<div>
  </div>
			</div>
	<div className='w-full flex items-center justify-center' ref={ref}>
	<div className="mx-auto max-w-full w-8.27in h-11.69in bg-white text-black p-4" id='pdf-content'>
            <h2 className="text-2xl font-bold mb-4">To,</h2>
            <p>AXIS BANK LTD</p>
            <p>Bungalows no –</p>
            <p>Prashanti Tower Above Overnite courier</p>
            <p>MP Nagar Zone-2</p>
            <p>Bhopal – 462011.</p>
            <h3 className="text-lg font-bold mt-4">Dear Sir,</h3>
            <p className="mt-4">Permission to mortgage Duplex No …. admeasuring total area of ….. Sq. Ft. which is a part of CI BUILDERS PVT LTD Project proposed to be named as C I GRAND Situated at Gram Thuakheda Tehsil Huzur ,dist. Bhopal</p>
            <ol className="list-decimal pl-6 mt-2">
                <li className="mt-2">This is to confirm that we have allotted Duplex No…..measuring total area of ….. Sq.Ft. which is a part of CI BUILDERS PVT LTD Project proposed to be named as C I GRAND Situated at Gram Thuakheda Tehsil Huzur ,dist. Bhopal by us to ……….. S/o ………………………… For a total consideration of Rs. 0.00/- (Rupees only) under an Agreement for Sale/Allotment Letter dated ……………. Sale Deed is executed in favor ……………….. S/o …………………. which is registered in Sub registrar office, Bhopal on____________vide its Book No. 1-A, Vol. No.___________its Serial No.____________. OR Sale Deed would be executed in favor of ______________________________________________________________ .</li>
                <li className="mt-2">We confirm that we have obtained necessary permissions / approvals / sanctions for construction of the said building from all the concerned competent authorities and the construction of the building as well as the of the Bungalows are in accordance with the approved plans. We assure that the said Bungalows as well as the land appurtenant thereto are not subject to any encumbrance, charge or liability of any kind whatsoever and that the entire property is free and marketable. We have a clear, legal and marketable title to the said property and every part thereof.</li>
                <li className="mt-2">………………………………………………………. has paid an amount of Rs. 0.00/- (Rupees only) and a sum of Rs. 0.00/- (Rupees only) remains to be paid towards the cost of the said Duplex.</li>
                <li className="mt-2">Possession of the said Duplex will be given to ………………….. S/o ………………………………… about Rs. 0.00/- (Rupees only) on payment of the full consideration of the Duplex.</li>
                <li className="mt-2">We are aware that the said …………………………… S/o ………………………………… has approached AXIS BANK LTD. for a loan for purchasing / acquiring the Duplex and that AXIS BANK LTD. has agreed to sanction / grant the loan to ………………………..S/o ……………………….. to purchase / acquire the above Duplex No. …., …………………….. S/o ………………………………………. has agreed to mortgage the said Duplex in your favor / in favor of your security trustee as security for the said loan. We hereby confirm that we have no objection to ……………………………. S/o ……………………… mortgaging the said Duplex to your Bank / in favor of your security trustee by way of security for repayment of the said loan. AND notwithstanding anything to the contrary contained in the said Agreement for Sale/Allotment Letter, we hereby agree to note the aforesaid charge in our books in respect of the said Duplex and ………………………… S/o …………………………………….. will not be permitted to transfer, assign, sell off / cancel or in any other way / manner deal with the said Duplex prejudicial to the interest of the aforesaid mortgagee without the prior written consent of the aforesaid mortgagee.</li>
                <li className="mt-2">We undertake to form a Co- operative Society / Condominium under the Apartment Ownership Act of the premises / Duplex holders in the aforesaid building within the statutory period. And we agree to inform and give proper notice to the Co- operative Society / Condominium as and when formed, about and said unit / Duplex being so mortgaged to your Bank / the security trustee nominated by your Bank.</li>
            </ol>
            <p className="mt-4">Your Faithfully,<br/>For C.I. REAL ESTATE<br/>Authorised Signature</p>
        </div>
	</div>
	</div>
  </div>
  )
}

