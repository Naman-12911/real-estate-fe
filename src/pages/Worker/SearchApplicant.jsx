import React, { useEffect, useRef, useState } from "react";
// import Heading from '../../../components/Heading'
// import SingleSelectInput from '../../../components/SingleSelectInput'
// import Axios from '../../../Axios'
import { useLocation, useNavigate } from "react-router-dom";
// import Button from '../../../components/Button'
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import SingleSelectInput from "../../components/SingleSelectInput";
import Axios from "../../Axios";
import Button from "../../components/Button";
import StageButton from "../../components/StageButton";
import ModalAgentManagement from "../../components/ModalAgentManagement";
import ModalSiteUpdate from "../../components/ModalSiteUpdate";
import HorizontalScrollButton from "../../components/HorizontalScrollButton";
import moment from "moment";
import DateFilter from "../../components/DateFilter";
import SingleInput from "../../components/SingleInput";
import downloadWordExcel from "../../components/advanceComponent/downloadWordExcel";
import { currentDateTime } from "../../components/advanceComponent/currentDateTime";

export default function SearchApplicantDocumentation() {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.user);
  const userType = JSON.parse(useSelector((state) => state.userType.userType));

  const stagesAmount = [
    { id: 1, stage: "Stage 1", percentage: 25 },
    { id: 2, stage: "Stage 2", percentage: 20 },
    { id: 3, stage: "Stage 3", percentage: 20 },
    { id: 4, stage: "Stage 4", percentage: 10 },
    { id: 5, stage: "Stage 5", percentage: 10 },
    { id: 6, stage: "Stage 6", percentage: 10 },
    { id: 7, stage: "Stage 7", percentage: 5 },
  ];

  const { state } = useLocation();
  // console.log(state.link);
  const [data, setData] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [stage, setStage] = useState("");
  const [id, setId] = useState("");
  const [itemID, setItemID] = useState("");
  const [clearDelayId, setClearDelayId] = useState("");
  const [prevStageWorker, setPrevStageWorker] = useState(true);
  const [prevStageAdmin, setPrevStageAdmin] = useState(true);
  const [finalAmount, setFinalAmount] = useState("");
  const [dateSearchGrt, setdateSearchGrt] = useState("");
  const [dateSearchLess, setdateSearchLess] = useState("");
  const [page, setPage] = useState("");
  const [maxAmount, setMaxAmount] = useState();
  const [minAmount, setMinAmount] = useState();
  const [targetData, setTargetData] = useState("");

  const [monthlyData, setMonthlyData] = useState("");

  const [currentWorker, setCurrentWorker] = useState(false);
  const [previousAdmin, setPreviousAdmin] = useState(true);

  const [project, setProject] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    //Projects
    Axios.get("/misc/project/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.project_name,
          value: item.id,
        }));
        setProject(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Units
    Axios.get(`/misc/unit-number-filter/?project_id=${selectedProject}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        // setStatus(res.data.available?"AVAILABLE":res.data.hold?"HOLD":res.data.booked?"BOOKED":"CHECKING")
        // setUnitData(res.data)
        const data = res.data.map((item) => ({
          label: item.unit_no,
          value: item.unit_no,
        }));
        setUnit(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Axios.get(`/profile/filter-name-unitno/?unit_no=${selectedUnit}`,{
    // 	headers:{
    // 		Authorization:`Bearer ${accessToken}`
    // }
    // })
    // .then(res=>{
    // 	console.log(res.data)
    // 	setData(res.data)
    // })
    // .catch(err=>{
    // 	console.log(err)
    // })
  }, [selectedProject, selectedUnit]);

  useEffect(() => {
    const paramObject = {
      final_amount_min: minAmount,
      final_amount_max: maxAmount,
    };

    const paramArray = [];
    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }

    const queryString = paramArray.join("&");
    Axios.get(
      `/site/worker/filter/?unit_no=${selectedUnit}&project_name=${selectedProject}&${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        // console.log(res.data)
        setData(res.data);
        setFinalAmount(res.data[0].final_amount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedUnit, selectedProject, searchModalOpen, minAmount, maxAmount]);

  useEffect(() => {
    Axios.get(
      `/site/get/amount/?start_date=${dateSearchGrt}&end_date=${dateSearchGrt}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        // console.log(res.data)
        setMonthlyData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(`/site/worker/target/amount/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setTargetData(res.data.target_summary);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    selectedUnit,
    selectedProject,
    searchModalOpen,
    dateSearchGrt,
    dateSearchLess,
  ]);

  const includesAny = (array, values) => {
    return values.some((value) => array && array.includes(value));
  };

  const scrollableRef = useRef(null);
  const onScroll = (offset) => {
    if (scrollableRef && scrollableRef.current) {
      scrollableRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  const handleExcel = async (urla) => {
    const paramObject = {
      start_date: dateSearchGrt,
      end_date: dateSearchLess,
    };

    // columnFilter.forEach((filter) => {
    //   paramObject[filter.id] = filter.value;
    // });

    const paramArray = [];
    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }

    const queryString = paramArray.join("&");

    downloadWordExcel(
      `site/worker/file/?${queryString}`,
      `SiteWorker_${dateSearchGrt}_${dateSearchLess}_${currentDateTime()}.xlsx`,
      accessToken,
      "Processing Excel File...",
      "Excel File Saved to your Device Successfully",
      "Excel File Downloaded Successfully",
      "There was a problem with Excel file, please try again"
    );
  };

  return (
    <div>
      <Heading title={"Site Update"} />
      <div className="py-3 w-full   mx-auto space-y-5">
        {includesAny(userType, ["admin"]) && (
          <div className="flex items-end justify-end gap-5 flex-col lg:flex-row">
            <Button title={"Export Excel"} onClick={handleExcel} />
            <Button title={"Recently Completed"} />
            <div className="w-full md:w-auto">
              <SingleInput
                placeholder={"Max Amount"}
                type={"number"}
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <SingleInput
                placeholder={"Min Amount"}
                type={"number"}
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
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
        )}
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
              {includesAny(userType, ["admin"]) && 
			   <h2 className="font-semibold text-slate-800 dark:text-slate-100 flex  items-start flex-col md:text-base text-sm">
			  <span>Amount To Be Raised : ₹{Intl.NumberFormat("en-IN").format(monthlyData?.total??0)}</span>
			  <span>Amount Raised : ₹{Intl.NumberFormat("en-IN").format(monthlyData?.total_rec??0)}</span>
			  <span>Target Amount : ₹{Intl.NumberFormat("en-IN").format(targetData?.target_amount??0)}</span>
			  <span>Target Amount Raised : ₹{Intl.NumberFormat("en-IN").format(targetData?.target_amount_raised??0)}</span>
			  <span>Balance : ₹{Intl.NumberFormat("en-IN").format(monthlyData?.total-monthlyData?.total_rec)}</span>
			  </h2>
}
            <HorizontalScrollButton onScroll={onScroll} />
          </header>
          <div className="px-5 py-4 flex items-center justify-between gap-5 flex-wrap">
            <div className="md:w-2/5 w-full">
              <SingleSelectInput
                label={"Project"}
                option={project || []}
                placeholder={"--Select Project--"}
                value={selectedProject}
                onChange={setSelectedProject}
              />
            </div>
            <div className="md:w-2/5 w-full">
              <SingleSelectInput
                label={"Unit Number"}
                option={unit || []}
                placeholder={"--Select Unit--"}
                value={selectedUnit}
                onChange={setSelectedUnit}
              />
            </div>
            {/* <div className='flex items-center justify-center space-x-5 mt-5'>
					<Button title={'Search'}/>
					<Button title={'Clear'}/>
				</div> */}
          </div>
          {data ? (
            <div className="p-3">
              {/* Table */}
              <div className="overflow-x-auto max-h-[80vh]" ref={scrollableRef}>
                <table className="table-auto w-full">
                  {/* Table header */}
                  <thead className="sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700  ">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Project</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Unit No.
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Stages</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Target Date
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Target Accept Date 
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Last Updated Date
                        </div>
                      </th>
                      {includesAny(userType, ["admin"]) && (
                        <>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Set Target
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Clear Delay
                            </div>
                          </th>
                        </>
                      )}
                      {includesAny(userType, ["site_worker"]) && (
                        <>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Accept Target
                            </div>
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                    {data &&
                      data.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="p-4 whitespace-nowrap">
                              <div className="text-base text-center text-black dark:text-slate-300">
                                {item.unit_no.project_name}
                              </div>
                            </td>
                            <td className="p-4 whitespace-nowrap">
                              <div className="text-base text-center">
                                {item.unit_no.unit_no}
                              </div>
                            </td>
                            <td className="p-4 whitespace-nowrap">
                              <div className="text-base flex items-start justify-center gap-2">
                                <div className="flex items-center justify-center flex-col gap-2">
                                  {item.stage_name == "Stage 1" && (
                                  <>
                                  {item.worker_stage1 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="shrink-0 h-6 w-6">
                                      <path className="fill-current text-yellow-500" d="M288 32C265.908 32 248 49.906 248 72S265.908 112 288 112S328 94.094 328 72S310.092 32 288 32ZM40 96C17.908 96 0 113.906 0 136S17.908 176 40 176S80 158.094 80 136S62.092 96 40 96ZM536 96C513.908 96 496 113.906 496 136S513.908 176 536 176S576 158.094 576 136S558.092 96 536 96Z"/>
                                      <path className="fill-current text-yellow-400" d="M40 176C40.246 176 40.465 175.914 40.711 175.91L40.701 175.859C40.453 175.863 40.248 176 40 176ZM535.299 175.859L535.289 175.91C535.535 175.914 535.754 176 536 176C535.752 176 535.547 175.863 535.299 175.859ZM504.537 159.57L414.91 231.273C399.002 244 375.408 238.816 366.297 220.594L308.699 105.398C302.57 109.215 295.75 112 288 112S273.43 109.215 267.301 105.398L209.703 220.594C200.592 238.816 176.998 244 161.09 231.273L71.463 159.57C64.303 169.113 53.482 175.664 40.711 175.91L91.223 453.727C93.988 468.938 107.242 480 122.707 480H453.293C468.758 480 482.012 468.938 484.777 453.727L535.289 175.91C522.518 175.664 511.697 169.113 504.537 159.57Z"/>
                                    </svg>}
                                    {/* <p className="text-sm">
                                      {item?.date ?? ""}
                                    </p> */}
                                  </>
                                  )}
                                  <StageButton
                                    title={"Stage 1"}
                                    targetStage={item.stage_name}
                                    acceptTarget={item.accept}
                                    delay={item.delay_stage1}
                                    admin={item.admin_stage1}
                                    worker={item.worker_stage1}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setId(item.unit_no.id);
                                      setItemID(item.id)
                                      setStage("Stage 1");
                                      setPrevStageAdmin(item.worker_stage1);
                                      setPreviousAdmin(true);
                                      setCurrentWorker(item.worker_stage1);
                                      setPage("YES/NO");
                                      setSearchModalOpen(true);
                                    }}
                                  />
                                  {includesAny(userType, ["admin"]) && (
                                    <>
                                      {item?.worker_stage1 && (
                                        <p className="text-sm dark:text-slate-500">
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage1?.total
                                          )}
                                        </p>
                                      )}
                                      {item?.expense?.stage1?.total_rec > 0 && (
                                        <p>
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage1?.total_rec
                                          )}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center justify-center flex-col gap-2">
                                  {item.stage_name == "Stage 2" && (
                                    <>
                                    {item.worker_stage2 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="shrink-0 h-6 w-6">
                                      <path className="fill-current text-yellow-500" d="M288 32C265.908 32 248 49.906 248 72S265.908 112 288 112S328 94.094 328 72S310.092 32 288 32ZM40 96C17.908 96 0 113.906 0 136S17.908 176 40 176S80 158.094 80 136S62.092 96 40 96ZM536 96C513.908 96 496 113.906 496 136S513.908 176 536 176S576 158.094 576 136S558.092 96 536 96Z"/>
                                      <path className="fill-current text-yellow-400" d="M40 176C40.246 176 40.465 175.914 40.711 175.91L40.701 175.859C40.453 175.863 40.248 176 40 176ZM535.299 175.859L535.289 175.91C535.535 175.914 535.754 176 536 176C535.752 176 535.547 175.863 535.299 175.859ZM504.537 159.57L414.91 231.273C399.002 244 375.408 238.816 366.297 220.594L308.699 105.398C302.57 109.215 295.75 112 288 112S273.43 109.215 267.301 105.398L209.703 220.594C200.592 238.816 176.998 244 161.09 231.273L71.463 159.57C64.303 169.113 53.482 175.664 40.711 175.91L91.223 453.727C93.988 468.938 107.242 480 122.707 480H453.293C468.758 480 482.012 468.938 484.777 453.727L535.289 175.91C522.518 175.664 511.697 169.113 504.537 159.57Z"/>
                                    </svg>}
                                    {/* <p className="text-sm">
                                      {item?.date ?? ""}
                                    </p> */}
                                    </>
                                   
                                  )}
                                  <StageButton
                                    title={"Stage 2"}
                                    targetStage={item.stage_name}
                                    acceptTarget={item.accept}
                                    delay={item.delay_stage2}
                                    admin={item.admin_stage2}
                                    worker={item.worker_stage2}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setStage("");
                                      setPrevStageWorker("");
                                      setSearchModalOpen(true);
                                      setId(item.unit_no.id);
                                      setItemID(item.id)
                                      setStage("Stage 2");
                                      setPreviousAdmin(item.admin_stage1);
                                      setCurrentWorker(item.worker_stage2);
                                      setPrevStageWorker(item.worker_stage1);
                                      setPage("YES/NO");
                                    }}
                                  />
                                  {includesAny(userType, ["admin"]) && (
                                    <>
                                      {item?.worker_stage2 && (
                                        <p className="text-sm dark:text-slate-500">
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage2?.total
                                          )}
                                        </p>
                                      )}
                                      {item?.expense?.stage2?.total_rec > 0 && (
                                        <p>
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage2?.total_rec
                                          )}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center justify-center flex-col gap-2">
                                  {item.stage_name == "Stage 3" && (
                                    <>
                                    {item.worker_stage3 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="shrink-0 h-6 w-6">
                                      <path className="fill-current text-yellow-500" d="M288 32C265.908 32 248 49.906 248 72S265.908 112 288 112S328 94.094 328 72S310.092 32 288 32ZM40 96C17.908 96 0 113.906 0 136S17.908 176 40 176S80 158.094 80 136S62.092 96 40 96ZM536 96C513.908 96 496 113.906 496 136S513.908 176 536 176S576 158.094 576 136S558.092 96 536 96Z"/>
                                      <path className="fill-current text-yellow-400" d="M40 176C40.246 176 40.465 175.914 40.711 175.91L40.701 175.859C40.453 175.863 40.248 176 40 176ZM535.299 175.859L535.289 175.91C535.535 175.914 535.754 176 536 176C535.752 176 535.547 175.863 535.299 175.859ZM504.537 159.57L414.91 231.273C399.002 244 375.408 238.816 366.297 220.594L308.699 105.398C302.57 109.215 295.75 112 288 112S273.43 109.215 267.301 105.398L209.703 220.594C200.592 238.816 176.998 244 161.09 231.273L71.463 159.57C64.303 169.113 53.482 175.664 40.711 175.91L91.223 453.727C93.988 468.938 107.242 480 122.707 480H453.293C468.758 480 482.012 468.938 484.777 453.727L535.289 175.91C522.518 175.664 511.697 169.113 504.537 159.57Z"/>
                                    </svg>}
                                    {/* <p className="text-sm">
                                      {item?.date ?? ""}
                                    </p> */}
                                    </>
                                    
                                  )}
                                  <StageButton
                                    title={"Stage 3"}
                                    targetStage={item.stage_name}
                                    acceptTarget={item.accept}
                                    delay={item.delay_stage3}
                                    admin={item.admin_stage3}
                                    worker={item.worker_stage3}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setStage("");
                                      setPrevStageWorker("");
                                      setSearchModalOpen(true);
                                      setId(item.unit_no.id);
                                      setItemID(item.id)
                                      setStage("Stage 3");
                                      setPreviousAdmin(item.admin_stage2);
                                      setCurrentWorker(item.worker_stage3);
                                      setPrevStageWorker(item.worker_stage2);
                                      setPage("YES/NO");
                                    }}
                                  />
                                  {includesAny(userType, ["admin"]) && (
                                    <>
                                      {item?.worker_stage3 && (
                                        <p className="text-sm dark:text-slate-500">
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage3?.total
                                          )}
                                        </p>
                                      )}
                                      {item?.expense?.stage3?.total_rec > 0 && (
                                        <p>
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage3?.total_rec
                                          )}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center justify-center flex-col gap-2">
                                  {item.stage_name == "Stage 4" && (
                                    <>
                                    {item.worker_stage4 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="shrink-0 h-6 w-6">
                                      <path className="fill-current text-yellow-500" d="M288 32C265.908 32 248 49.906 248 72S265.908 112 288 112S328 94.094 328 72S310.092 32 288 32ZM40 96C17.908 96 0 113.906 0 136S17.908 176 40 176S80 158.094 80 136S62.092 96 40 96ZM536 96C513.908 96 496 113.906 496 136S513.908 176 536 176S576 158.094 576 136S558.092 96 536 96Z"/>
                                      <path className="fill-current text-yellow-400" d="M40 176C40.246 176 40.465 175.914 40.711 175.91L40.701 175.859C40.453 175.863 40.248 176 40 176ZM535.299 175.859L535.289 175.91C535.535 175.914 535.754 176 536 176C535.752 176 535.547 175.863 535.299 175.859ZM504.537 159.57L414.91 231.273C399.002 244 375.408 238.816 366.297 220.594L308.699 105.398C302.57 109.215 295.75 112 288 112S273.43 109.215 267.301 105.398L209.703 220.594C200.592 238.816 176.998 244 161.09 231.273L71.463 159.57C64.303 169.113 53.482 175.664 40.711 175.91L91.223 453.727C93.988 468.938 107.242 480 122.707 480H453.293C468.758 480 482.012 468.938 484.777 453.727L535.289 175.91C522.518 175.664 511.697 169.113 504.537 159.57Z"/>
                                    </svg>}
                                    {/* <p className="text-sm">
                                      {item?.date ?? ""}
                                    </p> */}
                                    </>
                                    
                                  )}
                                  <StageButton
                                    title={"Stage 4"}
                                    targetStage={item.stage_name}
                                    acceptTarget={item.accept}
                                    delay={item?.delay_stage4}
                                    admin={item?.admin_stage4}
                                    worker={item?.worker_stage4}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setStage("");
                                      setPrevStageWorker("");
                                      setSearchModalOpen(true);
                                      setId(item.unit_no.id);
                                      setItemID(item.id)
                                      setStage("Stage 4");
                                      setPreviousAdmin(item.admin_stage3);
                                      setCurrentWorker(item.worker_stage4);
                                      setPrevStageWorker(item.worker_stage3);
                                      setPage("YES/NO");
                                    }}
                                  />
                                  {includesAny(userType, ["admin"]) && (
                                    <>
                                      {item?.worker_stage4 && (
                                        <p className="text-sm dark:text-slate-500">
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage4?.total
                                          )}
                                        </p>
                                      )}
                                      {item?.expense?.stage4?.total_rec > 0 && (
                                        <p>
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage4?.total_rec
                                          )}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center justify-center flex-col gap-2">
                                  {item.stage_name == "Stage 5" && (
                                    <>
                                     {item.worker_stage5 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="shrink-0 h-6 w-6">
                                      <path className="fill-current text-yellow-500" d="M288 32C265.908 32 248 49.906 248 72S265.908 112 288 112S328 94.094 328 72S310.092 32 288 32ZM40 96C17.908 96 0 113.906 0 136S17.908 176 40 176S80 158.094 80 136S62.092 96 40 96ZM536 96C513.908 96 496 113.906 496 136S513.908 176 536 176S576 158.094 576 136S558.092 96 536 96Z"/>
                                      <path className="fill-current text-yellow-400" d="M40 176C40.246 176 40.465 175.914 40.711 175.91L40.701 175.859C40.453 175.863 40.248 176 40 176ZM535.299 175.859L535.289 175.91C535.535 175.914 535.754 176 536 176C535.752 176 535.547 175.863 535.299 175.859ZM504.537 159.57L414.91 231.273C399.002 244 375.408 238.816 366.297 220.594L308.699 105.398C302.57 109.215 295.75 112 288 112S273.43 109.215 267.301 105.398L209.703 220.594C200.592 238.816 176.998 244 161.09 231.273L71.463 159.57C64.303 169.113 53.482 175.664 40.711 175.91L91.223 453.727C93.988 468.938 107.242 480 122.707 480H453.293C468.758 480 482.012 468.938 484.777 453.727L535.289 175.91C522.518 175.664 511.697 169.113 504.537 159.57Z"/>
                                    </svg>}
                                    {/* <p className="text-sm">
                                      {item?.date ?? ""}
                                    </p> */}
                                    </>
                                    
                                  )}
                                  <StageButton
                                    title={"Stage 5"}
                                    targetStage={item.stage_name}
                                    acceptTarget={item.accept}
                                    delay={item?.delay_stage5}
                                    admin={item?.admin_stage5}
                                    worker={item?.worker_stage5}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setStage("");
                                      setPrevStageWorker("");
                                      setSearchModalOpen(true);
                                      setId(item.unit_no.id);
                                      setItemID(item.id)
                                      setStage("Stage 5");
                                      setPreviousAdmin(item.admin_stage4);
                                      setCurrentWorker(item.worker_stage5);
                                      setPrevStageWorker(item.worker_stage4);
                                      setPage("YES/NO");
                                    }}
                                  />
                                  {includesAny(userType, ["admin"]) && (
                                    <>
                                      {item?.worker_stage5 && (
                                        <p className="text-sm dark:text-slate-500">
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage5?.total
                                          )}
                                        </p>
                                      )}
                                      {item?.expense?.stage5?.total_rec > 0 && (
                                        <p>
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage5?.total_rec
                                          )}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center justify-center flex-col gap-2">
                                  {item.stage_name == "Stage 6" && (
                                    <>
                                    {item.worker_stage6 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="shrink-0 h-6 w-6">
                                      <path className="fill-current text-yellow-500" d="M288 32C265.908 32 248 49.906 248 72S265.908 112 288 112S328 94.094 328 72S310.092 32 288 32ZM40 96C17.908 96 0 113.906 0 136S17.908 176 40 176S80 158.094 80 136S62.092 96 40 96ZM536 96C513.908 96 496 113.906 496 136S513.908 176 536 176S576 158.094 576 136S558.092 96 536 96Z"/>
                                      <path className="fill-current text-yellow-400" d="M40 176C40.246 176 40.465 175.914 40.711 175.91L40.701 175.859C40.453 175.863 40.248 176 40 176ZM535.299 175.859L535.289 175.91C535.535 175.914 535.754 176 536 176C535.752 176 535.547 175.863 535.299 175.859ZM504.537 159.57L414.91 231.273C399.002 244 375.408 238.816 366.297 220.594L308.699 105.398C302.57 109.215 295.75 112 288 112S273.43 109.215 267.301 105.398L209.703 220.594C200.592 238.816 176.998 244 161.09 231.273L71.463 159.57C64.303 169.113 53.482 175.664 40.711 175.91L91.223 453.727C93.988 468.938 107.242 480 122.707 480H453.293C468.758 480 482.012 468.938 484.777 453.727L535.289 175.91C522.518 175.664 511.697 169.113 504.537 159.57Z"/>
                                    </svg>}
                                    {/* <p className="text-sm">
                                      {item?.date ?? ""}
                                    </p> */}
                                    </>
                                    
                                  )}
                                  <StageButton
                                    title={"Stage 6"}
                                    targetStage={item.stage_name}
                                    acceptTarget={item.accept}
                                    delay={item?.delay_stage6}
                                    admin={item?.admin_stage6}
                                    worker={item?.worker_stage6}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setStage("");
                                      setPrevStageWorker("");
                                      setSearchModalOpen(true);
                                      setId(item.unit_no.id);
                                      setItemID(item.id)
                                      setStage("Stage 6");
                                      setPreviousAdmin(item.admin_stage5);
                                      setCurrentWorker(item.worker_stage6);
                                      setPrevStageWorker(item.worker_stage5);
                                      setPage("YES/NO");
                                    }}
                                  />
                                  {includesAny(userType, ["admin"]) && (
                                    <>
                                      {item?.worker_stage6 && (
                                        <p className="text-sm dark:text-slate-500">
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage6?.total
                                          )}
                                        </p>
                                      )}
                                      {item?.expense?.stage6?.total_rec > 0 && (
                                        <p>
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage6?.total_rec
                                          )}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center justify-center flex-col gap-2">
                                  {item.stage_name == "Stage 7" && (
                                    <>
                                      {item.worker_stage7 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="shrink-0 h-6 w-6">
                                        <path className="fill-current text-yellow-500" d="M288 32C265.908 32 248 49.906 248 72S265.908 112 288 112S328 94.094 328 72S310.092 32 288 32ZM40 96C17.908 96 0 113.906 0 136S17.908 176 40 176S80 158.094 80 136S62.092 96 40 96ZM536 96C513.908 96 496 113.906 496 136S513.908 176 536 176S576 158.094 576 136S558.092 96 536 96Z"/>
                                        <path className="fill-current text-yellow-400" d="M40 176C40.246 176 40.465 175.914 40.711 175.91L40.701 175.859C40.453 175.863 40.248 176 40 176ZM535.299 175.859L535.289 175.91C535.535 175.914 535.754 176 536 176C535.752 176 535.547 175.863 535.299 175.859ZM504.537 159.57L414.91 231.273C399.002 244 375.408 238.816 366.297 220.594L308.699 105.398C302.57 109.215 295.75 112 288 112S273.43 109.215 267.301 105.398L209.703 220.594C200.592 238.816 176.998 244 161.09 231.273L71.463 159.57C64.303 169.113 53.482 175.664 40.711 175.91L91.223 453.727C93.988 468.938 107.242 480 122.707 480H453.293C468.758 480 482.012 468.938 484.777 453.727L535.289 175.91C522.518 175.664 511.697 169.113 504.537 159.57Z"/>
                                      </svg>}
                                      {/* <p className="text-sm">
                                        {item?.date ?? ""}
                                      </p> */}
                                    </>
                                    
                                  )}
                                  <StageButton
                                    title={"Stage 7"}
                                    targetStage={item.stage_name}
                                    acceptTarget={item.accept}
                                    delay={item?.delay_stage7}
                                    admin={item?.admin_stage7}
                                    worker={item?.worker_stage7}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setStage("");
                                      setPrevStageWorker("");
                                      setSearchModalOpen(true);
                                      setId(item.unit_no.id);
                                      setItemID(item.id)
                                      setStage("Stage 7");
                                      setPreviousAdmin(item?.admin_stage6);
                                      setCurrentWorker(item?.worker_stage7);
                                      setPrevStageWorker(item?.worker_stage6);
                                      setPage("YES/NO");
                                    }}
                                  />
                                  {includesAny(userType, ["admin"]) && (
                                    <>
                                      {item?.worker_stage7 && (
                                        <p className="text-sm dark:text-slate-500">
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage7?.total
                                          )}
                                        </p>
                                      )}
                                      {item?.expense?.stage7?.total_rec > 0 && (
                                        <p>
                                          ₹
                                          {Intl.NumberFormat("en-IN").format(
                                            item?.expense?.stage7?.total_rec
                                          )}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center text-base">
                              {item?.admin_target_date?moment(
                                  new Date(item?.admin_target_date)
                                ).format("DD-MM-YYYY"):"-"}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center text-base">
                              {item?.worker_target_date?moment(
                                  new Date(item?.worker_target_date)
                                ).format("DD-MM-YYYY"):"-"}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-center text-base">
                                {item?.worker_update_date?moment(
                                  new Date(item?.worker_update_date)
                                ).format("DD-MM-YYYY"):"-"}
                              </div>
                            </td>
                            {includesAny(userType, ["site_worker"]) && (
                              <td className="p-4 whitespace-nowrap w-[110px]">
                                <Button
                                  title={"Accept Target"}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setId(item.id);
                                    setSearchModalOpen(true);
                                    setPage("TargetAccept");
                                  }}
                                />
                              </td>
                            )}
                            {includesAny(userType, ["admin"]) && (
                              <td className="p-4 whitespace-nowrap w-[110px]">
                                <Button
                                  title={"Set Target"}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchModalOpen(true);
                                    setId(item.id);
                                    setPage("Target");
                                  }}
                                />
                              </td>
                            )}
                            {includesAny(userType, ["admin"]) && (
                              <td className="p-4 whitespace-nowrap w-[110px]">
                                <Button
                                  title={"Clear Delay"}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchModalOpen(true);
                                    setId(item.unit_no.id);
                                    setClearDelayId(item.id);
                                    setStage("Clear Delay");
                                    setPage("YES/NO");
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}
          <ModalSiteUpdate
            id="search-modal"
            searchId="search"
            modalOpen={searchModalOpen}
            page={page}
            setModalOpen={setSearchModalOpen}
            stage={stage}
            unit={id}
            clearDelayId={clearDelayId}
            previousAdmin={previousAdmin}
            currentWorker={currentWorker}
            prevStageAdmin={prevStageAdmin}
            prevStageWorker={prevStageWorker}
            finalAmount={finalAmount}
            itemID={itemID}
          />
        </div>
      </div>
    </div>
  );
}
