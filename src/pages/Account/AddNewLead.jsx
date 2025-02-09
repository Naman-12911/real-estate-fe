import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
// import NewLead from "../../components/NewLead";
import SingleInput from "../../components/SingleInput";
import Button from "../../components/Button";
import Axios from "../../Axios";
import { useDispatch, useSelector } from "react-redux";
import SingleSelectInput from "../../components/SingleSelectInput";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import MultiSelectInput from "../../components/MultiSelectInput";
// import { copyWithStructuralSharing } from "@reduxjs/toolkit/query";
import { getNotificationPush } from "../../app/GetNotification";
import SingleDateInput from "../../components/SingleDateInput";
import moment from "moment";


export default function AddNewLead() {
  const accessToken = useSelector((state) => state.user.user);
  const currentUser=JSON.parse(localStorage.getItem('user'));
  const dispatch=useDispatch();
  // console.log(currentUser.name)
  const navigate = useNavigate();

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  const [enquiryDate, setEnquiryDate] = useState(currentDate);
  const [project, setProject] = useState("");
  const [phase, setPhase] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [budget, setBudget] = useState("");
  const [feedback, setFeedback] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [leadSourceSub, setLeadSourceSub] = useState("");
  const [refName,setRefName]=useState('');

  const [source, setSource] = useState("");
  const [occupation, setOccupation] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [corporateVisit, setCorporateVisit] = useState("");
  const [fbID,setFbID]=useState('');
  const [corporateVisitPatch, setCorporateVisitPatch] = useState(false);

  const [projectData, setProjectData] = useState([]);
  const [phaseData, setPhaseData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [leadSourceData, setLeadSourceData] = useState([]);
  const [leadSourceSubData, setLeadSourceSubData] = useState([]);

  const [selectProjectInput,setSelectProjectInput]=useState('');
  const [projectArray,setProjectArray]=useState([]);

  const [selectProjectTypeInput,setSelectProjectTypeInput]=useState('');
  const [projectTypeArray,setProjectTypeArray]=useState([]);

  const [preferredLocationData, setPreferredLocationData] = useState([]);
  const [preferredLocationOther,setPreferredLocationOther]=useState('');

  const [userData,setUserData]=useState('');
  const [assignedUser,setAssignedUser]=useState('');

  const [gotData,setGotData]=useState(false);
  const [isDump,setIsDump]=useState(false);
  const [isDifferentUser,setIsDifferentUser]=useState(false);



  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Projects
    Axios.get("/misc/project/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res)
        const data = res.data.map((item) => ({
          label: item.project_name.replace(/_/g, ' '),
          value: item.id,
        }));
        // console.log(data);
        setProjectData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Types
    Axios.get(`/misc/project-type-filter/?project_id=${projectArray.join(',')}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.property_type.replace(/_/g, ' '),
          value: item.id,
        }));
        setTypeData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Phase
    Axios.get(`/misc/phase-project-filter/${project}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        const data = res.data.map((item) => ({
          label: item.phase_name.replace(/_/g, ' '),
          value: item.id,
        }));
        setPhaseData(data);
        // console.log(phaseData)
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  }, [project,projectArray]);

  useEffect(() => {
    //Budget
    Axios.get("/social/budget/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.max_budget.replace(/_/g, ' '),
          value: item.id,
        }));
        setBudgetData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    //Feedback
    Axios.get("/social/reason/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.reason_of_dump.replace(/_/g, ' '),
          value: item.reason_of_dump.replace(/_/g, ' '),
        }));
        setFeedbackData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    //Lead Source
    Axios.get("social/medium-lead/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.medium.replace(/_/g, ' '),
          value: item.id,
        }));
        // console.log(data);
        setLeadSourceData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    //Location
    Axios.get("/social/prefred-location/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.preferred_location.replace(/_/g, ' '),
          value: item.id,
        }));
        setPreferredLocationData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

    useEffect(()=>{
          //Lead Source Type
          Axios.get(`/social/lead-source/filter/?medium_of_lead=${leadSource}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => {
              // console.log(res.data)
              const data = res.data.map((item) => ({
                label: item.lead_source.replace(/_/g, ' '),
                value: item.id,
              }));
              setLeadSourceSubData(data);
            })
            .catch((err) => {
              console.log(err.response.data);
            });
  },[leadSource])

  useEffect(()=>{
    //Lead Source Type
    Axios.get(`/account/all-users/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setUserData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
},[])
  
  useEffect(() => {
    // if (corporateVisit === "true") {
      setCorporateVisitPatch(false);
      setGotData(false)
      //   console.log("sd");
      Axios.get(
        `/social/fb-lead/filter/phone-number/?phone_number=${mobileNo}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((res) => {
          // console.log(res.data);
          if (res.status == 200) {
            // toast.success('Lead Found')
            if (res.data.length == 1) {
              setEnquiryDate(moment(new Date(res?.data[0]?.CalledOn)).format("YYYY-MM-DD"))
              setProject(res.data[0].project_name);
              setType(res.data[0].project_type_name);
              setName(res.data[0].full_name);
              setBudget(res.data[0].budget);
              setFeedback(res.data[0].feedback);
              setAddress(res.data[0].address);
              setCity(res.data[0].city);
              setLeadSourceSub(res.data[0].lead_source)
              setLeadSource(res.data[0].by_medium);
              setOccupation(res.data[0].occupation);
              setPreferredLocation(res.data[0].preferred_location);
              setPreferredLocationOther(res.data[0].preferred_location_other)
              setFeedback(res.data[0].reason_of_dump)
              setRefName(res.data[0].customer_ref_name)
			        setFbID(res.data[0].id);
              setAssignedUser(res.data[0].assigned_to_name)
              setGotData(true);
              if(currentUser.id==res.data[0].assigned_to){
                // console.log('working=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                setIsDifferentUser(false)
                  if(res?.data[0].dump_lead){
                    setIsDump(true);
                  }
                  else{
                    setIsDump(false);
                  }
              }
              else{
                setIsDifferentUser(true)
                  if(res?.data[0].dump_lead){
                    setIsDump(true);
                  }
                  else{
                    setIsDump(false);
                  }
              }

              
            }
            else{
              toast.error(`You cannot fill this form as multiple Leads Found with ${mobileNo}.`,{
                duration:8000
              })
              setGotData(false)
              setEnquiryDate('')
              setProject('');
              setType('');
              setName('');
              setBudget('');
              setFeedback('');
              setAddress('');
              setCity('');
              setLeadSourceSub('')
              setLeadSource('');
              setOccupation('');
              setPreferredLocation('');
              setFbID('');
              setCorporateVisitPatch(false);
              setAssignedUser('')
              setPreferredLocationOther('')
              setSelectProjectInput('')
              setSelectProjectTypeInput('')
              setRefName('')
            }
          }
          
        })
        .catch((err) => {
          // console.log(err.response.data);
        });
    // }
  }, [mobileNo, corporateVisit]);

  const handleSubmit = () => {
    if(!projectArray||!projectTypeArray){
      toast.error('Project or Project Type not selected')
    }
    else{
      setLoading(true);
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      let request;
        const data = {
          enquiry_date: enquiryDate,
          project_name: projectArray,
          phase_name: phase,
          project_type_name: projectTypeArray,
          address: address,
          occupation: occupation,
          preferred_location: preferredLocation,
          feedback: feedback,
          budget: budget,
          full_name: name,
          phone_number: mobileNo,
          city,
          lead_source:parseInt(leadSourceSub),
          by_medium:parseInt(leadSource),
          preferred_location_other:preferredLocationOther,
          customer_ref_name:refName
          }
          
          if(isDump || !gotData){
           request = Axios.post("/social/fb/", data, axiosConfig)
          }
          else if(!isDifferentUser){
           request = Axios.patch(`/social/fb/${fbID}/`, data, axiosConfig)
          }
      
      request.then((res) => {
            // console.log(res.data);
            toast.success(res.data.message);
            dispatch(getNotificationPush())
            navigate("/sale/viewleads");
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
          });
	    }
  };

// const values =selectProjectInput && selectProjectInput.map(item => item.value);
// console.log(values)

useEffect(()=>{
  if(selectProjectInput){
    const data=selectProjectInput && selectProjectInput.map(item => item.value);
    setProjectArray(data);
  }
},[selectProjectInput])

useEffect(()=>{
  if(selectProjectTypeInput){
    const data=selectProjectTypeInput&& selectProjectTypeInput.map(item => item.value);
    setProjectTypeArray(data);
  }
},[selectProjectTypeInput])

useEffect(()=>{
  if(project){
    const newData=projectData?.filter(element => project.includes(element.value));
    if(newData){
      setSelectProjectInput(newData);
    }
  }
},[project])

useEffect(()=>{
  if(type){
    const newData=typeData?.filter(element => type.includes(element.value));
    if(newData){
      setSelectProjectTypeInput(newData);
    }
  }
},[type])

// console.log('=>>>>>>> ',projectArray)
// console.log('=>>>>>>> ',projectTypeArray)


const handleClear=()=>{
  setGotData(false);
  setIsDump(false);
  setEnquiryDate('')
  setSelectProjectInput('')
  setSelectProjectTypeInput('')
  setProject('');
  setType('');
  setName('');
  setBudget('');
  setFeedback('');
  setAddress('');
  setCity('');
  setLeadSourceSub('')
  setLeadSource('');
  setOccupation('');
  setPreferredLocation('');
  setFbID('');
  setCorporateVisitPatch(false);
  setAssignedUser('')
  setPreferredLocationOther('')
  setRefName('')
}


  return (
    <div>
      <Heading title={"New Lead"} />
      <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Add New Leads
          </h2>
        </header>
        <div className="p-8 w-full   mx-auto">
          <div className="flex justify-center items-center space-y-12 flex-col">
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
          <div className="md:w-2/5 w-full">
               <SingleInput
                  label={"Phone Number"}
                  placeholder={"Enter your Mobile No."}
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value.slice(0,10))}
                      type={"number"}
                />
          </div>
          <div className="md:w-2/5 w-full">
                    <SingleDateInput
                    label={"Enquiry Date"}
                    value={enquiryDate}
                    placeholder={'Select Enquiry Date'}
                    onChange={setEnquiryDate}
                    // isDisable={gotData}
                    />
                  </div>
                  <div className="md:w-2/5 w-full">
                      <SingleInput
                        label={"Assigned Agent"}
                        placeholder={"Enter Assigned User"}
                        value={assignedUser}
                        onChange={(e) => setAssignedUser(e.target.value)}
                        isDisable={true}
                      />
                  </div>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">

          <div className="md:w-1/2 w-full">
                    
                    <MultiSelectInput isDisable={!isDump&&isDifferentUser} option={projectData} setChange={setSelectProjectInput} defaultValue={selectProjectInput}  label={'Project'}/>
                  </div>

                  <div className="md:w-1/2 w-full">
                      <MultiSelectInput isDisable={!isDump&&isDifferentUser} option={typeData} setChange={setSelectProjectTypeInput} defaultValue={selectProjectTypeInput} label={'Type'}/>
                  </div>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">

          <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Name"}
                  placeholder={"Enter your Name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isDisable={!isDump&&isDifferentUser}
                />
              </div>

              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Occupation"}
                  placeholder={"Enter your Occupation"}
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  isDisable={!isDump&&isDifferentUser}
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleSelectInput
                  label={"Budget"}
                  option={budgetData || []}
                  placeholder={"Select Budget"}
                  value={budget}
                  onChange={setBudget}
                  options={budgetData}
                  isDisable={!isDump&&isDifferentUser}
                />
              </div>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
            <div className="md:w-2/5 w-full">
                <SingleSelectInput
                  label={"Feedback"}
                  option={feedbackData || []}
                  placeholder={"Select Feedback"}
                  value={feedback}
                  onChange={setFeedback}
                  options={feedbackData}
                  isDisable={!isDump&&isDifferentUser}
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Address"}
                  placeholder={"Enter your Address"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  isDisable={!isDump&&isDifferentUser}
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"City"}
                  placeholder={"Enter your City"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  isDisable={!isDump&&isDifferentUser}
                />
              </div>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
          <div className="md:w-1/2 w-full">
                  <SingleSelectInput
                    label={"Lead Source"}
                    placeholder={"Select Lead Source"}
                    value={leadSource}
                    onChange={setLeadSource}
                    option={leadSourceData}
                    isDisable={!isDump&&isDifferentUser}
                  />
          </div>
          <div className="md:w-1/2 w-full">
                  <SingleSelectInput
                    label={"Lead Source Category"}
                    option={leadSourceSubData}
                    placeholder={"Select Lead Source"}
                    value={leadSourceSub}
                    onChange={setLeadSourceSub}
                    isDisable={!isDump&&isDifferentUser}
                  />
                </div>
                {leadSourceSub==2032&&<div className="md:w-1/2 w-full">
                  <SingleInput
                    label={"Reference Name"}
                    placeholder={"Enter Reference Name"}
                    value={refName}
                    onChange={(e)=>setRefName(e.target.value)}
                    isDisable={!isDump&&isDifferentUser}
                  />
                </div>}
          </div>              
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
          <div className="md:w-1/2 w-full">
                    <SingleSelectInput
                      label={"Preferred Location"}
                      placeholder={"Select Preferred Location"}
                      value={preferredLocation}
                      onChange={setPreferredLocation}
                      option={preferredLocationData}
                      isDisable={!isDump&&isDifferentUser}
                    />
                  </div>
                  <div className="md:w-1/2 w-full">
                    {preferredLocation==1701&&<SingleInput
                      label={"Preferred Other Location"}
                      placeholder={"Enter Preferred Other Location"}
                      value={preferredLocationOther}
                      onChange={(e) => setPreferredLocationOther(e.target.value)}
                      isDisable={!isDump&&isDifferentUser}
                    />}
                  </div>

          </div>
              
              
              <div className="w-full flex items-center justify-center mt-5 flex-col lg:flex-row gap-5">
<Button title={'Clear Form'} onClick={handleClear}/>
              {isDump?<Button title={"Update"} onClick={handleSubmit} type={'submit'} />:isDifferentUser?<Button title={"Go Back"} onClick={()=>navigate(-1)} />:<Button title={"Submit"} onClick={handleSubmit} type={'submit'} />}
              </div>
            </div>
          </div>
        </div>
        </div>
  );
}
