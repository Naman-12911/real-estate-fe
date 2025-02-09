import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
// import NewLead from "../../components/NewLead";
import SingleInput from "../../components/SingleInput";
import Button from "../../components/Button";
import Axios from "../../Axios";
import { useDispatch, useSelector } from "react-redux";
import SingleSelectInput from "../../components/SingleSelectInput";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

import MultiSelectInput from "../../components/MultiSelectInput";
// import { copyWithStructuralSharing } from "@reduxjs/toolkit/query";
import { getNotificationPush } from "../../app/GetNotification";
import SingleDateInput from "../../components/SingleDateInput";
import moment from "moment";
import Spinner from "../../components/Spinner";

export default function AddEditConstructor() {
  const { state } = useLocation();
  const accessToken = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [prevSelectedUnits,setPrevSelectedUnits]=useState([]);
  const [prevData,setPrevData]=useState();
  const [formData, setFormData] = useState({
    name:"",
    address: "",
    rate: "",
    discount:5.08,
    gst:"",
    bank_name:"",
    branch:"",
    bank_no: null,
    ifsc_code: "",
    hsncode: "",
    unit: [],
    square_fit: "",
    percentage_stage_1: null,
    percentage_stage_2: null,
    percentage_stage_4: null,
    percentage_stage_3: null,
    percentage_stage_5: null,
    percentage_stage_6: null,
    percentage_stage_7: null,
    percentage_stage_8: null,
    percentage_stage_9: null,
    percentage_stage_10: null,
    percentage_stage_11: null,
  });

  const stages = Array.from({ length: 11 }, (_, i) => i + 1);
  useEffect(() => {
    if(state?.data?.id){
      //Profile
          Axios.get(`/civil-worker/constructor-profile/${state?.data?.id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        .then((res) => {
          setFormData((prev) => ({
            ...prev,
              name: res?.data?.name,
              address: res?.data?.address,
              rate: res?.data?.rate,
              discount: res?.data?.discount,
              gst: res?.data?.gst,
              bank_name: res?.data?.bank_name,
              branch: res?.data?.branch,
              bank_no: res?.data?.bank_no,
              ifsc_code: res?.data?.ifsc_code,
              hsncode: res?.data?.hsncode,
              square_fit: res?.data?.square_fit,
          }));
          setPrevData(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
      }


    //Projects
    Axios.get("/misc/project/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res)
        const data = res.data.map((item) => ({
          label: item.project_name.replace(/_/g, " "),
          value: item.id,
        }));
        // console.log(data);
        setProjectData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  useEffect(()=>{
    Axios.get("/civil-worker/constructor-unit/?unassigned=true", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        const unassignedData = res.data.map((item) => ({
          label: item.unit_no,
          value: item.id,
        }));
        if (state?.data) {
          Axios.get("/civil-worker/constructor-unit/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => {
              const data = res.data.map((item) => ({
                label: item.unit_no,
                value: item.id,
              }));
              const newData = data?.filter((element) =>
                prevData.unit.includes(element.label)
              );
              const newArrayOfData=[...unassignedData,...newData];
              setUnitData(newArrayOfData);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        else{
          setUnitData(unassignedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[prevData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const updateUnits = () => {
      const updatedLabels = selectedUnits.map((item) => Number(item.value));
      const updatedPrevSelectedUnits=prevSelectedUnits.map((item)=>Number(item.value));
      // console.log(" Previous Units",updatedPrevSelectedUnits)
      // console.log(" New Units",updatedLabels)
      setFormData((prevFormData) => ({
        ...prevFormData,
        unit: updatedLabels.concat(updatedPrevSelectedUnits),
      }));
    };
    updateUnits();
  }, [selectedUnits,prevSelectedUnits]);

  useEffect(() => {
    if (prevData) {
      const newData = unitData?.filter((element) =>
        prevData?.unit?.includes(element.label)
      );
      if (newData) {
        setPrevSelectedUnits(newData);
      }
    }
  }, [prevData, unitData]);

  // console.log(formData.unit.length);
  const handleSubmit = () => {
    if (!formData.name) {
      toast.error("Please enter name before submiting");
    } else if (formData.unit.length == 0) {
      toast.error("Please select unit before submiting");
    } else if (!formData.rate) {
      toast.error("Please enter rate before submiting");
    } else if (!state?.data) {
      if (!formData?.square_fit) {
        toast.error("Please enter square feet area before submiting");
      } else if (
        !formData?.percentage_stage_1 ||
        !formData?.percentage_stage_2 ||
        !formData?.percentage_stage_3 ||
        !formData?.percentage_stage_4 ||
        !formData?.percentage_stage_5 ||
        !formData?.percentage_stage_6 ||
        !formData?.percentage_stage_7 ||
        !formData?.percentage_stage_8 ||
        !formData?.percentage_stage_9 ||
        !formData?.percentage_stage_10 ||
        !formData?.percentage_stage_11
      ) {
        toast.error("Please fill all percentage before submiting");
      }
      else { 
        // setLoading(true);
        let request;
        if (state?.data) {
          request = Axios.patch(
            `/civil-worker/constructor-profile/${state?.data?.id}/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        } else {
          request = Axios.post(`/civil-worker/constructor-profile/`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
  
        request
          .then((res) => {
            toast.success(res.data.message);
            navigate(-1);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(err.response.data.error)
            console.log(err);
            setLoading(false);
          });
      }
    } else {
      setLoading(true);
      let request;
      if (state?.data) {
        request = Axios.patch(
          `/civil-worker/constructor-profile/${state?.data?.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        request = Axios.post(`/civil-worker/constructor-profile/`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      request
        .then((res) => {
          toast.success(res.data.message);
          navigate(-1);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.error)
          console.log(err.response.data.error);
          setLoading(false);
        });
    }
  };

  // console.log(formData);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Heading title={`${state?.type} Contractor`} />
      <div className="py-3 w-full mx-auto space-y-5">
        <div className="flex justify-end items-end gap-5 xl:flex-row flex-col">
          <Button title={"Back"} onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            {state?.type} Contractor
          </h2>
        </header>
        <div className="p-8 w-full   mx-auto">
          <div className="flex justify-center items-center space-y-12 flex-col">
            <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
              <div className="md:w-1/2 w-full">
                <SingleInput
                  label={"Contractor Name"}
                  placeholder={"Enter contractor name "}
                  value={formData.name}
                  name={"name"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="md:w-1/2 w-full">
                <SingleInput
                  label={"Address"}
                  placeholder={"Enter Address"}
                  value={formData.address}
                  name={"address"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Rate (per sqft)"}
                  placeholder={"Enter rate per square feet"}
                  value={formData.rate}
                  name={"rate"}
                  onChange={(e) => handleChange(e)}
                  type={"number"}
                />
              </div>
              {!state?.data?.unit && (
                <div className="md:w-2/5 w-full">
                  <SingleInput
                    label={"Unit Square Feet Area"}
                    placeholder={"Enter square feet area"}
                    value={formData.square_fit}
                    name={"square_fit"}
                    onChange={(e) => handleChange(e)}
                    type={"number"}
                  />
                </div>
              )}
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Below Percentage"}
                  placeholder={"Enter tis bill below percentage"}
                  value={formData.discount}
                  name={"discount"}
                  onChange={(e) => handleChange(e)}
                  type={"number"}
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"GST"}
                  placeholder={"Enter GST number"}
                  value={formData.gst}
                  name={"gst"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
              <div className="md:w-1/2 w-full">
                <SingleInput
                  label={"Bank Name"}
                  placeholder={"Enter bank name "}
                  value={formData.bank_name}
                  name={"bank_name"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="md:w-1/2 w-full">
                <SingleInput
                  label={"Branch Name"}
                  placeholder={"Enter branch name"}
                  value={formData.branch}
                  name={"branch"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"Account Number"}
                  placeholder={"Enter account number"}
                  value={formData.bank_no}
                  name={"bank_no"}
                  onChange={(e) => handleChange(e)}
                  type={"number"}
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"IFSC Code"}
                  placeholder={"Enter IFSC code"}
                  value={formData.ifsc_code}
                  name={"ifsc_code"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="md:w-2/5 w-full">
                <SingleInput
                  label={"HSN Code"}
                  placeholder={"Enter HSN code"}
                  value={formData.hsncode}
                  name={"hsncode"}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            {!state?.data?.unit && (
              <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5 flex-wrap">
                {stages.map((stage) => (
                  <div className="md:w-80 w-full">
                    <SingleInput
                      key={`stage_${stage}`}
                      label={`Stage ${stage}`}
                      placeholder={`Enter percentage of stage ${stage}`}
                      value={formData[`percentage_stage_${stage}`]}
                      name={`percentage_stage_${stage}`}
                      onChange={handleChange}
                      type={"number"}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="w-full flex justify-between items-center md:flex-row flex-col gap-5">
              <div className="md:w-1/2 w-full">
                <MultiSelectInput
                  option={projectData}
                  setChange={setSelectedProject}
                  defaultValue={selectedProject}
                  label={"Project"}
                />
              </div>
              <div className="md:w-1/2 w-full">
                <MultiSelectInput
                  option={unitData}
                  setChange={setSelectedUnits}
                  defaultValue={selectedUnits}
                  label={"Units"}
                />
              </div>
            </div>
            <Button
              title={state?.name ? "Update" : "Submit"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
