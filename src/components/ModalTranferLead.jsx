import React, { useEffect, useRef, useState } from "react";
import Transition from "../utils/Transition";
import NewLead from "./NewLead";
import { Link, useFetcher } from "react-router-dom";
import Button from "./Button";
import Axios from "../Axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SingleSelectInput from "./SingleSelectInput";

export default function ModalTransferLead({
  modalOpen,
  setModalOpen,
  id,
  searchId,
  leadID,
}) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
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

  useEffect(() => {
    Axios.get("/misc/project/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setProjectData(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const redirectToWhatsapp = (whatsappMessage) => {
    const data = {
      phone_number: phoneNumber,
    };
    Axios.post("/whats-app/track-whats-message/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        const message = encodeURIComponent(`${whatsappMessage}`);
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, "_blank");
      })
      .then((err) => {
        // console.log(err.response.data);
      });
  };

  const handleTranfer=()=>{
	const data={
		assign_to:user,
		lead_id:leadID,
	}
	Axios.post(`/social/reassign-dump/`,data, {
		headers: {
		  Authorization: `Bearer ${accessToken}`,
		},
	  })
		.then((res) => {
		//   console.log(res.data);
		  toast.success(res.data.message)
		  setModalOpen(false);
		})
		.catch((err) => {
		  console.log(<ul>
			{Object.entries(err.response.data).map(([fieldName, fieldErrors]) => (
				<li key={fieldName}>
					<strong>{fieldName}:</strong>
					<ul>
						{fieldErrors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</li>
			))}
		</ul>);
		});
  }

  useEffect(() => {
    Axios.get(`/account/sales-person/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
		const data=res.data.map(item=>({
			label:item.name,
			value:item.email,
		}))
		setUserData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
// console.log(user)
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
          className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          <div
            className="py-4 px-2 flex items-center justify-center flex-col gap-4"
            ref={searchInput}
          >
            <p className="font-semibold">Select User</p>
            <SingleSelectInput
              value={user}
              placeholder={"Select Agent"}
              onChange={setUser}
              option={userData}
            />
			<Button title={'Submit'} onClick={handleTranfer}/>
          </div>
        </div>
      </Transition>
    </>
  );
}
