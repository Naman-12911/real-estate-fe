import React, { useEffect, useState, lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import { Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './app/User';
import { userTypePush } from './app/UserType';

// Import partials
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';


//
import MyJobDesk from './pages/Account/MyJobDesk';
import LeadsReport from './pages/Admin/LeadsReport';
// import AgentsReport from './pages/Admin/AgentsReport';
import PerformanceReport from './pages/Admin/PerformanceReport';
import AgentReportSingle from './pages/Admin/AgentReportSingle';
import CompareAgents from './pages/Admin/CompareAgents';
import CompareSource from './pages/Admin/CompareSource';
// Lazy load pages
// const MyJobDesk = lazy(() => import('./pages/Account/MyJobDesk'));
const AddNewLead = lazy(() => import('./pages/Account/AddNewLead'));
const ViewLeads = lazy(() => import('./pages/Account/ViewLeads'));
const ViewPrimeLead = lazy(() => import('./pages/Account/ViewPrimeLead'));
const LeadProfile = lazy(() => import('./pages/Account/LeadProfile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ShowProfile = lazy(() => import('./pages/Profile/ShowProfile'));
const AddBookingForm = lazy(() => import('./pages/Main/Direct Booking/AddBookingForm'));
const AddBookingFormProjectDetails = lazy(() => import('./pages/Main/Direct Booking/AddBookingFormProjectDetails'));
const AddBookingFormPersonalDetails = lazy(() => import('./pages/Main/Direct Booking/AddBookingFormPersonalDetails'));
const AddBookingFormCoApplicantDetails = lazy(() => import('./pages/Main/Direct Booking/AddBookingFormCoApplicantDetails'));
const ViewBookingForm = lazy(() => import('./pages/Main/Direct Booking/ViewBookingForm'));
const EditBookingCostForm = lazy(() => import('./pages/Main/Direct Booking/EditBookingCostForm'));
const SearchApplicant = lazy(() => import('./pages/Main/Payment Stages/SearchApplicant'));
const AddPaymentStages = lazy(() => import('./pages/Main/Payment Stages/AddPaymentStages'));
const PropertyStatus = lazy(() => import('./pages/Main/PropertyStatus'));
const SearchApplicantBookingForm = lazy(() => import('./pages/Main/Booking Form/SearchApplicant'));
const EditBookingForm = lazy(() => import('./pages/Main/Booking Form/EditBookingForm'));
const EditBookingFormProjectDetails = lazy(() => import('./pages/Main/Booking Form/EditBookingFormProjectDetails'));
const EditBookingFormPersonalDetails = lazy(() => import('./pages/Main/Booking Form/EditBookingFormPersonalDetails'));
const PrintViewBookingForm = lazy(() => import('./pages/Main/Direct Booking/PrintViewBookingForm'));
const PrintBookingForm = lazy(() => import('./pages/Main/Booking Form/PrintBookingForm'));
const ViewPaymentStages = lazy(() => import('./pages/Main/Payment Stages/ViewPaymentStages'));
const SearchApplicantLoan = lazy(() => import('./pages/Main/Client Loan File/SearchApplicant'));
const ApplicantBankInformation = lazy(() => import('./pages/Main/Client Loan File/ApplicantBankInformation'));
const EditBookingFormCoApplicantDetails = lazy(() => import('./pages/Main/Booking Form/EditBookingFormCoApplicantDetails'));
const SearchApplicantDemandLetter = lazy(() => import('./pages/Main/Demand Letter/SearchApplicant'));
const ListOfStage = lazy(() => import('./pages/Main/Demand Letter/ListOfStage'));
const GenerateDemandLetter = lazy(() => import('./pages/Main/Demand Letter/GenerateDemandLetter'));
const SearchApplicantDocumentation = lazy(() => import('./pages/Main/Documentation/SearchApplicant'));
const AllotmentLetter = lazy(() => import('./pages/Main/Documentation/AllotmentLetter'));
const AllotmentLetter2 = lazy(() => import('./pages/Main/Documentation/AllotmentLetter2'));
const TCPLetter = lazy(() => import('./pages/Main/Documentation/TCPLetter'));
const RACPCSBI = lazy(() => import('./pages/Main/Documentation/RACPCSBI'));
const HDFC = lazy(() => import('./pages/Main/Documentation/HDFC'));
const LIC = lazy(() => import('./pages/Main/Documentation/LIC'));
const PossessionLetter = lazy(() => import('./pages/Main/Documentation/PossessionLetter'));
const Faq = lazy(() => import('./pages/Assets/Faq'));
const AddDemandLetter = lazy(() => import('./pages/Main/Demand Letter/AddDemandLetter'));
const ViewDemandLetter = lazy(() => import('./pages/Main/Demand Letter/ViewDemandLetter'));
const AddBillingReceipt = lazy(() => import('./pages/Main/Billing/AddBillingReceipt'));
const UploadDocument = lazy(() => import('./pages/Main/Documentation/UploadDocument'));
const ViewBillingReceipt = lazy(() => import('./pages/Main/Billing/ViewBillingReceipt'));
const PrintBillingReceipt = lazy(() => import('./pages/Main/Billing/PrintBillingReceipt'));
const Axis = lazy(() => import('./pages/Main/Documentation/Axis'));
const Canara = lazy(() => import('./pages/Main/Documentation/Canara'));
const PNB = lazy(() => import('./pages/Main/Documentation/PNB'));
const SBI = lazy(() => import('./pages/Main/Documentation/SBI'));
const NOC = lazy(() => import('./pages/Main/Documentation/NOC'));
const ProjectDocument = lazy(() => import('./pages/Main/ProjectDocument'));
const SearchApplicantBilling = lazy(() => import('./pages/Main/Billing/SearchApplicant'));
const ViewBillingRecieptUser = lazy(() => import('./pages/Main/Billing/ViewBillingRecieptUser'));
const EditLeadProfile = lazy(() => import('./pages/Account/EditLeadProfile'));
const AddDiscussion = lazy(() => import('./pages/Account/AddDiscussion'));
const DumpData = lazy(() => import('./pages/Account/DumpLeads'));
const SiteVisit = lazy(() => import('./pages/Account/SiteVisit'));
const ViewLeadsAdmin = lazy(() => import('./pages/Admin/ViewLeads'));
const DumpLeadsAdmin = lazy(() => import('./pages/Admin/DumpLeads'));
const SiteVisitAdmin = lazy(() => import('./pages/Admin/SiteVisit'));
const LeadProfileAdmin = lazy(() => import('./pages/Admin/LeadProfile'));
const CorporateVisit = lazy(() => import('./pages/Admin/CorporateVisit'));
const DelayedLeads = lazy(() => import('./pages/Admin/DelayedLeads'));
const AgentManagement = lazy(() => import('./pages/Admin/AgentManagement'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const EditLeads = lazy(() => import('./pages/Admin/EditLeads'));
// const LeadsReport = lazy(() => import('./pages/Admin/LeadsReport'));
const AgentsReport = lazy(() => import('./pages/Admin/AgentsReport'));
// const PerformanceReport = lazy(() => import('./pages/Admin/PerformanceReport'));
// const AgentReportSingle = lazy(() => import('./pages/Admin/AgentReportSingle'));
// const CompareAgents = lazy(() => import('./pages/Admin/CompareAgents'));
// const CompareSource = lazy(() => import('./pages/Admin/CompareSource'));
const AddNewLeadCorporateVist = lazy(() => import('./pages/Account/AddNewLeadCorporateVist'));
const CorporateVisitSale = lazy(() => import('./pages/Account/CorporateVisit'));
const WhatsappMessage = lazy(() => import('./pages/Account/WhatsappMessage'));
const FestivalPost = lazy(() => import('./pages/Account/FestivalPost'));
const SubLeadReport = lazy(() => import('./pages/Admin/SubLeadReport'));
const EmailMessage = lazy(() => import('./pages/Account/EmailMessage'));
const SiteVisitLeads = lazy(() => import('./pages/Admin/SiteVisitLeads'));
const TransferDumpLeads = lazy(() => import('./pages/Admin/TransferDumpLeads'));
const AccountReport = lazy(() => import('./pages/Admin/AccountReport'));
const SearchApplicantWorker = lazy(() => import('./pages/Worker/SearchApplicant'));
const DataDR = lazy(() => import('./pages/DataDR'));
const EditBillingReceipt = lazy(() => import('./pages/Main/Billing/EditBillingReceipt'));
const TicketRaiseing = lazy(() => import('./pages/Ticket/TicketRaiseing'));
const AdminTickets = lazy(() => import('./pages/Admin/AdminTickets'));
const AdminTicketUpdate = lazy(() => import('./pages/Admin/AdminTicketUpdate'));
const EditPaymentStage = lazy(() => import('./pages/Main/Payment Stages/EditPaymentStage'));
const AllProject = lazy(() => import('./pages/SuperAdminSection/project/All'));
const SingleProject = lazy(() => import('./pages/SuperAdminSection/project/Single'));
const AllProjectType = lazy(() => import('./pages/SuperAdminSection/projectType/All'));
const SingleProjectType = lazy(() => import('./pages/SuperAdminSection/projectType/Single'));
const AllUnitNumber = lazy(() => import('./pages/SuperAdminSection/unitNumber/All'));
const SingleUnitNumber = lazy(() => import('./pages/SuperAdminSection/unitNumber/Single'));
const AllProjectPhase = lazy(() => import('./pages/SuperAdminSection/projectPhase/All'));
const SingleProjectPhase = lazy(() => import('./pages/SuperAdminSection/projectPhase/Single'));
const AllBooking = lazy(() => import('./pages/SuperAdminSection/booking/All'));
const SingleBooking = lazy(() => import('./pages/SuperAdminSection/booking/Single'));
const AllPersonalDetail = lazy(() => import('./pages/SuperAdminSection/personalDetail/All'));
const SinglePersonalDetail = lazy(() => import('./pages/SuperAdminSection/personalDetail/Single'));
const AllCoApplicantDetail = lazy(() => import('./pages/SuperAdminSection/coApplicantDetail/All'));
const SingleCoApplicantDetail = lazy(() => import('./pages/SuperAdminSection/coApplicantDetail/Single'));
const AllPaymentStage = lazy(() => import('./pages/SuperAdminSection/paymentStage/All'));
const SinglePaymentStage = lazy(() => import('./pages/SuperAdminSection/paymentStage/Single'));
const AllBillReceipt = lazy(() => import('./pages/SuperAdminSection/billReceipt/All'));
const SingleBillReceipt = lazy(() => import('./pages/SuperAdminSection/billReceipt/Single'));
const AddNewLeadSiteVist = lazy(() => import('./pages/Account/AddNewLeadSiteVist'));
const AllDemandLetter = lazy(() => import('./pages/SuperAdminSection/demandLetter/All'));
const SingleDemandLetter = lazy(() => import('./pages/SuperAdminSection/demandLetter/Single'));
const AllBank = lazy(() => import('./pages/SuperAdminSection/bank/All'));
const SingleBank = lazy(() => import('./pages/SuperAdminSection/bank/Single'));
const AllModeOfPayment = lazy(() => import('./pages/SuperAdminSection/modeOfPayment/All'));
const SingleModeOfPayment = lazy(() => import('./pages/SuperAdminSection/modeOfPayment/Single'));
const AllClientLoan = lazy(() => import('./pages/SuperAdminSection/clientLoan/All'));
const SingleClientLoan = lazy(() => import('./pages/SuperAdminSection/clientLoan/Single'));
const AllFestival = lazy(() => import('./pages/SuperAdminSection/festival/All'));
const SingleFestival = lazy(() => import('./pages/SuperAdminSection/festival/Single'));
const AllFAQ = lazy(() => import('./pages/SuperAdminSection/faq/All'));
const SingleFAQ = lazy(() => import('./pages/SuperAdminSection/faq/Single'));
const AllLeadSource = lazy(() => import('./pages/SuperAdminSection/leadSource/All'));
const SingleLeadSource = lazy(() => import('./pages/SuperAdminSection/leadSource/Single'));
const AllLeadSourceSub = lazy(() => import('./pages/SuperAdminSection/leadSourceSub/All'));
const SingleLeadSourceSub = lazy(() => import('./pages/SuperAdminSection/leadSourceSub/Single'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const SearchConstructor = lazy(() => import('./pages/Worker/SearchConstructor'));
const AddEditConstructor = lazy(() => import('./pages/Worker/AddEditConstructor'));
const ConstructorProfile = lazy(() => import('./pages/Worker/ConstructorProfile'));
const ConstructorRemark = lazy(() => import('./pages/Worker/ConstructorRemark'));
const ConstructorMiscellaneous = lazy(() => import('./pages/Worker/ConstructorMiscellaneous'));
const ConstructorBills = lazy(() => import('./pages/Worker/ConstructorBills'));
const ConstructorStageUpdate = lazy(() => import('./pages/Worker/ConstructorStageUpdate'));
const ConstructorPreviousBills = lazy(() => import('./pages/Worker/ConstructorPreviousBills'));
const ConstructorEditUnit = lazy(() => import('./pages/Worker/ConstructorEditUnit'));


// import { onMessageListener } from './firebase';
import Spinner from './components/Spinner';
import { Capacitor } from '@capacitor/core';
import nativeAppStatusBar from './components/advanceComponent/nativeAppStatusBar';
import { nativeSafeAreaView } from './components/advanceComponent/nativeSafeAreaView';
import DashboardDetails from './pages/Admin/DashboardDetails';
import { App as CapacitorApp } from '@capacitor/app';
import ScrollToTop from "./components/ScrollToTop";



function App() {
  const [isAppViewVisible, setIsAppViewVisible] = useState(false);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  const handleButtonPress = () => {
    setIsAppViewVisible(true);
  };

  const execpUser=JSON.parse(localStorage.getItem('user'))

  const location = useLocation();
  // const { currentTheme, changeCurrentTheme } = useThemeProvider();
  const dispatch=useDispatch();
  dispatch(userLogin());
  dispatch(userTypePush());
  // dispatch(themeToggle(currentTheme))
  const user=useSelector((state)=>state.user.user);
  const userType=JSON.parse(useSelector((state)=>state.userType.userType));

  // console.log(userType);
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const excludeRoutes=['/login','/register','/','/ddr','/contactus'];

  // useEffect(()=>{
  //   requestForToken();
  //   initializePushNotifications(navigate);
  // },[])



  //   const listenForMessages = () => {
  //     if(!Capacitor.isNativePlatform()){
  //         onMessageListener()
  //         .then((payload) => {
  //           // console.log(payload)   
  //         })
  //       .catch((err) => {
  //           console.log(`An error occurred when showing notification: ${err}`);
  //       });
  //     }
  //   }

  // listenForMessages();

  // CapacitorApp.addListener('backButton', ({canGoBack}) => {
  //   if(!canGoBack){
  //     CapacitorApp.exitApp();
  //   } else {
  //     window.history.back();
  //   }
  // });
  const navigate = useNavigate();
  useEffect(() => {
    const backButtonListener = CapacitorApp.addListener('backButton', () => {
      if (window.location.pathname === '/home') {
        CapacitorApp.exitApp();
      } else {
        navigate(-1);
      }
    });

    return () => {
      backButtonListener.remove();
    };
  }, [navigate]);



  const includesAny = (array, values) => {
    return values.some(value =>array&&array.includes(value));
  };

  return (
    isNative && !isAppViewVisible ? (
      <div style={{width:'100vw',height: '100vh', border: 'none',position:'relative' }}>
        <iframe
          src="https://cibuilders.in/"
          title="WebView"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
        <div className='w-full absolute bottom-0'>
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 gap-2" onClick={handleButtonPress}>Login</button>
        </div>
      </div>
    ) :<>
          {excludeRoutes.includes(location.pathname)?
          <div className='overflow-hidden'>
             <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route exact path='/ddr' element={<DataDR/>}/>
              <Route exact path='/contactus' element={<ContactUs/>}/>
              <Route exact path='/' element={<Navigate to={'/login'}/>}/>
              <Route exact path='/login' element={!user?<Login/>:<Navigate to={includesAny(userType,["admin"])?"/admin/dashboard":includesAny(userType,["sales_employee"])?"/sale/myjobdesk":includesAny(userType,["accounts_employee"])?"/main/db/propertystatus":includesAny(userType,["site_worker"])?"/constructor/searchapplicant":includesAny(userType,["normal_user"])?"/ticket/raising":""}/>}/>
              <Route exact path='/register' element={!user?<Register/>:<Navigate to={includesAny(userType,["admin"])?"/admin/dashboard":includesAny(userType,["sales_employee"])?"/sale/myjobdesk":includesAny(userType,["accounts_employee"])?"/main/db/propertystatus":includesAny(userType,["site_worker"])?"/constructor/searchapplicant":includesAny(userType,["normal_user"])?"/ticket/raising":""}/>}/>
            </Routes>
            </Suspense>
          </div>:<div className={`flex h-screen overflow-hidden`}>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
        {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
      
        <main>
          <div className="px-1 sm:px-2 lg:px-4 py-4 w-full h-screen">
          {/* <ScrollToTop smooth color="#6f00ff" /> */}
      
            {includesAny(userType,["admin"])?<Routes>
                <Route exact path='/admin/leadsreport' element={user?<LeadsReport/>:<Navigate to={'/login'}/>}/>
                <Route exact path='/admin/agentsreport/agent' element={user?<AgentReportSingle/>:<Navigate to={'/login'}/>}/>
                <Route exact path='/admin/performancereport' element={user?<PerformanceReport/>:<Navigate to={'/login'}/>}/>
                <Route exact path='/admin/compareagents' element={user?<CompareAgents/>:<Navigate to={'/login'}/>}/>
                <Route exact path='/admin/comparesource' element={user?<CompareSource/>:<Navigate to={'/login'}/>}/>  
            </Routes>:null}
      
            {includesAny(userType,["admin","sales_employee"])?<Routes>
            <Route exact path='/sale/myjobdesk' element={user?<MyJobDesk/>:<Navigate to={'/login'}/>}/>    
            </Routes>:''}    
      
            <Suspense fallback={<Spinner/>}>   
            <Routes>
            {/* <Route exact path='/login' element={<Login/>}/> */}
              {/* <Route exact path="/" element={<Dashboard />} /> */}
              {/* <Route exact path='/dashboard' element={user?<Home/>:<Navigate to={'/login'}/>}/> */}
              <Route exact path='/ddr' element={<DataDR/>}/>
              <Route exact path='/contactus' element={<ContactUs/>}/>
              <Route exact path='/profile' element={user?<ShowProfile/>:<Navigate to={'/login'}/>}/>
              {/* Sales */}
              {includesAny(userType,["admin","sales_employee"])?<>
               <Route exact path='/sale/addnewlead' element={user?<AddNewLead/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/viewleads' element={user?<ViewLeads/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/viewdumpleads' element={user?<DumpData/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/viewprimeleads' element={user?<ViewPrimeLead/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/client/:id' element={user?<LeadProfile/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/editclient' element={user?<EditLeadProfile/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/adddiscussion' element={user?<AddDiscussion/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/sitevisit' element={user?<SiteVisit/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/corporatevisits' element={user?<CorporateVisitSale/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/wmessage' element={user?<WhatsappMessage/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/festivalpost' element={user?<FestivalPost/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/sale/emessage' element={user?<EmailMessage/>:<Navigate to={'/login'}/>}/></>:''}
              {/* </>:''} */}
      
              {/* Accounts */}
              {includesAny(userType,["admin","accounts_employee"])?<><Route exact path='/main/db/propertystatus' element={user?<PropertyStatus/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/db/addbookingform' element={user?<AddBookingForm/>:<Navigate to={'/login'}/>}>
                <Route exact path='projectdetails' element={user?<AddBookingFormProjectDetails/>:<Navigate to={'/login'}/>}/>
                <Route exact path='personaldetails' element={user?<AddBookingFormPersonalDetails/>:<Navigate to={'/login'}/>}/>
                <Route exact path='co-applicantdetails' element={user?<AddBookingFormCoApplicantDetails/>:<Navigate to={'/login'}/>}/>
              </Route>
              <Route exact path='/main/db/viewbookingform' element={user?<ViewBookingForm/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/db/editbookingcostform' element={user?<EditBookingCostForm/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/bf/editbookingform' element={user?<EditBookingForm/>:<Navigate to={'/login'}/>}>
                <Route exact path='searchapplicant' element={user?<SearchApplicantBookingForm/>:<Navigate to={'/login'}/>}/>
                <Route exact path='projectdetails' element={user?<EditBookingFormProjectDetails/>:<Navigate to={'/login'}/>}/>
                <Route exact path='personaldetails' element={user?<EditBookingFormPersonalDetails/>:<Navigate to={'/login'}/>}/>
                <Route exact path='co-applicantdetails' element={user?<EditBookingFormCoApplicantDetails/>:<Navigate to={'/login'}/>}/>
                <Route exact path='printform' element={user?<PrintBookingForm/>:<Navigate to={'/login'}/>}/>
                <Route exact path='printviewbookingcostform' element={user?<PrintViewBookingForm/>:<Navigate to={'/login'}/>}/>
              </Route>
              
              <Route exact path='/main/payment/searchapplicant' element={user?<SearchApplicant/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/payment/addpaymentstages' element={user?<AddPaymentStages/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/payment/viewpaymentstages' element={user?<ViewPaymentStages/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/payment/editpaymentstages' element={user?<EditPaymentStage/>:<Navigate to={'/login'}/>}/>
      
      
              <Route exact path='/main/demandletter/adddemandletter' element={user?<AddDemandLetter/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/demandletter/viewdemandletter' element={user?<ViewDemandLetter/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/demandletter/searchapplicant' element={user?<SearchApplicantDemandLetter/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/demandletter/listofstage' element={user?<ListOfStage/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/demandletter/generatedemandletter' element={user?<GenerateDemandLetter/>:<Navigate to={'/login'}/>}/>
      
              <Route exact path='/main/documentation/searchapplicant' element={user?<SearchApplicantDocumentation/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/allotmentletter' element={user?<AllotmentLetter/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/allotmentletter2' element={user?<AllotmentLetter2/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/tcpletter' element={user?<TCPLetter/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/noc' element={user?<NOC/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/sbi' element={user?<SBI/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/racpcsbi' element={user?<RACPCSBI/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/hdfc' element={user?<HDFC/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/axis' element={user?<Axis/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/canara' element={user?<Canara/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/pnb' element={user?<PNB/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/hdfc' element={user?<HDFC/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/lic' element={user?<LIC/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/possessionletter' element={user?<PossessionLetter/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/documentation/upload' element={user?<UploadDocument/>:<Navigate to={'/login'}/>}/>
      
              <Route exact path='/main/billing/addbillingreceipt' element={user?<AddBillingReceipt/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/billing/editbillingreceipt' element={user?<EditBillingReceipt/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/billing/searchapplicant' element={user?<SearchApplicantBilling/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/billing/viewbillingreceipt' element={user?<ViewBillingReceipt/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/billing/viewbillingreceiptacc' element={user?<ViewBillingRecieptUser/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/billing/printbillingreceipt' element={user?<PrintBillingReceipt/>:<Navigate to={'/login'}/>}/>
      
              <Route exact path='/main/clientloanfile/searchapplicant' element={user?<SearchApplicantLoan/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/main/clientloanfile/bankinformation' element={user?<ApplicantBankInformation/>:<Navigate to={'/login'}/>}/>
      
              <Route exact path='/main/projectdocument' element={user?<ProjectDocument/>:<Navigate to={'/login'}/>}/>
      
              <Route exact path='/asset/faq' element={user?<Faq/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/accountreport' element={user?<AccountReport/>:<Navigate to={'/login'}/>}/>
              </>:''}
              {/* New Corporate Visit */}
              <Route exact path='/agentsitevisit' element={user?<SiteVisitLeads/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/newcorporatevisits' element={user?<AddNewLeadCorporateVist/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/newsitevisits' element={user?<AddNewLeadSiteVist/>:<Navigate to={'/login'}/>}/>
              {/* Admin */}
              {includesAny(userType,["admin"])?<>
                <Route exact path='/admin/dashboard' element={user?<Dashboard/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/dashboarddetails' element={user?<DashboardDetails/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/viewleads' element={user?<ViewLeadsAdmin/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/dumpleads' element={user?<DumpLeadsAdmin/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/sitevisits' element={user?<SiteVisitAdmin/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/corporatevisits' element={user?<CorporateVisit/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/delayedleads' element={user?<DelayedLeads/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/agentmanagement' element={user?<AgentManagement/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/leadprofile' element={user?<LeadProfileAdmin/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/editprofile' element={user?<EditLeads/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/agentsreport' element={user?<AgentsReport/>:<Navigate to={'/login'}/>}/>
              
      
              <Route exact path='/admin/subleadsource' element={user?<SubLeadReport/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/transferleads' element={user?<TransferDumpLeads/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/accountreport' element={user?<AccountReport/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/tickets' element={user?<AdminTickets/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/admin/viewticket' element={user?<AdminTicketUpdate/>:<Navigate to={'/login'}/>}/>
      
              {/* Super Admin Section */}
              <Route exact path='/superadmin/project' element={user?<AllProject/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/project/de' element={user?<SingleProject/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/type' element={user?<AllProjectType/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/type/de' element={user?<SingleProjectType/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/phase' element={user?<AllProjectPhase/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/phase/de' element={user?<SingleProjectPhase/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/unitnumber' element={user?<AllUnitNumber/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/unitnumber/de' element={user?<SingleUnitNumber/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/booking' element={user?<AllBooking/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/booking/de' element={user?<SingleBooking/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/personaldetails' element={user?<AllPersonalDetail/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/personaldetails/de' element={user?<SinglePersonalDetail/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/coapplicantdetail' element={user?<AllCoApplicantDetail/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/coapplicantdetail/de' element={user?<SingleCoApplicantDetail/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/paymentstage' element={user?<AllPaymentStage/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/paymentstage/de' element={user?<SinglePaymentStage/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/billreceipt' element={user?<AllBillReceipt/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/billreceipt/de' element={user?<SingleBillReceipt/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/demandletter' element={user?<AllDemandLetter/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/demandletter/de' element={user?<SingleDemandLetter/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/bank' element={user?<AllBank/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/bank/de' element={user?<SingleBank/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/paymentmode' element={user?<AllModeOfPayment/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/paymentmode/de' element={user?<SingleModeOfPayment/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/clientloan' element={user?<AllClientLoan/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/clientloan/de' element={user?<SingleClientLoan/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/festival' element={user?<AllFestival/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/festival/de' element={user?<SingleFestival/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/faq' element={user?<AllFAQ/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/faq/de' element={user?<SingleFAQ/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/leadsource' element={user?<AllLeadSource/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/leadsource/de' element={user?<SingleLeadSource/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/leadsubsource' element={user?<AllLeadSourceSub/>:<Navigate to={'/login'}/>}/>
              <Route exact path='/superadmin/leadsubsource/de' element={user?<SingleLeadSourceSub/>:<Navigate to={'/login'}/>}/>
              </>:''}
            
      
          {includesAny(userType,["admin","site_worker"])? <>
            <Route exact path='/constructor/searchapplicant' element={user?<SearchApplicantWorker/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/searchconstructor' element={user?<SearchConstructor/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/constructor' element={user?<AddEditConstructor/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/constructor/profile' element={user?<ConstructorProfile/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/constructor/stage' element={user?<ConstructorStageUpdate/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/constructor/remark' element={user?<ConstructorRemark/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/constructor/miscellaneous' element={user?<ConstructorMiscellaneous/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/constructor/bills' element={user?<ConstructorBills/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/constructor/prevbills' element={user?<ConstructorPreviousBills/>:<Navigate to={'/login'}/>}/>
            <Route exact path='/constructor/constructor/unit' element={user?<ConstructorEditUnit/>:<Navigate to={'/login'}/>}/>
            
          </>:''}
      
          <Route exact path='/ticket/raising' element={user?<TicketRaiseing/>:<Navigate to={'/login'}/>}/>
            {/* {execpUser.email=='sureshsirci@gmail.com'&&<Route exact path='/admin/accountreport' element={user?<AccountReport/>:<Navigate to={'/login'}/>}/>} */}
            </Routes>
            </Suspense>
            {/* </div> */}
      
          </div>
        </main>
      
        {/* <Banner /> */}
      
      </div>
      </div>}
      <ScrollToTop/>
        <Toaster
          position="top-right"
          richColors
        />
          </>
  );
}

export default App;