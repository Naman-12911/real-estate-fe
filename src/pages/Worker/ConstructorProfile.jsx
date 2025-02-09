import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Table from "../../components/Table";
import InfoTable_Big from "../../components/InfoTable_Big";
import { useSelector } from "react-redux";
import Axios from "../../Axios";
import ConstructorStageButton from "../../components/ConstructorStageButton";
import SingleCheckBox from "../../components/SingleCheckBox";
import DateFilter from "../../components/DateFilter";
import ModalConstructorStage from "../../components/ModalConstructorStage";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import downloadWordExcel from "../../components/advanceComponent/downloadWordExcel";
import { currentDateTime } from "../../components/advanceComponent/currentDateTime";

export default function ConstructorProfile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) {
    navigate(-1);
  }
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state) => state.user.user);
  const [columnFilter, setColumnFilter] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dateSearchGrt, setdateSearchGrt] = useState("");
  const [dateSearchLess, setdateSearchLess] = useState("");
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [order, setOrder] = useState("");
  const [flag,setFlag]=useState(false);
  const [modalData, setModalData] = useState({});

  const [selectedUnitFinal,setSelectedUnitFinal]=useState('')


  useEffect(() => {
    setLoading(true);
    const paramObject = {
      updated_at__gte: dateSearchGrt,
      updated_at__lte: dateSearchLess,
      order_by: order,
      contractor_id:state?.id
    };

    const paramArray = [];
    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }

    const queryString = paramArray.join("&");

    Axios.get(`/civil-worker/civil-stages/?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [order, dateSearchGrt, dateSearchLess,flag]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allEmails = data.map((lead) => lead.unit_no);
      setSelectedEmails(allEmails);
    } else {
      setSelectedEmails([]);
    }
  };

  const handleCheckboxChange = (email) => {
    const updatedEmails = [...selectedEmails];
    const index = updatedEmails.indexOf(email);
    if (index === -1) {
      // If email is not in the array, add it
      updatedEmails.push(email);
    } else {
      // If email is already in the array, remove it
      updatedEmails.splice(index, 1);
    }
    
    setSelectedEmails(updatedEmails);
  };


useEffect(()=>{
  const queryString = selectedEmails.map(unit => `unit_no=${unit}`).join('&');

  if(queryString){
    setSelectedUnitFinal(queryString)
  }
},[selectedEmails])

  const stageNames = [
    "Piles",
    "Plinth",
    "GF Slab",
    "FF Slab",
    "Tower/ Mummty",
    "Brick Work",
    "Plastering",
    "Flooring",
    "Double coat putty & Single Coat Paint",
    "Completion OF painting, CP Fitting, Sanitary",
    "Handover"
  ];


  const columns = [
    {
      id: "checkBox",
      header: ({ table }) => (
        <SingleCheckBox onChange={handleSelectAllChange} checked={selectAll} />
      ),
      cell: (info) => {
        const { unit_no } = info.row.original.civil_stage?.unit;
        return (
          <SingleCheckBox
            onChange={() => handleCheckboxChange(unit_no)}
            checked={selectedEmails.includes(unit_no)}
          />
        );
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      id: "slNo",
      header: "SL No",
      cell: (info) => {
        return info.row.index + 1;
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      id: "unit_no",
      accessorKey: "unit_no",
      header: "Unit No",
      cell: (info) => {
        const { unit_no } = info?.row?.original?.civil_stage;
        return unit_no;
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      id: "stages",
      header: "Stages",
      cell: (info) => {
        const { stages } = info.row.original?.civil_stage;
        const data = info.row.original?.civil_stage;
        return (
          <div className="flex items-center justify-center gap-2">
            {stages?.map((item, index) => {

              // Extract stage number from item?.stage
              const stageNumber = parseInt(item?.stage.replace('Stage ', ''), 10) - 1;
              const stageTitle = stageNames[stageNumber] || item?.stage; // Fallback to item?.stage if out of bounds

              return(
              <div className="flex flex-col items-center justify-center">
                {(item?.completedBeforeHand || item?.targetDate)  && <p className=" font-semibold">{moment(item?.completedDate||item?.targetDate).format("DD/MM/YYYY")}</p>}
                <ConstructorStageButton
                  key={index}
                  title={stageTitle}
                  completed={item?.completed}
                  completedBefore={item?.completedBeforeHand}
                  targetDate={item?.targetDate				  }
                  onClick={!item?.bill_downloaded?() => {
                    navigate("/constructor/constructor/stage", {
                      state: { stage: item, data: data },
                    });
                  }:''}
                />
              {item?.updated_percentage && <p className=" font-semibold">{item?.updated_percentage}</p>}
              </div>
              )
            })}
          </div>
        );
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      header: "Action",
      cell: (info) => {
        // const unit = info.row.original?.civil_stage?.unit?.id;
        // const civil = info.row.original?.civil_stage?.unit?.id;
        const data = info.row.original?.civil_stage;
        const { miscellaneous_total } = info.row.original;
        // const { updated_percentage_stage_1  = info.row.original?.civil_stage?.stage?.;
        return (
          <div className="flex items-center justify-center gap-4">
             <Button
              title={"Edit Unit"}
              onClick={() =>
                navigate("/constructor/constructor/unit", {
                  state:{ unit:data?.unit?.id , data: data },
                })
              }
            />
            <div className="flex items-center justify-center flex-col">
              <p className="font-semibold">{miscellaneous_total>0?miscellaneous_total:''}</p>
              <Button
                title={"Miscellaneous"}
                onClick={() =>
                  navigate("/constructor/constructor/miscellaneous", {
                    state:{ unit:data?.unit?.id , data: data },
                  })
                }
              />
              {/* <p className="font-semibold">{updated_percentage_stage_1?updated_percentage_stage_1:''}</p> */}
            </div>
            
            <Button
              title={"Bills"}
              onClick={() =>
                navigate("/constructor/constructor/bills", {
                  state:data?.unit?.id,
                })
              }
            />
            <Button
              title={"Remark"}
              onClick={() =>
                navigate("/constructor/constructor/remark", {
                  state:data?.unit?.id,
                })
              }
            />
            <Button
              title={"Export Bill"}
              onClick={()=>handleExcel(`contractor_id=${state.id}&unit_no=${data?.unit?.unit_no}`)}
            />
          </div>
        );
      },
      meta: {
        smallWidth: true,
      },
    },
  ];

  const handleExcel = async (url) => {
    setFlag(!flag)
    downloadWordExcel(
      `excel-files/constructor-bill/?${url}`,
      `${state.name}_${dateSearchGrt}_${dateSearchLess}_${currentDateTime()}.xlsx`,
      accessToken,
      'Processing Excel File...',
      'Excel File Saved to your Device Successfully',
      'Excel File Downloaded Successfully',
      'There was a problem with Excel file, please try again'
    )
  };

  const handlePreviewExcel = async (url) => {
    setFlag(!flag)
    downloadWordExcel(
      `excel-files/constructor-bill/view/?${url}`,
      `${state.name}_PREVIEW_${dateSearchGrt}_${dateSearchLess}_${currentDateTime()}.xlsx`,
      accessToken,
      'Processing Excel File...',
      'Excel File Saved to your Device Successfully',
      'Excel File Downloaded Successfully',
      'There was a problem with Excel file, please try again'
    )
  };


  return (
    <div>
      <Heading title={"Contractor Profile"} />
      <div className="py-3 w-full mx-auto space-y-5">
        <div className="flex justify-between items-end gap-5 xl:flex-row flex-col">
          <div className="flex justify-between items-end gap-5 xl:flex-row flex-col xl:w-auto w-full">
            <Button
              title={"Edit Contractor"}
              onClick={() =>
                navigate("/constructor/constructor", {
                  state: { type: "Edit", data: state },
                })
              }
            />
          </div>
          <Button title={"Back"} onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full w-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
              Constructor's Information
            </h2>
          </header>
          <div className="px-5 py-4 w-full flex flex-col 2xl:flex-row flex-wrap gap-12 justify-between items-center">
            {/* <table className="table-auto w-full"> */}
            <div className="xl:w-[48%] w-full h-96 md:p-8 p-4 rounded-md border">
              <p className="text-lg font-extrabold text-black dark:text-white mb-4">
                Information
              </p>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">Name</p>
                <td className="py-2 text-right">{state?.name}</td>
              </div>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">Address</p>
                <td className="text-right">{state?.address}</td>
              </div>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">Rate</p>
                <td className="text-right">{state?.rate}</td>
              </div>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">Below Percentage</p>
                <td className="text-right">{state?.discount}</td>
              </div>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">GST</p>
                <td className="text-right">{state?.gst}</td>
              </div>
            </div>
            <div className="xl:w-[48%] w-full h-96 md:p-8 p-4 rounded-md border">
              <p className="text-lg font-extrabold text-black dark:text-white mb-4">
                Other Information
              </p>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">Bank Name</p>
                <td className="py-2 text-right">{state?.bank_name}</td>
              </div>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">Branch Name</p>
                <td className="text-right">{state?.branch}</td>
              </div>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">Account No.</p>
                <td className="text-right">{state?.bank_no}</td>
              </div>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">IFSC Code</p>
                <td className="text-right">{state?.ifsc_code}</td>
              </div>
              <div className="w-full flex items-center justify-between border-b py-2  gap-2">
                <p className="font-bold">HSN Code</p>
                <td className="text-right">{state?.hsncode}</td>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalConstructorStage
        id="search-modal"
        searchId="search"
        modalOpen={searchModalOpen}
        setModalOpen={setSearchModalOpen}
      />
      
        <div className="flex justify-between items-end gap-5 xl:flex-row flex-col mt-5">
          <div className="flex justify-between items-end gap-5 xl:flex-row flex-col xl:w-auto w-full">
            <Button
              title={"Export Bills"}
              onClick={()=>handleExcel(`contractor_id=${state.id}&${selectedUnitFinal}`)}
            />
            <Button
              title={"Preview Bills"}
              onClick={()=>handlePreviewExcel(`contractor_id=${state.id}&${selectedUnitFinal}`)}
            />
            <Button
              title={"Recently Updated"}
              onClick={() => setOrder("-updated_at")}
            />
            <Button
              title={"Previous Bills"}
              onClick={() =>
                navigate("/constructor/constructor/prevbills", {
                  state:state,
                })
              }
            />
          </div>
          <DateFilter
            placeholderGRT={"Date Greater then"}
            placeholderLES={"Date Less then"}
            valueGRT={dateSearchGrt}
            valueLES={dateSearchLess}
            onChangeGRT={setdateSearchGrt}
            onChangeLES={setdateSearchLess}
          />
        </div>
     
      <Table
        setColumnFilter={setColumnFilter}
        columns={columns}
        data={data}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Stages
          </h2>
        }
      />
    </div>
  );
}
