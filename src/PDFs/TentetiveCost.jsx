import React, { useEffect } from 'react'
import { Document, PDFViewer, Page, Text, pdf ,Font,View ,Image} from '@react-pdf/renderer';
import regularFont from '../fonts/Roboto-Regular.ttf'
import boldFont from '../fonts/Roboto-Bold.ttf'
import logo from '../images/logo.png'
import { ConvertToWords } from '../components/ToWord';
import dateFormat from "dateformat";
import grand from '../images/grand.png'
import park from '../images/park.png'
import cancel from '../images/cancelled.png'

import { useSelector } from 'react-redux';
import Axios from '../Axios';



export default function TentetiveCost({content,coApplicantName}) {
	// console.log(content);
	Font.register({ family: "Regular", src: regularFont });
	Font.register({ family: "Bold", src: boldFont });
	const styles = {
		page: {
		  paddingLeft: 28,
		  paddingRight: 28,
		  paddingTop: 28,
		  paddingBottom: 28,
		  fontSize: 12,
		  fontFamily: "Regular",
		  textAlign:'center',
		  justifyContent:'space-evenly'
		  
		},
		section: {
			width:'100%',
			margin: 10,
			padding: 10,
			// flexGrow: 1,
		  },
		heading: {
			textAlign: 'center',
			fontSize: 20,
			fontFamily: 'Bold',
			marginTop:20,
		  },
		  top:{
			flexDirection:'row',
			justifyContent:'space-between',
			alignItems:'center'
		  },
		  table: {
			display: 'table',
			width: '100%',
			borderStyle: 'solid',
			borderWidth: 1,
			borderRightWidth: 0,
			borderBottomWidth: 0,
		  },
		  tableRow: {
			margin: 'auto',
			flexDirection: 'row',
		  },
		  tableCol: {
			width: '33.33%',
			borderStyle: 'solid',
			borderWidth: 1,
			borderLeftWidth: 0,
			borderTopWidth: 0,
		  },
		  tableCell: {
			// margin: 'auto',
			marginTop: 5,
			fontSize: 12,
			textAlign: 'center',
		  },
		  pageBackground: {
			position: 'absolute',
			display: 'block',
			height: '100%',
			width: '100%',
		  },
	  };
  return (
	<Document>
			<Page size="A4" style={styles.page}>
			{/* <Image src={cancel} style={styles.pageBackground} /> */}
				<View style={styles.top}>
					<Image src={content.project_name.project_name=='CI Grand'?grand:park} style={{height:80,width:100}}/>
					<View>
						<Text>CI Real Estate</Text>
						<Text>182, Zone-1, M.P. Nagar, Bhopal (M.P.),</Text>
						<Text>Bhopal Madhya Pradesh</Text>
						<Text>Tel: 0755-4231160, 4274566</Text>
						<Text>Email: cibuilders08@gmail.com</Text>
						<Text>Web: www.cibuilders.in</Text>
					</View>
				</View>
				<Text style={styles.heading}>PAYMENT RECEIPT</Text>
				<View style={styles.top}>
						<Text style={{fontFamily: 'Bold',fontSize: 16,}}>Receipt No: {content.receipt_unique_id}</Text>
						<Text style={{fontFamily: 'Bold',fontSize: 16,textDecoration:'underline'}}>OFFICE COPY</Text>
				</View>
				<Text style={{fontFamily: 'Bold',textAlign:'right',marginTop:20}}>Dated: {dateFormat(content.receipt_date,'dd-mm-yyyy')}</Text>
				<Text style={{textAlign:'left', marginTop:20}}>Received with thanks from <Text style={{fontFamily: 'Bold'}}>{content.applicant_name}{coApplicantName && ` & ${coApplicantName}`}</Text> a
sum of <Text style={{fontFamily: 'Bold'}}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}.00/- ({ConvertToWords.convert(content.payment_stage.paybale_amount)}) </Text> vide {content.mode_of_payment.mode_of_payment} No {content.cheque_number} Dated {dateFormat(content.transation_date,'dd-mm-yyyy')} drawn on {content.bank_name.bank_name}, {content.branch_name} against the Duplex no. {content.unit_number.unit_no} in {content.project_name.project_name}, Beside
{content.project_name.address} as per following details:</Text>

<View style={styles.section}>
        <View style={styles.table}>
          {/* Table Headers */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Total Amount</Text>
            </View>
          </View>
          {/* Table Rows */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{content.payment_stage.stage_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}</Text>
            </View>
          </View>
          {/* Add more rows as needed */}
        </View>
      </View>
	  <Text style={{textAlign:'right',border:'1px solid black',fontFamily:'Bold'}}>Rs.{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}/-</Text>
	  <Text style={{textAlign:'left',fontFamily:'Bold',marginTop:20}}>For CI Real Estate</Text>
	  <Text style={{textAlign:'left',fontSize: 10,fontFamily:'Bold',marginTop:50}}>Authorised Signatory</Text>
		<View>
					<Text style={{textAlign:'left',fontSize: 8,marginTop:50}}>This receipt is subject to realization of cheque/draft.</Text>
				<Text style={{textAlign:'left',fontSize: 8}}>This receipt is not transferable without consent of the company</Text>
				<Text style={{textAlign:'left',fontSize: 8}}>This is only the receipt for the remittance as above and this does not entitle you to claim ownership/title of the above property/unit unless you are
			the confirmed as allotee/owner of the prope8</Text>
		</View>
	 
			</Page>

			<Page size="A4" style={styles.page}>
				<View style={styles.top}>
					<Image src={content.project_name.project_name=='CI Grand'?grand:park} style={{height:80,width:100}}/>
					<View>
						<Text>CI Real Estate</Text>
						<Text>182, Zone-1, M.P. Nagar, Bhopal (M.P.),</Text>
						<Text>Bhopal Madhya Pradesh</Text>
						<Text>Tel: 0755-4231160, 4274566</Text>
						<Text>Email: cibuilders08@gmail.com</Text>
						<Text>Web: www.cibuilders.in</Text>
					</View>
				</View>
				<Text style={styles.heading}>PAYMENT RECEIPT</Text>
				<View style={styles.top}>
						<Text style={{fontFamily: 'Bold',fontSize: 16,}}>Receipt No: {content.receipt_unique_id}</Text>
						<Text style={{fontFamily: 'Bold',fontSize: 16,textDecoration:'underline'}}>CUSTOMER COPY</Text>
				</View>
				<Text style={{fontFamily: 'Bold',textAlign:'right',marginTop:20}}>Dated: {dateFormat(content.receipt_date,'dd-mm-yyyy')}</Text>
				<Text style={{textAlign:'left', marginTop:20}}>Received with thanks from <Text style={{fontFamily: 'Bold'}}>{content.applicant_name}{coApplicantName && ` & ${coApplicantName}`}</Text> a
sum of <Text style={{fontFamily: 'Bold'}}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}.00/- ({ConvertToWords.convert(content.payment_stage.paybale_amount)}) </Text> vide {content.mode_of_payment.mode_of_payment} No {content.cheque_number} Dated {dateFormat(content.transation_date,'dd-mm-yyyy')} drawn on {content.bank_name.bank_name}, {content.branch_name} against the Duplex no. {content.unit_number.unit_no} in {content.project_name.project_name}, Beside
{content.project_name.address} as per following details:</Text>

<View style={styles.section}>
        <View style={styles.table}>
          {/* Table Headers */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Total Amount</Text>
            </View>
          </View>
          {/* Table Rows */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{content.payment_stage.stage_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}</Text>
            </View>
          </View>
          {/* Add more rows as needed */}
        </View>
      </View>
	  <Text style={{textAlign:'right',border:'1px solid black',fontFamily:'Bold'}}>Rs.{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}/-</Text>
	  <Text style={{textAlign:'left',fontFamily:'Bold',marginTop:20}}>For CI Real Estate</Text>
	  <Text style={{textAlign:'left',fontSize: 10,fontFamily:'Bold',marginTop:50}}>Authorised Signatory</Text>

	  <View>
					<Text style={{textAlign:'left',fontSize: 8,marginTop:50}}>This receipt is subject to realization of cheque/draft.</Text>
				<Text style={{textAlign:'left',fontSize: 8}}>This receipt is not transferable without consent of the company</Text>
				<Text style={{textAlign:'left',fontSize: 8}}>This is only the receipt for the remittance as above and this does not entitle you to claim ownership/title of the above property/unit unless you are
			the confirmed as allotee/owner of the prope8</Text>
		</View>
			</Page>
			<Page size="A4" style={styles.page}>
				<View style={styles.top}>
					<Image src={content.project_name.project_name=='CI Grand'?grand:park} style={{height:80,width:100}}/>
					<View>
						<Text>CI Real Estate</Text>
						<Text>182, Zone-1, M.P. Nagar, Bhopal (M.P.),</Text>
						<Text>Bhopal Madhya Pradesh</Text>
						<Text>Tel: 0755-4231160, 4274566</Text>
						<Text>Email: cibuilders08@gmail.com</Text>
						<Text>Web: www.cibuilders.in</Text>
					</View>
				</View>
				<Text style={styles.heading}>PAYMENT RECEIPT</Text>
				<View style={styles.top}>
						<Text style={{fontFamily: 'Bold',fontSize: 16,}}>Receipt No: {content.receipt_unique_id}</Text>
						<Text style={{fontFamily: 'Bold',fontSize: 16,textDecoration:'underline'}}>ACCOUNTS SECTION COPY</Text>
				</View>
				<Text style={{fontFamily: 'Bold',textAlign:'right',marginTop:20}}>Dated: {dateFormat(content.receipt_date,'dd-mm-yyyy')}</Text>
				<Text style={{textAlign:'left', marginTop:20}}>Received with thanks from <Text style={{fontFamily: 'Bold'}}>{content.applicant_name}{coApplicantName && ` & ${coApplicantName}`}</Text> a
sum of <Text style={{fontFamily: 'Bold'}}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}.00/- ({ConvertToWords.convert(content.payment_stage.paybale_amount)}) </Text> vide {content.mode_of_payment.mode_of_payment} No {content.cheque_number} Dated {dateFormat(content.transation_date,'dd-mm-yyyy')} drawn on {content.bank_name.bank_name}, {content.branch_name} against the Duplex no. {content.unit_number.unit_no} in {content.project_name.project_name}, Beside
{content.project_name.address} as per following details:</Text>

<View style={styles.section}>
        <View style={styles.table}>
          {/* Table Headers */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={{...styles.tableCell,fontFamily:'Bold'}}>Total Amount</Text>
            </View>
          </View>
          {/* Table Rows */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{content.payment_stage.stage_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}</Text>
            </View>
          </View>
          {/* Add more rows as needed */}
        </View>
      </View>
	  <Text style={{textAlign:'right',border:'1px solid black',fontFamily:'Bold'}}>Rs.{Intl.NumberFormat('en-IN').format(content.payment_stage.paybale_amount)}/-</Text>
	  <Text style={{textAlign:'left',fontFamily:'Bold',marginTop:20}}>For CI Real Estate</Text>
	  <Text style={{textAlign:'left',fontSize: 10,fontFamily:'Bold',marginTop:50}}>Authorised Signatory</Text>

	  <View>
					<Text style={{textAlign:'left',fontSize: 8,marginTop:50}}>This receipt is subject to realization of cheque/draft.</Text>
				<Text style={{textAlign:'left',fontSize: 8}}>This receipt is not transferable without consent of the company</Text>
				<Text style={{textAlign:'left',fontSize: 8}}>This is only the receipt for the remittance as above and this does not entitle you to claim ownership/title of the above property/unit unless you are
			the confirmed as allotee/owner of the prope8</Text>
		</View>
			</Page>
		  </Document>
  )
}
