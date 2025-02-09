import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import SingleDateInput from "../../components/SingleDateInput";
import Button from "../../components/Button";
import SingleInput from "../../components/SingleInput";
import Spinner from "../../components/Spinner";
import { toast } from "sonner";
import Axios from "../../Axios";
import { useSelector } from "react-redux";

export default function ConstructorEditUnit() {
  const { state } = useLocation();
  const accessToken = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  if (!state) {
    navigate(-1);
  }
  console.log(state);

  const [rate, setRate] = useState(state?.data?.unit?.rate ?? "");
  const [sqft, setSqft] = useState(state?.data?.unit?.square_fit ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    Axios.patch(
      `/civil-worker/constructor-unit/${state?.unit}/`,
      {
		rate,
		square_fit:sqft,
	  },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        toast.success(res.data.message);
        navigate(-1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Heading title={"Stage Details"} />
      <div className="py-3 w-full mx-auto space-y-5">
        <div className="flex justify-end items-end gap-5 xl:flex-row flex-col">
          <Button title={"Back"} onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-full w-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
              Unit Update
            </h2>
          </header>
          <div className="px-5 py-4 w-full flex flex-col gap-12 justify-between items-center">
            <div className="md:w-1/2 w-full">
              <SingleInput
                type={"number"}
                label={"Unit Sqft"}
                placeholder={"Enter unit sqft"}
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-full">
              <SingleInput
                type={"number"}
                label={"Unit Rate"}
                placeholder={"Enter unit rate"}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <Button title={"Submit"} onClick={() => handleSubmit("sqft")} />
          </div>
        </div>
      </div>
    </div>
  );
}
