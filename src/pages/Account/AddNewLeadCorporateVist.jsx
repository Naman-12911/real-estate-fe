import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
// import NewLead from "../../components/NewLead";
import SingleInput from "../../components/SingleInput";
import Button from "../../components/Button";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import SingleSelectInput from "../../components/SingleSelectInput";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import MultiSelectInput from "../../components/MultiSelectInput";
import SingleDateInput from "../../components/SingleDateInput";

export default function AddNewLeadCorporateVist() {
  const accessToken = useSelector((state) => state.user.user);
  const currentUser=JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;

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

  const [source, setSource] = useState("");
  const [occupation, setOccupation] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [corporateVisit, setCorporateVisit] = useState("");
  const [fbID,setFbID]=useState('');
  const [corporateVisitPatch, setCorporateVisitPatch] = useState(false);
  const [corporateName, setCorporateName] = useState('');

  const [projectData, setProjectData] = useState([]);
  const [phaseData, setPhaseData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [leadSourceData, setLeadSourceData] = useState([]);
  const [leadSourceSubData, setLeadSourceSubData] = useState([]);
  const [preferredLocationData, setPreferredLocationData] = useState([]);
  const [refName,setRefName]=useState('');

  const [selectProjectInput,setSelectProjectInput]=useState('');
  const [projectArray,setProjectArray]=useState([]);

  const [selectProjectTypeInput,setSelectProjectTypeInput]=useState('');
  const [projectTypeArray,setProjectTypeArray]=useState([]);
  const [preferredLocationOther,setPreferredLocationOther]=useState('');

  const [userData,setUserData]=useState('');
  const [assignedUser,setAssignedUser]=useState('');
  const [gotData,setGotData]=useState(false);

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
          label: item.project_name,
          value: item.id,
        }));
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
          label: item.property_type,
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
          label: item.phase_name,
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
          label: item.max_budget,
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
          label: item.reason_of_dump,
          value: item.id,
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
          label: item.preferred_location,
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
      setCorporateVisitPatch(false);
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
            if (res.data.length == 1) {
              setCorporateName(res.data[0].corporate_visit_place)
              setEnquiryDate(res.data[0].CalledOn.slice(0,res.data[0].CalledOn.indexOf('T')))
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
			        setFbID(res.data[0].id);
              setCorporateVisitPatch(true);
              setRefName(res.data[0].customer_ref_name)
              const newData=userData&&userData.find(element=>element.value==res.data[0].assigned_to);
              if(newData){
                setAssignedUser(newData.label)
              }
              if(res?.data[0]?.dump_lead){
                setGotData(false)
              }
              else{
                if(currentUser.id!=res.data[0].assigned_to){
                  setGotData(true)
                }
                else{
                  setGotData(false)
                }
              }
            }
          }
          else{
            setCorporateName('')
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
            setRefName('')
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    
  }, [mobileNo, corporateVisit]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!projectArray||!projectTypeArray){
      toast.error('Project or Project Type not selected')
    }
    else{
      setLoading(true);
      if(corporateVisitPatch){
        const data = {
          enquiry_date: enquiryDate,
          project_name: projectArray,
          phase_name: phase,
          project_type_name: projectTypeArray,
          address: address,
          occupation: occupation,
          preferred_location: preferredLocation,
          reason_of_dump: feedback,
          budget: budget,
          full_name: name,
          phone_number: mobileNo,
          city,
          corporate_visit_place:corporateName,
          lead_source:parseInt(leadSourceSub),
          by_medium:parseInt(leadSource),
          preferred_location_other:preferredLocationOther,
          corporate_visit:true,
          corporate_visit_to:currentUser.id,
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
            navigate("/sale/myjobdesk");
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
      else{
        const data = {
          enquiry_date: enquiryDate,
          project_name: projectArray,
          phase_name: phase,
          project_type_name: projectTypeArray,
          address: address,
          occupation: occupation,
          preferred_location: preferredLocation,
          reason_of_dump: feedback,
          budget: budget,
          full_name: name,
          phone_number: mobileNo,
          city,
          corporate_visit_place:corporateName,
          lead_source:parseInt(leadSourceSub),
          by_medium:parseInt(leadSource),
          preferred_location_other:preferredLocationOther,
          corporate_visit:true,
          corporate_visit_to:currentUser.id,
          customer_ref_name:refName
          };
        Axios.post("/social/fb/", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          })
          .then((res) => {
            // console.log(res.data);
            toast.success(res.data.message);
            navigate("/sale/myjobdesk");
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
	}
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

  return (
    <div>
      <Heading title={"Corporate Visit"} />
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
            Add Corporate Visit
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

          <div className="md:w-2/5 w-full">
                    
                    <MultiSelectInput isDisable={gotData} option={projectData} setChange={setSelectProjectInput} defaultValue={selectProjectInput}  label={'Project'}/>
                  </div>

                  <div className="md:w-2/5 w-full">
                      <MultiSelectInput isDisable={gotData} option={typeData} setChange={setSelectProjectTypeInput} defaultValue={selectProjectTypeInput} label={'Type'}/>
                  </div>
                  <div className="md:w-2/5 w-full">
                      <SingleInput
                      label={"Corporate Name"}
                      placeholder={"Enter Corporate Name"}
                      value={corporateName}
                      onChange={(e) => setCorporateName(e.target.value)}
                      // isDisable={gotData}
                    />
                  </div>
          </div>
          <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">

          <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Name"}
                  placeholder={"Enter your Name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isDisable={gotData}
                />
              </div>

              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Occupation"}
                  placeholder={"Enter your Occupation"}
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  isDisable={gotData}
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
                  isDisable={gotData}
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
                  isDisable={gotData}
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Address"}
                  placeholder={"Enter your Address"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  isDisable={gotData}
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"City"}
                  placeholder={"Enter your City"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  isDisable={gotData}
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
                    isDisable={gotData}
                  />
          </div>
          
          <div className="md:w-1/2 w-full">
                  <SingleSelectInput
                    label={"Lead Source Category"}
                    option={leadSourceSubData}
                    placeholder={"Select Lead Source"}
                    value={leadSourceSub}
                    onChange={setLeadSourceSub}
                    isDisable={gotData}
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
                      isDisable={gotData}
                    />
                  </div>
                  <div className="md:w-1/2 w-full">
                    {preferredLocation==1701&&<SingleInput
                      label={"Preferred Other Location"}
                      placeholder={"Enter Preferred Other Location"}
                      value={preferredLocationOther}
                      onChange={(e) => setPreferredLocationOther(e.target.value)}
                      isDisable={gotData}
                    />}
                  </div>
          </div>
              <div className="w-full flex items-center justify-center mt-5 flex-col lg:flex-row gap-5">
              {/* {assignedUser
              ?(!gotData?<Button title={"Update"} onClick={handleSubmit} type={'submit'} />
              :<Button title={"Go Back"} onClick={()=>navigate(-1)} />)
              :<Button title={"Submit"} onClick={handleSubmit} type={'submit'} />} */}
              <Button title={"Submit"} onClick={handleSubmit} type={'submit'} />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
