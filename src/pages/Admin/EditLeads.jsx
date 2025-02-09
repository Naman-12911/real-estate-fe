import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import SingleInput from "../../components/SingleInput";
// import SingleSelectInput from "../../components/SingleSelectInput";
import Button from "../../components/Button";
import { useLocation, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "../../Axios";
import { toast } from "sonner";
import Spinner from "../../components/Spinner";
import MultiSelectInput from "../../components/MultiSelectInput";
import SingleSelectInput from "../../components/SingleSelectInput";
import SingleDateInput from "../../components/SingleDateInput";
import moment from "moment";

export default function EditLeads() {
  const { state } = useLocation();
// console.log(state);
  const accessToken = useSelector((state) => state.user.user);
  const navigate=useNavigate();

  const [enquiryDate, setEnquiryDate] = useState("");
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

  // const [source, setSource] = useState("");
  const [occupation, setOccupation] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [corporateVisit, setCorporateVisit] = useState("");
  const [fbID,setFbID]=useState(state.id);
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
  const [preferredLocationOther,setPreferredLocationOther]=useState(state.preferred_location_other);
  const [altMobileNo,setAltMobileNo]=useState("");

//   const [status, setStatus] = useState(state.status);
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
        console.log(data);
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


  const handleSubmit = () => {
    setLoading(true);
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
      alternative_number:altMobileNo,
      city,
      lead_source:parseInt(leadSourceSub),
      by_medium:parseInt(leadSource),
      preferred_location_other:preferredLocationOther,
      customer_ref_name:refName
      };
    Axios.patch(`/social/fb/${fbID}/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      })
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message);
        navigate(-1);
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
  };

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


useEffect(() => {
  // if (corporateVisit === "true") {
    // setCorporateVisitPatch(false);
    // setGotData(false)
    //   console.log("sd");
    Axios.get(
      `/social/fb-lead/filter/phone-number/?phone_number=${state.phone_number}`,
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
            setMobileNo(res.data[0].phone_number);
            setAltMobileNo(res.data[0].alternative_number)
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
            setFbID(res.data[0].id);
            setRefName(res.data[0].customer_ref_name)
          }
        }
        
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  // }
}, [mobileNo, corporateVisit]);



  return (<div>
    <Heading title={"Edit Lead"} />
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
          Edit Lead
        </h2>
      </header>
      <div className="p-8 w-full   mx-auto">
        <div className="flex justify-center items-center space-y-12 flex-col">
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
          <div className="md:w-1/3 w-full">
               <SingleInput
                  label={"Phone Number"}
                  placeholder={"Enter your Mobile No."}
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value.slice(0,10))}
                      type={"number"}
                      isDisable={true}
                />
          </div>
          <div className="md:w-1/3 w-full">
                <SingleInput
                  label={"Alternative Phone Number"}
                  placeholder={"Enter your Alternative Mobile No."}
                  value={altMobileNo}
                  onChange={(e) => setAltMobileNo(e.target.value.slice(0, 10))}
                  type={"number"}
                  // isDisable={true}
                />
              </div>
          <div className="md:w-1/3 w-full">
                    <SingleDateInput
                    label={"Enquiry Date"}
                    value={enquiryDate}
                    placeholder={'Select Enquiry Date'}
                    onChange={setEnquiryDate}
                    //  
                    />
                  </div>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">

          <div className="md:w-1/2 w-full">
                    
                    {/* <MultiSelectInput   option={projectData} setChange={setSelectProjectInput} defaultValue={selectProjectInput}  label={'Project'}/> */}
                  </div>

                  <div className="md:w-1/2 w-full">
                      {/* <MultiSelectInput   option={typeData} setChange={setSelectProjectTypeInput} defaultValue={selectProjectTypeInput} label={'Type'}/> */}
                  </div>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">

          <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Name"}
                  placeholder={"Enter your Name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  //  
                />
              </div>

              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Occupation"}
                  placeholder={"Enter your Occupation"}
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  //  
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
                  //  
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
                  //  
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Address"}
                  placeholder={"Enter your Address"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  //  
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"City"}
                  placeholder={"Enter your City"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  //  
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
                    //  
                  />
          </div>
          <div className="md:w-1/2 w-full">
                  <SingleSelectInput
                    label={"Lead Source Category"}
                    option={leadSourceSubData}
                    placeholder={"Select Lead Source"}
                    value={leadSourceSub}
                    onChange={setLeadSourceSub}
                    //  
                  />
                </div>
                {leadSourceSub==2032&&<div className="md:w-1/2 w-full">
                  <SingleInput
                    label={"Reference Name"}
                    placeholder={"Enter Reference Name"}
                    value={refName}
                    onChange={(e)=>setRefName(e.target.value)}
                    isDisable={gotData}
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
                      //  
                    />
                  </div>
                  <div className="md:w-1/2 w-full">
                    {preferredLocation==1701&&<SingleInput
                      label={"Preferred Other Location"}
                      placeholder={"Enter Preferred Other Location"}
                      value={preferredLocationOther}
                      onChange={(e) => setPreferredLocationOther(e.target.value)}
                      //  
                    />}
                  </div>

          </div>
              
              
              <div className="w-full flex items-center justify-center mt-5 flex-col lg:flex-row gap-5">
              <Button title={'Update'} onClick={handleSubmit}/>
              </div>
            </div>
      </div>
    </div>
  </div>
  );
}
