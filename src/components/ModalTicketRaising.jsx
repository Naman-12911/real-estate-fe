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

export default function ModalTicketRaising({
  modalOpen,
  setModalOpen,
  id,
  searchId,
}) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const accessToken = useSelector((state) => state.user.user);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [project, setProject] = useState("");
  const [unitData, setUnitData] = useState([]);
  const [unit, setUnit] = useState("");
  const [yearOfPurchase, setYearOfPurchase] = useState("");
  const [possessionReceived, setPossessionReceived] = useState('');
  const [possessionDate, setPossessionDate] = useState("");

  const last100Years = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = currentYear; i >= currentYear - 99; i--) {
	last100Years.push({ label: `${i}`, value: i });
  }


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

  const handleSubmit = (e) => {
	e.preventDefault();
    const data = {
		unit_number:unit,
		year_of_purchase:yearOfPurchase,
		possession_recieved:possessionReceived,
		possession_date:possessionDate,
		project_name:project,
		phone_number: phoneNumber,
		query,
		email,
		name,
    };
    Axios.post(`/ticket/ticket/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        toast.success(res.data.message);
        setPhoneNumber("");
        setEmail("");
        setQuery("");
        setName("");
        setProject("");
        setUnit("");
        setYearOfPurchase("");
        setPossessionReceived("");
        setPossessionDate("");
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


  useEffect(()=>{
	//Projects
	Axios.get('/misc/project/',{
		headers:{
		Authorization: `Bearer ${accessToken}`
		}
	})
	.then(res=>{
		const data=res.data.map(item=>(
			{
				label:item.project_name,
				value:item.id
			}
		))
		setProjectData(data);
	})
	.catch(err=>{
		console.log(err)
	})

	//Units
	Axios.get(`/misc/unit-no-with-available/?projects_id=${project}`,{
		
			headers:{
			Authorization: `Bearer ${accessToken}`
			}
	})
	.then(res=>{
		const data=res.data.map(item=>(
			{
				label:item.unit_no,
				value:item.id
			}
		))
		setUnitData(data);
	})
	.catch(err=>{
		console.log(err)
	})
},[project])

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
            <p className="text-xl text-center font-semibold">Raise Ticket</p>
            <form className="w-full px-10 space-y-5" onSubmit={handleSubmit}>
				<p className="text-base font-semibold">Your Details</p>
              <SingleInput
                label={"Name"}
                placeholder={"Enter your name"}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <SingleInput
                label={"Phone Number"}
                type={"number"}
                placeholder={"Enter your phone number"}
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber.slice(0, 10)}
              />
              <SingleInput
                label={"Email"}
                type={"email"}
                placeholder={"Enter your email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
			<p className="text-base font-semibold">Issue Topic</p>
			  <SingleSelectInput
				label={'Project'}
				placeholder={'Enter project'}
				onChange={setProject}
				value={project}
				option={projectData}
			/>
			<SingleSelectInput
				label={'Unit'}
				placeholder={'Enter unit'}
				onChange={setUnit}
				value={unit}
				option={unitData}
			/>
			<SingleSelectInput
				label={'Purchased Year'}
				placeholder={'Select Option'}
				onChange={setYearOfPurchase}
				value={yearOfPurchase}
				option={last100Years}
			/>
			<SingleSelectInput
				label={'Possession Received'}
				placeholder={'Select Option'}
				onChange={setPossessionReceived}
				value={possessionReceived}
				option={[{label:'Yes',value:true},{label:'No',value:false}]}
			/>
			{possessionReceived&&<SingleInput
				label={'Possession Date'}
				type={'date'}
				placeholder={'Enter possession date'}
				onChange={(e) => setPossessionDate(e.target.value)}
				value={possessionDate}
			/>}
              <SingleTextArea
                label={"Message"}
                placeholder={"Enter your Message"}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <div className="w-full flex items-center justify-center">
                <Button title={"Submit"} type={'submit'} />
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </>
  );
}
