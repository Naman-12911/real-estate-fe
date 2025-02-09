import React, { useEffect, useRef, useState } from 'react'
import Heading from '../../../components/Heading'
import Button from '../../../components/Button'
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import logo from '../../../images/logo.png'
import { StyleSheet } from '@react-pdf/renderer';
import { useReactToPrint } from 'react-to-print';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
// import BoldHeading from '../../../components/react-pdf/BoldHeading';
// import Axis from './Axis';
import { useSelector } from 'react-redux';
// import { toWords } from 'number-to-words';
import { ConvertToWords } from '../../../components/ToWord';
import downloadWordExcel from '../../../components/advanceComponent/downloadWordExcel';

export default function AllotmentLetter2() {
  const accessToken=useSelector((state)=>state.user.user);
	const ref=useRef();
  const {state}=useLocation();
  // console.log(state);
  const [unitData,setUnitData]=useState('');
  const navigate=useNavigate();

	const generatePdf = () => {
        const pdfUrl = "Sample.pdf";
        const link = document.createElement("pdf-content");
        link.href = pdfUrl;
        link.download = "document.pdf"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    useEffect(()=>{
      Axios.get(`misc/unit-number/${state.booking.unit_no}/`,{
        headers:{
          Authorization:`Bearer ${accessToken}`
      }
      })
      .then(res=>{
        setUnitData(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },[])
	const generatePrint = useReactToPrint({
		content: () => ref.current,
	  });
	  const data = {
		executionPlace: "Bhopal",
		executionDate: "18-10-22",
		developerName: "C.I. REAL ESTATE",
		developerPartner: "Mr. Varun Malik S/o Shri Rakesh Malik",
		developerAddress: "182, Zone-I, M.P. Nagar, Bhopal",
		purchaserName: "SMRITI SHRIVASTAVA",
		purchaserAddress: "Ward No. 21 Natraj Colony, Behind Krishna Hotel, Sohagpur, Shahdol",
		landKhasraNo: "89/1/1/2, 89/1/2/2",
		landArea: "10 acres",
		village: "Kankaria",
		location: "Kolar Road, Bhopal",
		projectName: "C.I. GRAND (GATEWAY), SECTOR A1",
		duplexNumber: "39",
		duplexSize: "21' x 40'= 840 sqft",
		totalAmount: "4800000.00",
		basicCost: "4620000.00",
		otherCharges: "180000.00",
		paidAmount: "3800000.00",
		remainingAmount: "1000000.00",
		paymentSchedule: [
		  { stage: "Booking Amount", amount: "Rs. 1,00,000/-" },
		  { stage: "Within 30 days of booking", amount: "25%" },
		  { stage: "Completion of Plinth", amount: "25%" },
		  { stage: "Completion of 1st Slab", amount: "20%" },
		  { stage: "Completion of 2nd Slab", amount: "10%" },
		  { stage: "Completion of Brick Work", amount: "10%" },
		  { stage: "Completion of Plaster", amount: "5%" },
		  { stage: "Completion of Flooring", amount: "3%" },
		  { stage: "At The Time of Possession", amount: "2%" },
		],
	  };
	  const styles = StyleSheet.create({
		page: {
			flexDirection: 'column',
			justifyContent: 'center', // Center content vertically
			alignItems: 'center', // Center content horizontally
			fontFamily: 'Helvetica',
			paddingTop: 50, // Adjust as needed
		  },
	  });

    const [finalTotal,setFinalTotal]=useState('');
    useEffect(() => {
      const total = parseInt(state.booking.unit_cost) + parseInt(state.booking.maintainance_charges_2_year) + parseInt(state.booking.external_electrical_charges) + parseInt(state.booking.water_connection_charges) + parseInt(state.booking.corner_plot_charges) + parseInt(state.booking.park_face_charges) + parseInt(state.booking.registry_extra_charges) + parseInt(state.booking.mutation_charges) + parseInt(state.booking.socity_maintaince_charges) + parseInt(state.booking.govt_extra_charges) + parseInt(state.booking.govt_extra_charges) + parseInt(state.booking.wide_road_facing_charges);
      if (!isNaN(total)) { // Check if total is not NaN
        setFinalTotal(total);
      }
      }, []);

      const handleDocDownload=()=>{
        downloadWordExcel(
          `docx/allotment-letter-draft/?unit_no=${state.booking.unit_nos}`,
          `Allotment Letter ${state.booking.unit_nos}.docx`,
          accessToken,
          'Processing Document File...',
          'Document File Saved to your Device Successfully',
          'Document File Downloaded Successfully',
          'There was a problem with Document file, please try again'
          )
      }


  return (
    unitData&&
	<div>
	<Heading title={"Allotment Letter 2"}/>
	<div className='py-3 w-full   mx-auto space-y-7'>
			<div className=' flex items-end md:items-center justify-end md:gap-5 gap-2 flex-col md:flex-row '>
					<Button title={"Print"} onClick={generatePrint} icon={<svg className="w-4 h-4 fill-current opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M111.998 48H366.061L400 81.943V160H448V81.943C448 69.213 442.943 57.006 433.943 48.004L400.004 14.061C391.002 5.057 378.793 0 366.061 0H111.998C85.494 0 64.012 21.479 64 47.982V75.422L64.004 130.264C64.002 130.264 64.002 130.264 64 130.264V160H112.006L111.998 48ZM440 192H72C32.297 192 0 224.297 0 264V376C0 389.25 10.75 400 24 400H80V480C80 497.672 94.326 512 112 512H400C417.674 512 432 497.672 432 480V400H488C501.25 400 512 389.25 512 376V264C512 224.297 479.703 192 440 192ZM384 464H128V368H384V464ZM464 352H432C432 334.326 417.674 320 400 320H112C94.326 320 80 334.326 80 352H48V264C48 250.766 58.766 240 72 240H440C453.234 240 464 250.766 464 264V352Z"/>
						</svg>}/>
            <Button title={"Download Doc"} onClick={handleDocDownload} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 512 512"><path d="M448 304H394.5L346.5 352H448C456.822 352 464 359.178 464 368V448C464 456.822 456.822 464 448 464H64C55.178 464 48 456.822 48 448V368C48 359.178 55.178 352 64 352H165.5L117.5 304H64C28.654 304 0 332.654 0 368V448C0 483.346 28.654 512 64 512H448C483.348 512 512 483.346 512 448V368C512 332.654 483.348 304 448 304ZM432 408C432 394.744 421.254 384 408 384S384 394.744 384 408C384 421.254 394.746 432 408 432S432 421.254 432 408ZM239.031 368.969C243.719 373.656 249.844 376 256 376S268.281 373.656 272.969 368.969L408.969 232.969C418.344 223.594 418.344 208.406 408.969 199.031S384.406 189.656 375.031 199.031L280 294.062V24C280 10.75 269.25 0 256 0S232 10.75 232 24V294.062L136.969 199.031C127.594 189.656 112.406 189.656 103.031 199.031S93.656 223.594 103.031 232.969L239.031 368.969Z"/>
</svg>}/>
            <Button title={'Back'} onClick={()=>navigate(-1)}/>
						{/* <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf"><Button title={"Download"} onClick={generatePdf} icon={<svg className="w-4 h-4 fill-current opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M448 304H394.5L346.5 352H448C456.822 352 464 359.178 464 368V448C464 456.822 456.822 464 448 464H64C55.178 464 48 456.822 48 448V368C48 359.178 55.178 352 64 352H165.5L117.5 304H64C28.654 304 0 332.654 0 368V448C0 483.346 28.654 512 64 512H448C483.348 512 512 483.346 512 448V368C512 332.654 483.348 304 448 304ZM432 408C432 394.744 421.254 384 408 384S384 394.744 384 408C384 421.254 394.746 432 408 432S432 421.254 432 408ZM239.031 368.969C243.719 373.656 249.844 376 256 376S268.281 373.656 272.969 368.969L408.969 232.969C418.344 223.594 418.344 208.406 408.969 199.031S384.406 189.656 375.031 199.031L280 294.062V24C280 10.75 269.25 0 256 0S232 10.75 232 24V294.062L136.969 199.031C127.594 189.656 112.406 189.656 103.031 199.031S93.656 223.594 103.031 232.969L239.031 368.969Z"/>
						</svg>}/></PDFDownloadLink> */}
						<div>
  </div>
			</div>
	<div className='w-full flex items-center justify-center'>
	 <div className="container mx-auto px-5 py-10 bg-white text-black" id='pdf-content' ref={ref}>
      <div className="my-8">
        <p className="text-center text-3xl font-bold">ALLOTMENT LETTER</p>
        <p className="text-justify text-base">
          THIS ALLOTMENT LETTER OF DUPLEX is made and executed here at Bhopal on this day of {state.booking.created_at.slice(0,state.booking.created_at.indexOf('T'))} BY AND BETWEEN M/s C.I. REAL ESTATE. through its Partner <b> Mr. Varun Malik S/o Shri Rakesh Malik </b>, a company incorporated under the Companies Act having its administrative office at 182, Zone-I, M.P. Nagar, Bhopal hereinafter called the “Developer’’ (which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to mean and include their successors, executors, administrators and assigns) of the FIRST PART.
        </p>
        <p className="text-center text-base font-bold">AND</p>
        <p className="text-justify text-base">
          <b>{state.applicant_name} Son/Daughter/Wife of {state.so_wo_do}</b> resident {state.residence_address} hereinafter, called the ‘Purchaser’ which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to include heirs and successors of the SECOND PART
        </p>
      </div>
      <div className="my-8">
        <p className="text-justify text-base">
          WHEREAS, the developer mentioned above are in lawful possession of the land bearing KhasraNo. 89/1/1/2,89/1/2/2, having a total area of 10 acres in village Kankaria,Kolar Road, Bhopal which is duly diverted and approved for development of plots &amp; construction of houses/Duplex thereon and thus the developer mentioned above are in lawful possession of the said entire land and have a legal right to sell and transfer the whole or any part of the said land with or without construction thereon.
        </p>
        <p className="text-justify text-base">
          AND WHEREAS, the developer are carrying on construction work on the above mentioned land now known as the <b>“{state.booking.project_names}”</b> for its sale to the prospective purchasers. And whereas, the said purchaser after examining various documents of title and the plan of the said Duplex and the terms and conditions laid down by the developer for sale of the Duplex, the purchaser has agreed to purchase and the developer have agreed to sell <b>Unit No {state.booking.unit_nos} size {unitData.square_fit} sqft </b> which is at <b>“{state.booking.project_names}” </b> for a total sum of <span> <b> ₹{finalTotal} </b></span><b>({ConvertToWords.convert(finalTotal)})</b> on the terms and conditions mentioned hereunder:-
        </p>
      </div>
      <div className="my-8">
        <p className="text-justify text-lg font-bold">HENCE THIS ALLOTMENT CUM AGREEMENT LETTER WITNESSES AS UNDER:-</p>
        <ol className="list-decimal list-inside">
          <li className="text-justify text-base">That the purchaser hereby expressly agrees that he/she has applied for purchasing the said Duplex with full knowledge and subject to all the laws/notifications and rules applicable to this area in general and particularly the title and interest of the developer about this project, which have been explained by the Developer and understood by him/ her including all the limitations and obligations in respect thereof and he/ she further agree to strictly abide by the rules/terms and conditions of Sale fixed by the Developer and further the said allotment is strictly subject to the discretion of the said developer, who shall have the sole right to accept or reject any booking without assigning any reason thereof.</li>
          <li className="text-justify text-base pt-10">That the Second Party shall be liable to pay Taxes &amp; Registry Charges as per the Govt. Rules on the above cost.</li>
          <li className="text-justify text-base">That further subject to the aforesaid conditions, the purchaser hereby agrees to pay to the Developer the Basic Cost which is  <span> <b> ₹{state.booking.unit_cost} </b></span><b>({ConvertToWords.convert(state.booking.unit_cost)})</b> Other Charges of <span> <b>₹{finalTotal-parseInt(state.booking.unit_cost)}  </b></span><b>({ConvertToWords.convert(finalTotal-parseInt(state.booking.unit_cost))})</b> amounting Total Cost of <span> <b> ₹{finalTotal} </b></span><b>({ConvertToWords.convert(finalTotal)})</b> towards the cost of the said Duplex including the other charges and all taxes payable as mentioned hereinafter and on the terms &amp; conditions to be observed and performed by the parties as stated hereinafter, the developer shall sell and transfer to the purchaser, the said Duplex, which is more clearly mentioned in the schedule hereto, free from all encumbrances, charges and demands.</li>
          <li className="text-justify text-base">That the purchaser has already paid <span> <b> Rs. 500000.00 </b></span><b>(Rupees <span> Five Lakhs </span> Only)</b> before execution of this Allotment Letter and the purchaser shall now pay the remaining amount of <span> <b> Rs. 6109750.00 </b></span><b>(Rupees <span> Sixty One Lakhs Nine Thousand Seven Hundred Fifty </span> Only)</b> as per the payment schedule mentioned below.</li>
        </ol>
      </div>
      <div className="my-8">
        <div className="my-4">
          <p className="text-lg font-bold"><u>PAYMENT SCHEDULE</u></p>
          <table className="w-full border-collapse border border-black" >
            <tbody>
              <tr>
                <td>On Booking</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>Within 3 months from the date of booking</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>Within 6 months from the date of booking</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>Within 9 months from the date of booking</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>Within 12 months from the date of booking</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>On Commencement of Ground floor Roof</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>On Commencement of 1st floor Roof</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>On Completion of Ground floor Roof</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>On Completion of 1st floor Roof</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>On Possession</td>
                <td>15%</td>
              </tr>
            </tbody>
          </table>
        </div>
      <h2 className="text-2xl font-bold mb-4">Sales Consideration and Terms</h2>
      <div className="mb-4">
        <p><span className="font-bold">A. External Electrification:</span> Rs.{state.booking.external_electrical_charges}.00</p>
        <p><span className="font-bold">B. Water Connection Charges:</span> Rs.{state.booking.water_connection_charges}.00</p>
        <p><span className="font-bold">C. Maintenance Charges (for 2 years only from the possession of first bungalow):</span> Rs.{state.booking.maintainance_charges_2_year}.00</p>
        <p><span className="font-bold">D. Mutation Charge & Documentation:</span> Rs.{state.booking.mutation_charges}.00</p>
        {/* <p><span className="font-bold">E. Society Maintenance Fund (to be transferred to Residents Society):</span> Rs.{state.booking}.00</p> */}
      </div>
      <div className="mb-4">
        <p className="font-bold">Additional Charges:</p>
        <ul className="list-disc pl-8">
          <li>F. Corner Plot 15% value of the cost.</li>
          <li>G. Park facing charges extra 15 % value of the cost.</li>
          <li>H. Any taxes (Central Govt., State Govt. or any other Government body) levied subsequent to booking shall be paid extra and separately.GST 5% on Basic Price.</li>
        </ul>
      </div>
      <p className='pt-10'>6. That, the Management reserves the right to accept or revoke any booking without giving any reason.</p>
      <p>7. The Project is approved by RERA and having RERA registration Number is P-BPL-22-3269</p>
      <p>8. That it is further agreed between the parties that none of the services provided by the developer in the entire project, the “C.I. GRAND (GATEWAY), SECTOR A1” to its various blocks or for the individual Duplexis free of cost/ charge. Besides the cost of the Duplex and the aforesaid installation charges the purchaser expressly agrees to pay all such fee/ charges and / or monthly maintenance charges for all such facilities provided / to be provided by the developer therein. The purchaser hereby further agrees with the developer therein to pay the aforesaid charges. The purchaser hereby further agrees with the developer that their decision about fixing such charges for all the facilities/amenities shall be final and binding on him/her.</p>
      <p>9. That if the purchaser commits delay or default in payment of any of theaforesaid installments on their respective due dates, time being the essence of the contract, the developer shall be at liberty to put an end to this Allotment Cum Acceptance Letter, in which event the earnest money till then paid by the purchaser will also be liable to pay to the developer damages which they may suffer. On default being committed by the purchaser as aforesaid, the developer shall also be at liberty to sell off the said Duplex to any other purchaser as the developer deem fit and at such price as the developer deem fit and the allottee/purchaser will not be entitled to question such sale or to claim any amount whatsoever from the developer. That without prejudice to the developer aforesaid rights, the purchaser shall be liable to pay to the developer interest at the rate of 24% (twenty four percent) per annum on all amounts outstanding for more than 7 (seven) days. The discretion for termination of the contract or acceptance of the delayed payment with interest shall exclusively rest with the developer.</p>
      <p>10. That in case the purchaser desires to cancel the said allotment than amount (s), if any, paid over and above the earnest money shall be refunded but only after deduction of 5% amount from the said earnest money</p>
      <p>11. That further, in case the purchaser desires to get the plot of land pertinent to the said Duplex registered in his / her favour, in order to avail the housing loan from any financial institution in his/her employer, then the same shall be at the sole discretion of the developer and in case of the developer agreeing to do so, then the same shall be strictly subject to condition that the construction, semi finishing of the said Duplex thereon shall essentially be got done by the purchaser through the developer only and in no case the purchaser shall be entitled to claim the same to be done himself / herself or through any other agency.</p>
      <p>12. That the purchaser is purchasing with full knowledge and subject to terms and conditions of holder application and all the laws / notifications and rules applicable to this area in general and group housing projects in particular which have been explained by developer and understood by the purchaser.</p>
      <p className='pt-10'>13. That the purchaser shall additionally pay on demand to the Developer his/ her proportionate share of the running cost for the block electric/ water charges, material and / or labour. The developer decision in this regard shall be final and binding on the purchaser. The purchaser shall also pay the individual deposit as per demand note of MPMKVV CO.LTD. The Developer shall not be responsible for any delay in supply of Electricity from MPMKVV CO.LTD.</p>
      <p>14. That the purchaser hereby agrees to pay on demand, to the Developer proportionate share of the cost for the provision of external water supply lines, pipes, tube wells, motors, pumps etc., including official charges of PHE and miscellaneous expenses incurred for providing such water lines. The Developer decision in this regard shall be final and binding on the purchaser. The Developer however shall not be responsible for supply of water in terms of quantity or time. No bore is allowed individually to be done by any purchaser. The Developer or the Society will supply the water.</p>
      <p>15. That the purchaser has clearly understood that besides the total cost of the Duplex and the other charges payable under Para 5 of this Allotment Cum Acceptance Letter, the purchaser has agreed to pay monthly maintenance charges (to be fixed and determined by the developer) in lump sum for at least Two year in advance either to the developer or to the agency to be appointed by the Developer or Society and the said charges are towards covering a total period of 2 year, of maintenance only and after the expiry of said period of 2 year, the purchaser agrees to pay such revised charges to the Developer / agency/ society on demand, enabling them to continue to maintain the services of the said Project. In case of failure on the part of purchaser to do so, the Developer shall not be bound to continue to maintain the same any further.</p>
      <p>16. That the purchaser hereby agrees that he / she shall pay, as and when demanded by the Developer, the stamp duty, Registration charges and all other incidental and legal expenses plus Services Charges for execution and registration of sale deed of the Duplex in his / her favour, which shall be executed and got registered after receipt of full price, other due charges and expenses from the purchaser in respect of the Duplex allotted to him/her.</p>
      <p>17. That the purchaser hereby agrees that he/she shall pay, as and when demanded by the Developer, the stamp duty. Registration charges and all other incidental and legal expenses plus Services Charges for execution and registration of sale deed of the plot in his/her favour, which shall be executed and got registered after receipt full value of plot ie 28,00,000 /- & other due charges and expenses from the purchaser in respect of the Duplex allotted to him/her and remaining payment will be as per payment schedule.</p>
      <p>18. The developer shall have the first lien and charge on the Duplex till all its dues and other sums are cleared by the purchaser to the Developer.</p>
      <p className='pt-20'>19. That the purchaser is satisfied about the interest and title of the Developer in the land on which the said Duplex is being constructed. It is further expressly agreed by the purchaser that the areas shown in the developer sale literature as super built up areas are as per the calculations of the developer’s architect and engineers. The purchaser shall not raise any objection or demand any explanation regarding the same since the sale price is on lump sum basis.</p>
      <p>20. That the possession of the said Duplex shall be delivered to the purchaser after the Duplex is ready for occupation and use, provided all the amounts due by the purchasers are paid to the developer. The purchaser shall take possession of the said Duplex after 7 (Seven) days of the developer giving notice to the purchaser intimating that the Duplex is ready for use and occupation.</p>
      <p>21. That commencing a fortnight after notice is given by the developer that the said Duplex is ready for use and occupation, the purchaser shall be liable to bear and pay all cess, electricity bills and other tax, charges or outgoing payable in respect of the said Duplex. Also commencing a fortnight after intimation is given by the developer that the Duplex is ready for occupation; the purchaser shall be liable topay an interest @ 18% (Eighteen Percent) p.a. on all payments due to the developer.</p>
      <p>22. That the First Party shall carry out the external maintenance of the campus, i.e. campus Gardens, cleaning of campus roads and side drains, street lights, security guards, maintenance of sumps and tube well water pumps, maintenance of internal concrete roads up to 2 years from the date of Possession. After 2 years the Second Party is liable to pay the maintenance amount to the First Party/Society, if the Society has been made or to the developer if the society has not yet been formed.</p>
      <p>23. That the purchaser shall after taking possession; use the Duplex for residential purpose only and will not rent, sublet, lease the same for commercial purpose. Moreover, the purchaser also expressly agrees that he shall not make any additions or alterations outside the said Duplexand any change in/of elevation is not permitted.</p>
      <p>24. That considering the nature of work involved, if the completion of the Duplex is reasonably delayed due to unforeseen reasons or due to shortage of raw materials, steel, cement, etc., then the purchaser shall not claim any interest whatsoever. Thus the purchaser agrees that the sale of the Duplex is subject to force major clause.</p>
      <p>25. That it shall be the responsibility of the purchaser to inform the developer by registered A.D. letter about any change in his/her address other than one mentioned in this Allotment Letter. All demand notices and letters posted at the first registered address will be deemed to have been received at the time when those should ordinarily reach such address and the purchaser shall be responsible for any default in payment and other consequences that might occur there from.</p>
      <p>26. That the purchaser further agrees that the application form and allotment letter shall be read as a part of this AllotmentLetter and all terms and conditions mentioned therein, shall also remain binding on him/her and the Bhopal (MP) courts alone shall have jurisdiction in matters arising out / touching and / or concerning this transaction.</p>

	<h2 className="text-2xl font-bold mb-4 pt-10">SCHEDULE – A</h2>
      <p className="font-bold">ALL THAT PROPERTY KNOWN AS a residential Duplex No {unitData.unit_no}, Duplex size {unitData.square_fit} sqft Popularly known as “C.I. GRAND (GATEWAY), SECTOR A1” situated at Village Kankariya, Kolar Road, District Bhopal having measurements and boundaries as under:</p>
      <p className="font-bold">The Duplex consists of three bedrooms, drawing - dinning, one kitchen, and three toilets</p>
      <h3 className="text-lg font-bold mt-4 mb-2">BOUNDARIES for Duplex No- {unitData.unit_no}</h3>
      <ul className="list-disc pl-8">
        <li><span className="font-bold">Bounded on East By:</span> {unitData.east_by}</li>
        <li><span className="font-bold">Bounded on West By:</span> {unitData.west_by}</li>
        <li><span className="font-bold">Bounded on North By:</span> {unitData.north_by}</li>
        <li><span className="font-bold">Bounded on South By:</span> {unitData.south_by}</li>
      </ul>
      <p className="mt-4">IN WITNESS WHEREOF the parties have set and scribed their respective hands on this Allotment Letter on the day and month of the year noted above in presence of witnesses.</p>
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-28 my-8 mt-20 px-5">
        <div className="w-3/4 flex justify-between">
          <div className="text-left">
            <p className="">WITNESSES BY</p>
          </div>
          <div className="text-left">
            <p className="">SIGNED & DELIVERED</p>
          </div>
        </div>
        <div className="w-3/4 flex justify-between">
          <div className="text-left">
            <p className="">(1)</p>
          </div>
          <div className="text-left">
            <p className="">DEVELOPER</p>
          </div>
        </div>
        <div className="w-3/4 flex justify-between">
          <div className="text-left">
            <p className="">(2)</p>
          </div>
          <div className="text-left">
            <p className="">PURCHASER</p>
          </div>
        </div>
      </div>
	  </div>
	</div>
	</div>
  </div>
  )
}

