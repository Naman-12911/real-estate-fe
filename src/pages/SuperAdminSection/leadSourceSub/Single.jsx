import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import SingleInput from "../../../components/SingleInput";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Axios from "../../../Axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SingleSelectInput from "../../../components/SingleSelectInput";

export default function SingleLeadSourceSub() {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.user);
  const { state } = useLocation();

  const [project, setProject] = useState(state?.medium_of_lead || "");
  const [projectData, setProjectData] = useState([]);
  const [unitNumber, setUnitNumber] = useState(state?.lead_source || "");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("social/medium-lead/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          value: item.id,
          label: item.medium,
        }));
        setProjectData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      medium_of_lead: project,
      lead_source: unitNumber,
    };

    const axiosRequest = state
      ? Axios.patch(`social/lead-source/${state.id}/`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : Axios.post("social/lead-source/", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

    axiosRequest
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
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
    setLoading(false);
  };
  return (
    <div>
      <Heading title={"Lead Source Sub"} />
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="w-full flex justify-end items-end">
          <Button title={"Back"} onClick={() => navigate(-1)} />
        </div>
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {state ? "Edit" : "Add"} Lead Source Sub
            </h2>
          </header>
          <div className="px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap">
            <div className="md:w-1/2 w-full">
              <SingleSelectInput
                label={"Lead Source"}
                option={projectData}
                placeholder={"Select Lead Source"}
                value={project}
                onChange={setProject}
              />
            </div>
            <div className="md:w-1/2 w-full mb-4">
              <SingleInput
                label={"Lead Source Sub"}
                placeholder={"Enter Lead Source Sub"}
                size={"lg"}
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center m-5 gap-5">
            <Button title={state?"Update":"Submit"} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
