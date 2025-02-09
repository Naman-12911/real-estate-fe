import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Heading from "../../components/Heading";
import SingleInput from "../../components/SingleInput";
import SingleSelectInput from "../../components/SingleSelectInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Axios from "../../Axios";
import { toast } from "sonner";
// import SubHeading from '../../components/SubHeading';
import SingleTextArea from "../../components/SingleTextArea";
import { getNotificationPush } from "../../app/GetNotification";
import SingleDateInput from "../../components/SingleDateInput";

export default function AddDiscussion() {
  const accessToken = useSelector((state) => state.user.user);
  const currentUser=JSON.parse(localStorage.getItem('user'));
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { state } = useLocation();

  const [mode, setMode] = useState("");
  // const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [statusoflead, setStatusoflead] = useState("");
  const [statusofLeadName,setStatusofLeadName]=useState('')
  const [feedback, setFeedback] = useState("");
  const [nextScheduleDate, setNextScheduleDate] = useState(null);
  const [nextScheduleMode, setNextScheduleMode] = useState("");
  const [hotcoldwarm, setHotColdWarm] = useState("");
  const [siteVistDate, setSiteVistDate] = useState();
  const [visitedBy, setVisitedBy] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [project, setProject] = useState("");
  const [squareFit, setSquareFit] = useState("");
  const [dateOfBooking, setDateOfBooking] = useState();
  const [reasonOfSiteVisit, setReasonOfSiteVisit] = useState("");
  const [visitNumber, setVisitNumber] = useState('');
  const [alreadyPurchased, setAlreadyPurchased] = useState("");


  const [reasonOfSiteVisitData, setReasonOfSiteVisitData] = useState([]);
  const [projectData, setProjectData] = useState();
  const [modeData, setModeData] = useState([]);
  const [statusLeadData, setStatusLeadData] = useState([]);
  const [feedbAckData, setFeedbAckData] = useState([]);
  const [visitedByData, setVisitedByData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Projects
    Axios.get("/misc/project/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.project_name,
          value: item.id,
        }));
        setProjectData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Mode
    Axios.get("/social/mode-lead/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        const data = res.data.map((item) => ({
          label: item.mode_lead,
          value: item.id,
        }));
        setModeData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    //Lead Status
    Axios.get("/social/status-lead/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        // const data = res.data.map((item) => ({
        //   label: item.status_lead,
        //   value: item.id,
        // }));
        const data = res.data
          .filter(item => item.status_lead !== 'Site Visit')
          .map(item => ({
            label: item.status_lead,
            value: item.id,
          }));
        // console.log(data);
        setStatusLeadData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });


    //Reason of Site Visit
    Axios.get("/social/reason-site-visit/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        const data = res.data.map((item) => ({
          label: item.reason_of_site_visit,
          value: item.id,
        }));
        setReasonOfSiteVisitData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    //All User
    Axios.get("/account/all-users/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        const data = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setVisitedByData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);


  useEffect(()=>{
    //Feedback
    Axios.get(`/social/reason/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        const data = res.data.map((item) => ({
          label: item.reason_of_dump,
          value: item.id,
        }));
        setFeedbAckData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },[statusofLeadName])

const handleCheck=()=>{
    if(!mode){
      toast.error('Mode not selected');
    }
    else if(!statusoflead){
      toast.error('Status of lead not selected');
    }
    else if(!feedback){
      toast.error('Reason not selected');
    }

    else if(!description){
      toast.error('Description not filled');
    }
    else if(statusofLeadName=='Booked'){
      if(feedback==2096){
        if(!project){
          toast.error('Project not selected');
        }
        else if(!squareFit){
          toast.error('Square feet not filled');
        }
        else if(!dateOfBooking){
          toast.error('Date of booking not selected');
        }
        else{
          handleSubmit();
        }
      }
    }
    else if(statusofLeadName=='Booked at Other Location'){
      if(!alreadyPurchased){
            toast.error('Purchased Location not filled');
          }
          else{
            handleSubmit();
          }
    }
    else if(statusofLeadName=='Site Visit'||statusofLeadName=='Re-Visit'){
      if(!visitNumber){
        toast.error('Site visit number not filled');
      }
      else if(!siteVistDate){
        toast.error('Date of site visit not selected');
      }
      else if(!nextScheduleDate||!nextScheduleMode){
        toast.error('Next Schedule Date / Mode not selected');
      }
      else{
        handleSubmit();
      }
    }
    else if(statusofLeadName=='Dump'){
          handleSubmit();
    }
    else if(!hotcoldwarm){
      toast.error('HOT/WARM/COLD not selected');
    }
    else if(!nextScheduleDate||!nextScheduleMode){
      toast.error('Next Schedule Date / Mode not selected');
    }
    else{
      handleSubmit();
    }
}

useEffect(()=>{
  if(mode==10||mode==11){
    setVisitNumber(1);
    //Site Visit Count
    Axios.get(`/social/site-visit-count/?fb_lead_id=${state.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setVisitNumber(res.data.next_site_visit_count);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

},[mode])

  const handleSubmit = () => {

    setLoading(true);

    const data = {
      fb_leads: state.id,
      mode: mode,
      feedback: feedback,
      description: description,
      status_of_lead: statusoflead,
      next_schedule_date: nextScheduleDate,
      next_schedule_mode: nextScheduleMode,
      status_of_lead_warm_hot_cold: hotcoldwarm,
      visit_date:(mode==10||mode==11)? formattedDate:null,
      visited_by:(mode==10||mode==11)?currentUser.id:null,
      mobile_number:statusofLeadName=='Booked'?phoneNumber:null,
      project:statusofLeadName=='Booked'?project:null,
      square_fit:statusofLeadName=='Booked'?squareFit:null,
      date_of_booking:statusofLeadName=='Booked'?dateOfBooking:null,
      reason_for_site_visit: reasonOfSiteVisit,
      visit_number:(mode==10||mode==11)?visitNumber:null,
      site_visit:(mode==10||mode==11)?true:false,
      site_visit_to:(mode==10||mode==11)?currentUser.id:null,
      purchased_location:feedback==2376?alreadyPurchased:null,
    };

    Axios.post("/social/lead-edit/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message);
        dispatch(getNotificationPush())
        navigate(-1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(
          <ul>
            {Object.entries(err.response.data).map(
              ([fieldName, fieldErrors]) => (
                <li key={fieldName}>
                  <strong>{fieldName}:</strong>
                  <ul>
                    {fieldErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </li>
              )
            )}
          </ul>
        );
        setLoading(false);
      });
  };

  useEffect(()=>{
    const selectedStatus = statusLeadData && statusLeadData.find(item=>item.value==statusoflead)
    //  console.log(selectedStatus)
    if(selectedStatus){
      setStatusofLeadName(selectedStatus.label)
    }
  },[statusoflead,statusLeadData])

  const [filteredFeedbackData, setFilteredFeedbackData] = useState([]);

  const feedbackMapping = {
    "Good Lead": ["Positive response by customer","Whenever they wants to visit, they will call me"],
    "Poor Lead": ["Budget Issue","Distance issue","Not looking for kolar","Not Present in City","Repeat Lead","Feedback not given"],
    "In Process": ["Details Shared","Call Back","Not Present in City"],
    "Call Not Received": ["Call not connect","Cut the call"],
    "Dump": ["Not interested","Didn't did any enquiry","Fake","Wrong Number"],
    "Booked": ["Booked"],
    "Booked at Other Location":["Purchase at Other Location"]
    // "Site Visit": ["Site Visit","Re-Visit"],   
  };
  
  const filterFeedbackData = (statusofLeadName) => {
    const selectedReasons = feedbackMapping[statusofLeadName] || [];
    const filteredData = feedbAckData.filter(item => selectedReasons.includes(item.label));
    return filteredData;
  };

  useEffect(() => {
    if (statusofLeadName) {
      const data = filterFeedbackData(statusofLeadName);
      setFilteredFeedbackData(data);
    }
  }, [statusofLeadName]);


  // console.log(nextScheduleDate);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Heading title={"Add Discussion"} />
      
<div className="py-3 w-full  mx-auto space-y-5">
	  <div className="flex justify-end  items-end gap-5 xl:flex-row flex-col">
	  <Button
            title={"Back"}
            onClick={()=>navigate(-1)}
          />
	  </div>
	  </div>
      <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Add Discussion
          </h2>
        </header>
        <div className="p-4 w-full   mx-auto">
          <div className="flex justify-center items-center space-y-12 flex-col w-full">
            <div className="flex items-center flex-col md:flex-row justify-evenly flex-wrap gap-5 w-full">
              <div className="p-4 w-full   mx-auto flex items-start gap-10 justify-evenly flex-wrap flex-col">
                <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
                  <div className="md:w-2/5 w-full">
                    <SingleSelectInput
                      label={"Mode"}
                      value={mode}
                      placeholder={"Select Mode"}
                      onChange={setMode}
                      option={modeData}
                    />
                  </div>
                  <div className="md:w-2/5 w-full">
                    <SingleSelectInput
                      label={"Status of Lead"}
                      placeholder={"Select Status"}
                      value={statusoflead}
                      onChange={setStatusoflead}
                      option={statusLeadData}
                    />
                  </div>
                  <div className="md:w-2/5 w-full">
                    <SingleSelectInput
                      label={"Reason"}
                      placeholder={"Select Reason"}
                      value={feedback}
                      onChange={setFeedback}
                      option={filteredFeedbackData}
                    />
                  </div>
                  {(statusofLeadName!='Booked'&&statusofLeadName!="Booked at Other Location"&&statusofLeadName!='Dump')?<div className="md:w-2/5 w-full">
                    <SingleSelectInput
                      label={"HOT / WARM / COLD"}
                      placeholder={"Select Status of Lead"}
                      value={hotcoldwarm}
                      onChange={setHotColdWarm}
                      option={[
                        { label: "Hot", value: "Hot" },
                        { label: "Warm", value: "Warm" },
                        { label: "Cold", value: "Cold" },
                      ]}
                    />
                  </div>:''}
                </div>
               {/* {feedback==2376&&} */}
                <div className="w-full">
                    <SingleTextArea
                      label={"Feedback"}
                      placeholder={"Enter Feedback"}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
                {(mode==10||mode==11)?<><div className="md:w-2/5 w-full">
                    <SingleInput
                      label={"Site Visit Number"}
                      value={visitNumber}
                      onChange={(e) => setVisitNumber(e.target.value)}
                      isDisable={true}
                    />
                  </div>
                  {/* <div className="md:w-2/5 w-full">
                    <SingleInput
                      label={"Site Vist Date"}
                      value={siteVistDate}
                      type={"date"}
                      onChange={(e) => setSiteVistDate(e.target.value)}
                    />
                  </div> */}
                  </>:''}
                  </div>
                  <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
                  {(statusofLeadName=='Booked'&&feedback==2096)?<div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
                  <div className="md:w-2/5 w-full">
                    <SingleSelectInput
                      option={projectData || []}
                      label={"Project"}
                      placeholder={"Select Project"}
                      value={project}
                      onChange={setProject}
                    />
                  </div>
                  <div className="md:w-2/5 w-full">
                    <SingleInput
                      label={"Square Feet"}
                      placeholder={"Enter Square Feet"}
                      value={squareFit}
                      type={"number"}
                      onChange={(e) => setSquareFit(e.target.value)}
                    />
                  </div>
                  <div className="md:w-2/5 w-full">
                    <SingleDateInput
                      label={"Date Of Booking"}
                      value={dateOfBooking}
                      type={"date"}
                      onChange={setDateOfBooking}
                    />
                  </div>
                </div>:''}
                {(statusofLeadName=='Booked at Other Location'&&feedback==2376)?<div className="w-full">
                    <SingleInput
                      label={"Purchased Location"}
                      placeholder={"Enter Purchased Location"}
                      value={alreadyPurchased}
                      onChange={(e) => setAlreadyPurchased(e.target.value)}
                    />
                  </div>:''}
                </div>
                {!(statusofLeadName=="Booked"||statusofLeadName=="Booked at Other Location"||statusofLeadName=='Dump')?<div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
                <div className="md:w-2/5 w-full">
                    <SingleDateInput
                      label={"Next Schedule Date"}
                      type={"date"}
                      placeholder={"Next Schedule Date"}
                      value={nextScheduleDate}
                      onChange={setNextScheduleDate}
                      minDate={'today'}
                    />
                  </div>
                  <div className="md:w-2/5 w-full">
                    <SingleSelectInput
                      label={"Next Schedule Mode"}
                      placeholder={"Select Mode"}
                      value={nextScheduleMode}
                      onChange={setNextScheduleMode}
                      option={modeData}
                    />
                  </div>
                  </div>:''}
              </div>
            </div>
            <Button title={"Submit"} onClick={handleCheck} />
          </div>
        </div>
      </div>
    </div>
  );
}
