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

export default function ModalExpectedLead({
  modalOpen,
  setModalOpen,
  id,
  page,
  userID,
  prevStatus,
  prevComment
}) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const accessToken = useSelector((state) => state.user.user);

  const [comment,setComment]=useState(prevComment||'');
  const [status,setStatus]=useState(prevStatus||'');
  const [expectedDate,setExpectedDate]=useState('');

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
    if(!expectedDate){
      toast.error('Date not selected')
    }
    else{
      const data = {
        expected_booking: true,
        expected_booking_date:expectedDate
      };
      Axios.patch(`/social/fb/${userID}/`, data, {
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
    }
  };

  const handleSubmitAdmin = () => {
    const data = {
      status_acc_admin: status,
      feedback_acc_admin:comment,
    };
    Axios.patch(`/social/fb/${userID}/`, data, {
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

  const issues = [
    { value: 'DISTANCE ISSUE', label: 'DISTANCE ISSUE' },
    { value: 'BUDGET ISSUE', label: 'BUDGET ISSUE' },
    { value: 'LOCATION ISSUE', label: 'LOCATION ISSUE' },
    { value: 'BOOKED SOMEWHERE', label: 'BOOKED SOMEWHERE' },
    { value: 'DUMP', label: 'DUMP' }
  ];

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
            {page == "admin" ? (
              <div className="flex items-center justify-center gap-10 flex-col">
                <p className="text-xl font-semibold">
                  Status and Comment According to Admin
                </p>
                <SingleSelectInput option={issues} value={status} onChange={setStatus} label={'Status'} width={'19rem'}/>
                <SingleTextArea label={'Comment'} value={comment} onChange={(e)=>setComment(e.target.value)}/>
                <div className="w-full flex items-center justify-evenly">
                  <Button title={"Submit"} onClick={handleSubmitAdmin} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-10 flex-col">
                <p className="text-xl font-semibold">
                  Are you sure you want to mark this Lead as Expected Booking?
                </p>
                <SingleInput type={'date'} label={'Expected Date'} value={expectedDate} onChange={(e)=>setExpectedDate(e.target.value)}/>
                <div className="w-full flex items-center justify-evenly flex-col md:flex-row gap-2">
                  <Button title={"Yes"} onClick={handleSubmit} />
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
