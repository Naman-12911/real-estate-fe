import React, { useEffect, useRef, useState } from "react";
import Transition from "../utils/Transition";
import NewLead from "./NewLead";
import { Link } from "react-router-dom";
import Button from "./Button";
import Axios from "../Axios";
import { useSelector } from "react-redux";
import SingleInput from "./SingleInput";
import { toast } from "sonner";
import SingleTextArea from "./SingleTextArea";
import SingleSelectInput from "./SingleSelectInput";

export default function ModalAgentManagement({
  modalOpen,
  setModalOpen,
  id,
  searchId,
  userID,
  phoneNumber,
  page,
  option,
}) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [transferAgentID,setTransferAgentID]=useState('');
  const accessToken = useSelector((state) => state.user.user);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    modalOpen && searchInput.current.focus();
  }, [modalOpen]);

  const handleSubmit = () => {
    const data = {
      from_date: fromDate,
      to_date: toDate,
      reason: reason,
      user: userID,
    };
    Axios.post("/account/user-holiday/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        toast.success(res.data.message);
        setModalOpen(false);
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

  const handeLeadOff = () => {
    const data = {
      assign: true,
    };
    Axios.patch(`account/deactivate-assigning/?phone_no=${phoneNumber}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        toast.success(res.data.message);
        setModalOpen(false);
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


  const handleTransferData = () => {
    const data = {
		old_user_id:userID,
		new_user_id:transferAgentID,
    };
    Axios.post("/agent-management/transfer-data/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        toast.success(res.data.message);
        setModalOpen(false);
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


  const handeDeactiveAccount = () => {
    const data = {
      email:userID,
    };
    Axios.post(`/account/deact-user/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        toast.success(res.data.message);
        setModalOpen(false);
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

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg"
        >
          <div
            className="py-4 px-5 flex items-center justify-center flex-col gap-4"
            ref={searchInput}
          >
            {page == "Holiday" ? (
              <>
                <p className="text-xl font-semibold">Agent Holiday</p>
                <div className="w-full">
                  <SingleInput
                    type={"date"}
                    label={"From Date"}
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <SingleInput
                    type={"date"}
                    label={"To Date"}
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <SingleTextArea
                    label={"Reason"}
                    placeholder={"Enter a Reason"}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                <Button title={"Submit"} onClick={handleSubmit} />
              </>
            ) : page == "Transfer" ? (
              <div className="flex items-center justify-start gap-10 flex-col h-[30rem] w-full">
			  <p className="text-xl font-semibold">
				Transfer all Leads to?
			  </p>
                <SingleSelectInput
                  label={"Agent List"}
                  placeholder={"Select Agent to Transfer"}
                  option={option}
					value={transferAgentID}
					onChange={setTransferAgentID}
					setModalOpen={setModalOpen}
					width={'19rem'}
                />
                <Button title={"Submit"} onClick={handleTransferData}/>
              </div>
            ) : page=="JobLeft"?(
				<div className="flex items-center justify-center gap-10 flex-col">
                <p className="text-xl font-semibold">
                  Are you sure you want to remove this Agent?
                </p>
                <div className="w-full flex items-center justify-evenly">
                  <Button title={"Yes"} onClick={handeDeactiveAccount} />
                  <Button title={"No"} onClick={() => setModalOpen(false)} />
                </div>
              </div>
			): (
              <div className="flex items-center justify-center gap-10 flex-col">
                <p className="text-xl font-semibold">
                  Turn Off leads for this Agent?
                </p>
                <div className="w-full flex items-center justify-evenly">
                  <Button title={"Yes"} onClick={handeLeadOff} />
                  <Button title={"No"} onClick={() => setModalOpen(false)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
}
