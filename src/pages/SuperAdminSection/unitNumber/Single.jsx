import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import SingleInput from "../../../components/SingleInput";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Axios from "../../../Axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SingleSelectInput from "../../../components/SingleSelectInput";

export default function SingleUnitNumber() {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.user);
  const { state } = useLocation();

  const [project, setProject] = useState(state?.projects || "");
  const [projectData, setProjectData] = useState([]);
  const [status,setStatus]=useState(state?.available?'Available':state?.booked?'Booked':state?.hold?'Hold':'');
  const [statusData, setStatusData] = useState([]);
  const [eastBy, setEastBy] = useState(state?.east_by || "");
  const [northBy, setNorthBy] = useState(state?.north_by || "");
  const [southBy, setSouthBy] = useState(state?.south_by || "");
  const [westBy, setWestBy] = useState(state?.west_by || "");
  const [squareFeet, setSquareFeet] = useState(state?.square_fit || "");
  const [unitCost, setUnitCost] = useState(state?.unit_cost || "");
  const [unitNumber, setUnitNumber] = useState(state?.unit_no || "");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("/admin-pannel/project/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          value: item.id,
          label: item.project_name,
        }));
        setProjectData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    Axios.get("/admin-pannel/status/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          value: item.status_name,
          label: item.status_name,
        }));
        setStatusData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  }, []);

  const convertStatusToObject = (status) => {
	return {
		available: status === 'Available',
		booked: status === 'Booked',
		hold: status === 'Hold'
	};
};

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      projects: project,
	  unit_no: unitNumber,
	  available: status==='Available',
	  booked: status==='Booked',
	  hold: status==='Hold',
	  east_by: eastBy,
	  west_by:westBy,
	  north_by: northBy,
	  south_by: southBy,
	  unit_cost:unitCost,
	  square_fit: squareFeet,
    };

    const axiosRequest = state
      ? Axios.patch(`/admin-pannel/unit-number/${state.id}/`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : Axios.post("/admin-pannel/unit-number/", data, {
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
      <Heading title={"Unit Number"} />
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="w-full flex justify-end items-end">
          <Button title={"Back"} onClick={() => navigate(-1)} />
        </div>
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {state ? "Edit" : "Add"} Unit Number
            </h2>
          </header>
          <div className="px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap">
            <div className="md:w-1/2 w-full">
              <SingleSelectInput
                label={"Project"}
                option={projectData}
                placeholder={"Select Project"}
                value={project}
                onChange={setProject}
              />
            </div>
			<div className="md:w-1/2 w-full">
              <SingleSelectInput
                label={"Status"}
                option={statusData}
                placeholder={"Select Status"}
                value={status}
                onChange={setStatus}
              />
            </div>
            <div className="md:w-1/2 w-full mb-4">
              <SingleInput
                label={"Unit Number"}
                placeholder={"Enter Unit Number"}
                size={"lg"}
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-full mb-4">
              <SingleInput
                label={"Unit Cost"}
                placeholder={"Enter Unit Cost"}
                size={"lg"}
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-full mb-4">
              <SingleInput
                label={"Square Feet"}
                placeholder={"Enter Square Feet"}
                size={"lg"}
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-full mb-4">
              <SingleInput
                label={"East By"}
                placeholder={"Enter East By"}
                size={"lg"}
                value={eastBy}
                onChange={(e) => setEastBy(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-full mb-4">
              <SingleInput
                label={"North By"}
                placeholder={"Enter North By"}
                size={"lg"}
                value={northBy}
                onChange={(e) => setNorthBy(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-full mb-4">
              <SingleInput
                label={"South By"}
                placeholder={"Enter South By"}
                size={"lg"}
                value={southBy}
                onChange={(e) => setSouthBy(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-full mb-4">
              <SingleInput
                label={"West By"}
                placeholder={"Enter West By"}
                size={"lg"}
                value={westBy}
                onChange={(e) => setWestBy(e.target.value)}
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
