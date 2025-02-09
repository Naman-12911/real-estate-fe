import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import DashboardCard01 from "../../partials/dashboard/DashboardCard01";
import DashboardSingleValueCard from "../../partials/dashboard/DashboardSingleValueCard";
import Heading from "../../components/Heading";
import DateFilter from "../../components/DateFilter";
import Spinner from "../../components/Spinner";
import moment from "moment";
import Button from "../../components/Button";
import BarChart from "../../charts/BarChart01_Label";
import { tailwindConfig } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const accessToken = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const today = new Date();
  const endDate = new Date(today);
  const startDate = new Date(today);

  endDate.setDate(today.getDate() + 1);
  startDate.setDate(today.getDate() - 6); // Subtract 6 days to get the start date

  // Format the dates to yyyy-mm-dd
  // const formattedStartDate = startDate.toISOString().split('T')[0];
  // const formattedEndDate = endDate.toISOString().split('T')[0];

  const [loadingPR, setLoadingPR] = useState(false);
  const [loadingLR, setLoadingLR] = useState(false);
  const [loadingAR, setLoadingAR] = useState(false);
  const [loadingADR, setLoadingADR] = useState(false);

  // console.log(accessToken);

  const [datePRStart, setDatePRStart] = useState(
    moment(startDate).format("YYYY-MM-DD")
  );
  const [datePREnd, setDatePREnd] = useState(
    moment(endDate).format("YYYY-MM-DD")
  );

  const [PRHighLight, setPRHighLight] = useState(null);
  const [PRLeadOverView, setPRLeadOverView] = useState([]);
  const [PRTaskOverView, setPRTaskOverView] = useState([]);
  const [PRUpCommingSite, setPRUpCommingSiteVisit] = useState([]);

  // Reusable function for Axios GET request
  const apiCall = (url, token) => {
    return Axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error fetching data from ${url}:`, error);
        throw error; // Re-throw the error for handling in the calling function
      });
  };

  //PPERFORMANCE REPORT
  useEffect(() => {
    const fetchData = async () => {
      setLoadingPR(true);
      try {
        await Promise.all([
          getPRHighlights(),
          getPRTaskOverView(),
          getPRUpCommingSiteVisit(),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPR(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchPR = () => {
    setLoadingPR(true);
    const paramObject = {
      start_date: datePRStart,
      end_date: datePREnd,
    };
    const paramArray = [];

    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }
    const queryString = paramArray.join("&");
    apiCall(`admin-pannel/leads-overview/?${queryString}`)
      .then((res) => {
        setPRLeadOverView(res);
      })
      .catch((err) => {});

    apiCall(`admin-pannel/lead-sv-book/?${queryString}`)
      .then((res) => {
        setLRSVBooking(res);
      })
      .catch((err) => {})
      .finally(() => setLoadingPR(false));
  };

  useEffect(() => {
    handleSearchPR();
  }, [datePRStart, datePREnd]);

  const getPRHighlights = () => {
    apiCall("admin-pannel/pr-highlight-metrics/")
      .then((res) => {
        setPRHighLight(res);
      })
      .catch((err) => {});
  };

  // const [PRLeadOverViewChartData,setPRLeadOverViewChartData]=useState();
  // const [IsPRLeadOverViewDataReady,setIsPRLeadOverViewDataReady]=useState(false);
  // //FIRST TABLE FIRST GRAPH
  // useEffect(()=>{
  // const fetchData = async () => {
  // 	setIsPRLeadOverViewDataReady(false);
  // 	const PRLeadOverViewuniqueSources = [...new Set(PRLeadOverView.map(item => item.lead_source))];
  // 	const PRLeadOverViewdates = [...new Set(PRLeadOverView.map(item => item.date))];

  // 	const PRLeadOverViewgroupedData = PRLeadOverViewdates.map(date => {
  // 	const dailyData =PRLeadOverView.filter(item => item.date === date);
  // 	const sourceCounts = PRLeadOverViewuniqueSources.map(source => {
  // 		const sourceData = dailyData.find(item => item.lead_source === source);
  // 		return sourceData ? sourceData.lead_count : 0;
  // 	});
  // 	return { date, data: sourceCounts };
  // 	});

  // 	const chartData = {
  // 		labels: PRLeadOverViewuniqueSources,
  // 		datasets: PRLeadOverViewgroupedData.map(group => ({
  // 		  label: group.date,
  // 		  data: group.data,
  // 		  backgroundColor: tailwindConfig().theme.colors.indigo[300],
  // 		  hoverBackgroundColor: tailwindConfig().theme.colors.indigo[400],
  // 		  barPercentage: 0.66,
  // 		  categoryPercentage: 0.66,
  // 		}))
  // 	  };

  // 	//   console.log(PRLeadOverViewchartData)
  // 	setPRLeadOverViewChartData(chartData);
  // 	setIsPRLeadOverViewDataReady(true);
  // }
  // fetchData();
  // },[PRLeadOverView])

  const getPRTaskOverView = () => {
    apiCall("admin-pannel/task-overview/")
      .then((res) => {
        setPRTaskOverView(res);
      })
      .catch((err) => {});
  };

  const getPRUpCommingSiteVisit = () => {
    apiCall("admin-pannel/upcoming-site-visits/")
      .then((res) => {
        setPRUpCommingSiteVisit(res);
      })
      .catch((err) => {});
  };

  // const handleChangePR=(e)=>{
  // setDatePR(prev=>({
  //   ...prev,
  //   start_date: e
  // }))
  //   }

  //LEADS REPORT

  const [dateLRStart, setDateLRStart] = useState(
    moment(startDate).format("YYYY-MM-DD")
  );
  const [dateLREnd, setDateLREnd] = useState(
    moment(endDate).format("YYYY-MM-DD")
  );

  const [LRHighLight, setLRHighLight] = useState(null);
  const [LRSVBooking, setLRSVBooking] = useState([]);
  const [LRSourceAnalysis, setLRSourceAnalysis] = useState([]);
  const [LRUpCommingSite, setLRUpCommingSiteVisit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingLR(true);
      try {
        await Promise.all([getLRHighlights()]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingLR(false);
      }
    };

    fetchData();
  }, []);

  // const handleSearchLR=()=>{
  // setLoadingLR(true)
  // const paramObject=
  // {
  //   start_date:dateLR.start_date,
  //   end_date:dateLR.end_date,
  // }
  // const paramArray=[];

  // for(const key in paramObject){
  //   if(paramObject[key]){
  // 	paramArray.push(`${key}=${paramObject[key]}`)
  //   }
  // }
  // const queryString = paramArray.join("&");

  // 	apiCall(`admin-pannel/lead-source-analysis/?${queryString}`)
  // 	.then(res=>{setLRSourceAnalysis(res)})
  // 	.catch(err=>{})
  // 	.finally(()=>setLoadingLR(false))
  // }

  // useEffect(()=>{
  // handleSearchLR();
  // },[dateLR.start_date,dateLR.end_date])

  const getLRHighlights = () => {
    apiCall("admin-pannel/lr-highlight-metrics/")
      .then((res) => {
        setLRHighLight(res);
      })
      .catch((err) => {});
  };

  // const handleChangeLR=(e)=>{
  // setDateLR(prev=>({
  //   ...prev,
  //   [e.target.name]: e.target.value
  // }))
  //   }

  //AGENT REPORT

  const [dateARStart, setDateARStart] = useState(
    moment(startDate).format("YYYY-MM-DD")
  );
  const [dateAREnd, setDateAREnd] = useState(
    moment(endDate).format("YYYY-MM-DD")
  );

  const [ARPerformance, setARPerformance] = useState(null);
  const [ARTop, setARTop] = useState([]);
  // const [ARSourceAnalysis,setARSourceAnalysis]=useState([])
  // const [ARUpCommingSite,setARUpCommingSiteVisit]=useState([])

  // useEffect(() => {
  // 	const fetchData = async () => {
  // 	  setLoadingAR(true);
  // 	  try {
  // 		await Promise.all([getARHighlights()]);
  // 	  } catch (error) {
  // 		console.error(error);
  // 	  } finally {
  // 		setLoadingAR(false);
  // 	  }
  // 	};

  // 	fetchData();
  //   }, []);

  const handleSearchAR = () => {
    setLoadingAR(true);
    const paramObject = {
      start_date: dateARStart,
      end_date: dateAREnd,
    };
    const paramArray = [];

    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }
    const queryString = paramArray.join("&");
    apiCall(`admin-pannel/agent-perf-report/?${queryString}`)
      .then((res) => {
        setARPerformance(res);
      })
      .catch((err) => {});

    apiCall(`admin-pannel/top-agent-perf/?${queryString}`)
      .then((res) => {
        setARTop(res);
      })
      .catch((err) => {})
      .finally(() => setLoadingAR(false));
  };

  useEffect(() => {
    handleSearchAR();
  }, [dateARStart, dateAREnd]);

  // const handleChangeAR=(e)=>{
  // setDateAR(prev=>({
  //   ...prev,
  //   start_date: e
  // }))
  //   }

  //ADDITIONAL REPORT

  const [dateADR, setDateADR] = useState({
    start_date: moment(startDate).format("YYYY-MM-DD"),
    end_date: moment(endDate).format("YYYY-MM-DD"),
  });
  const [ADRAll, setADRAll] = useState(null);
  const [ADRPerformance, setADRPerformance] = useState([]);
  const [ADRPlatform, setADRPlatform] = useState([]);
  const [adrPerformanceButton, setAdrPerformanceButton] = useState("month");
  const [adrPlatformButton, setAdrPlatformButton] = useState("month");

  useEffect(() => {
    const fetchData = async () => {
      setLoadingADR(true);
      try {
        await Promise.all([getADRPerformance(), getADRPlatform()]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingADR(false);
      }
    };
    fetchData();
  }, [adrPerformanceButton]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingADR(true);
      try {
        await Promise.all([getADRPlatform()]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingADR(false);
      }
    };
    fetchData();
  }, [adrPlatformButton]);

  const handleSearchADR = () => {
    setLoadingADR(true);
    const paramObject = {
      start_date: dateARStart,
      end_date: dateAREnd,
    };
    const paramArray = [];

    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }
    const queryString = paramArray.join("&");
    apiCall(`admin-pannel/all-time-leads/?${queryString}`)
      .then((res) => {
        setADRAll(res);
      })
      .catch((err) => {})

      .finally(() => setLoadingADR(false));
  };

  useEffect(() => {
    handleSearchADR();
  }, [dateADR.start_date, dateADR.end_date]);

  const getADRPerformance = () => {
    apiCall(`admin-pannel/performance-trend/?period=${adrPerformanceButton}`)
      .then((res) => {
        setADRPerformance(res);
      })
      .catch((err) => {});
  };

  const getADRPlatform = () => {
    apiCall(`admin-pannel/plat-comp/?period=${adrPlatformButton}`)
      .then((res) => {
        setADRPlatform(res);
      })
      .catch((err) => {});
  };

  //   const handleChangeADR=(e)=>{
  // 	setDateAR(prev=>({
  // 	  ...prev,
  // 	  [e.target.name]: e.target.value
  // 	}))
  // }

  return (
    <div>
      <div className="flex items-center justify-between my-5 flex-col md:flex-row">
        <Heading title={"Performance Report"} />
        <DateFilter
          placeholderGRT={"Date Greater then"}
          placeholderLES={"Date Less then"}
          valueGRT={datePRStart}
          nameLes={"end_date"}
          nameGRT={"start_date"}
          valueLES={datePREnd}
          onChangeGRT={setDatePRStart}
          onChangeLES={setDatePREnd}
        />
      </div>
      {loadingPR ? (
        <Spinner />
      ) : (
        <div className=" space-y-5">
          {/* PR HIGHLIGHT */}
          <div className="flex items-center justify-between gap-5 lg:flex-row flex-col">
            <DashboardSingleValueCard
              heading={"Today"}
              subHeading={"Task"}
              value={PRHighLight?.today_task ?? 0}
              style={"lg:w-1/3"}
              onClick={() =>
                navigate("/admin/dashboarddetails", {
                  state: {
                    url: "/admin-pannel/pr-highlight-metrics-data-today-task/",
                    excel: "excel-files/pr-high-light-today-task/",
                    name: "today_task",
                  },
                })
              }
            />
            <DashboardSingleValueCard
              heading={"Next Schedule"}
              subHeading={"Task"}
              value={PRHighLight?.next_scheduled_leads ?? 0}
              style={"lg:w-1/3"}
              onClick={() =>
                navigate("/admin/dashboarddetails", {
                  state: {
                    url: "/admin-pannel/pr-highlight-metrics-data-next-schedule-task/",
                    excel: "excel-files/pr-high-light-next-shedule-task/",
                    name: "next_schedule_task",
                  },
                })
              }
            />
            <DashboardSingleValueCard
              heading={"Pending"}
              subHeading={"Task"}
              value={PRHighLight?.pending ?? 0}
              style={"lg:w-1/3"}
              onClick={() =>
                navigate("/admin/dashboarddetails", {
                  state: {
                    url: "/admin-pannel/pr-highlight-metrics-data-pending/",
                    excel: "excel-files/pr-high-light-pending-task/",
                    name: "pending_task",
                  },
                })
              }
            />
          </div>
          {/* LR HIGHLIGHT */}
          <div className="flex items-center justify-between gap-5 lg:flex-row flex-col">
            <DashboardSingleValueCard
              heading={"Today"}
              subHeading={"Lead"}
              value={LRHighLight?.leads_today ?? 0}
              style={"lg:w-1/3"}
              onClick={() =>
                navigate("/admin/viewleads", {
                  state: {
                    start_date: moment(
                      today.setDate(today.getDate())
                    ).format("YYYY-MM-DD"),
                    end_date: moment(today.setDate(today.getDate() + 1)).format(
                      "YYYY-MM-DD"
                    ),
                  },
                })
              }
            />
            <DashboardSingleValueCard
              heading={"Last 7 Days"}
              subHeading={"Lead"}
              value={LRHighLight?.leads_7_day ?? 0}
              style={"lg:w-1/3"}
              onClick={() =>
                navigate("/admin/viewleads", {
                  state: {
                    start_date: moment(
                      today.setDate(today.getDate() - 6)
                    ).format("YYYY-MM-DD"),
                    end_date: moment(today.setDate(today.getDate() + 7)).format(
                      "YYYY-MM-DD"
                    ),
                  },
                })
              }
            />
            <DashboardSingleValueCard
              heading={"Booked"}
              subHeading={"Lead"}
              value={LRHighLight?.booking ?? 0}
              style={"lg:w-1/3"}
              onClick={() =>
                navigate("/admin/viewleads", { state: { booked: true } })
              }
            />
          </div>
          {/* LR SV AND BOOKING */}
          <div className="flex items-center justify-between gap-5 lg:flex-row flex-col">
            <DashboardSingleValueCard
              heading={"Site Visits"}
              subHeading={"Lead"}
              value={LRSVBooking["site visits"] ?? 0}
              style={"lg:w-1/2"}
              onClick={() =>
                navigate("/admin/sitevisits", {
                  state: { start_date: datePRStart, end_date: datePREnd },
                })
              }
            />
            <DashboardSingleValueCard
              heading={"Booking Secured"}
              subHeading={"Lead"}
              value={LRSVBooking?.booking_sceured ?? 0}
              style={"lg:w-1/2"}
              onClick={() =>
                navigate("/admin/viewleads", {
                  state: {
                    start_date: datePRStart,
                    end_date: datePREnd,
                    booked: true,
                  },
                })
              }
            />
          </div>
          {/* PR LEAD OVERVIEW */}
          <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Source Performance (Change Date to Filter)
              </h2>
              <Button
                title={"More Details"}
                onClick={() =>
                  navigate("/admin/leadsreport", {
                    state: { start_date: datePRStart, end_date: datePREnd },
                  })
                }
              />
            </header>
            <div className="p-3">
              <div className="overflow-x-auto max-h-[60vh]">
                {PRLeadOverView?.length > 0 ? (
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className=" sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Date</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Lead Count
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Lead Source
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                      {PRLeadOverView &&
                        PRLeadOverView.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {moment(new Date(item?.date)).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.lead_count ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.lead_source ?? "-"}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <p className="lg:text-xl text-base font-semibold">
                      No Details Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* PR LEAD OVERVIEW GRAPH */}
          {/* {IsPRLeadOverViewDataReady?<div className="md:w-3/4 w-full">
					<div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
						<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
							<h2 className="font-semibold text-slate-800 dark:text-slate-100">Source Performance</h2>
						</header>
						
						<BarChart data={PRLeadOverViewChartData}  width={400} height={300} />
					</div>
			</div>:''} */}
          {/* PR TASK OVERVIEW */}
          <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Agent Task Overview
              </h2>
              <Button
                title={"More Details"}
                onClick={() => navigate("/admin/agentsreport")}
              />
            </header>
            <div className="p-3">
              <div className="overflow-x-auto max-h-[60vh]">
                {PRTaskOverView?.length > 0 ? (
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className=" sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Agent Name
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Lead Count
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                      {PRTaskOverView &&
                        PRTaskOverView.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.assigned_to ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.lead_count ?? "-"}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <p className="lg:text-xl text-base font-semibold">
                      No Details Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* PR UPCOMING SITE VISIT */}
          <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Upcoming Site Visit
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto max-h-[60vh]">
                {PRUpCommingSite?.length > 0 ? (
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className=" sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Date of Visit
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Agent Name
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Client Name
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                      {PRUpCommingSite &&
                        PRUpCommingSite.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {moment(new Date(item?.date_of_visit)).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.agent_name ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.name ?? "-"}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <p className="lg:text-xl text-base font-semibold">
                      No Details Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className='flex items-center justify-between my-5'>
			<Heading title={'Lead Report'}/>
			<DateFilter placeholderGRT={'Date Greater then'} placeholderLES={'Date Less then'} valueGRT={dateLR.start_date} nameLes={'end_date'} nameGRT={'start_date'} valueLES={dateLR.end_date} onChangeGRT={handleChangeLR} onChangeLES={handleChangeLR}/>
		</div> */}
      {/* {loadingPR?<Spinner/>:
		<div className=' space-y-5'>
	<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Lead Source Analysis (Change Date to Filter)</h2>
      </header>
      <div className="p-3" >
        <div className="overflow-x-auto max-h-[60vh]" >
          {LRSourceAnalysis?.length>0?<table className="table-auto w-full">
            <thead className=" sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
              <tr >
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Lead Source</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Lead Count</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                LRSourceAnalysis&&LRSourceAnalysis.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td className="p-4 whitespace-nowrap">
						  <div className="text-base text-center text-black dark:text-slate-300">{item?.lead_source??"-"}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
						  <div className="text-base text-center text-black dark:text-slate-300">{item?.lead_count??"-"}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>:<div className='w-full flex items-center justify-center'>
		<p className='lg:text-xl text-base font-semibold'>No Details Found</p>
	  </div>}
        </div>


      </div>
    </div>
	
		</div>} */}
      <div className="flex items-center justify-between my-5 flex-col md:flex-row">
        <Heading title={"Agent Report"} />
        <DateFilter
          placeholderGRT={"Date Greater then"}
          placeholderLES={"Date Less then"}
          valueGRT={dateARStart}
          nameLes={"end_date"}
          nameGRT={"start_date"}
          valueLES={dateAREnd}
          onChangeGRT={setDateARStart}
          onChangeLES={setDateAREnd}
        />
      </div>
      {loadingAR ? (
        <Spinner />
      ) : (
        <div className=" space-y-5">
          {/* LR LEAD SOURCE ANALYSIS */}
          <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Agent Performance (Change Date to Filter)
              </h2>
              <Button
                title={"More Details"}
                onClick={() =>
                  navigate("/admin/performancereport", {
                    state: { start_date: dateARStart, end_date: dateAREnd },
                  })
                }
              />
            </header>
            <div className="p-3">
              <div className="overflow-x-auto max-h-[60vh]">
                {ARPerformance?.length > 0 ? (
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className=" sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Agent Name
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Site Visit
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Booked
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Total Leads
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                      {ARPerformance &&
                        ARPerformance.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.assigned_to__name ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.site_visit_count ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.booked_count ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.total_count ?? "-"}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <p className="lg:text-xl text-base font-semibold">
                      No Details Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-evenly gap-5 flex-row">
            <div className="lg:w-72 lg:h-72 md:w-54 md:h-54 w-44 h-44  bg-indigo-500 rounded-2xl shadow-lg flex items-center justify-evenly p-4 flex-col border hover:bg-indigo-700 transition-all ease-in-out cursor-default">
              <p className="lg:text-3xl md:text-lg text-sm text-center font-extrabold text-white">
                TOP BOOKED
              </p>
              <p className="lg:text-4xl md:text-2xl text-lg font-extrabold text-white">
                {ARTop[0]?.booked_count}
              </p>
              <p className="lg:text-3xl md:text-lg text-sm font-extrabold text-center text-white capitalize">
                {ARTop[0]?.assigned_to__name}
              </p>
            </div>
            <div className="lg:w-72 lg:h-72 md:w-54 md:h-54 w-44 h-44 bg-indigo-500 rounded-2xl shadow-lg flex items-center justify-evenly p-4 flex-col border hover:bg-indigo-700 transition-all ease-in-out cursor-default">
              <p className="lg:text-3xl md:text-lg text-sm text-center font-extrabold text-white">
              TOP SITE VISIT
              </p>
              <p className="lg:text-4xl md:text-2xl text-lg font-extrabold text-white">
                {ARTop[1]?.site_visit_count}
              </p>
              <p className="lg:text-3xl md:text-lg text-sm font-extrabold text-center text-white capitalize">
                {ARTop[1]?.assigned_to__name}
              </p>
            </div>
            <div className="lg:w-72 lg:h-72 md:w-54 md:h-54 w-44 h-44 bg-indigo-500 rounded-2xl shadow-lg flex items-center justify-evenly p-4 flex-col border hover:bg-indigo-700 transition-all ease-in-out cursor-default">
              <p className="lg:text-3xl md:text-lg text-sm text-center font-extrabold text-white">
                TOP TOTAL LEADS
              </p>
              <p className="lg:text-4xl md:text-2xl text-lg font-extrabold text-white">
                {ARTop[2]?.total_count}
              </p>
              <p className="lg:text-3xl md:text-lg text-sm font-extrabold text-center text-white capitalize">
                {ARTop[2]?.assigned_to__name}
              </p>
            </div>
          </div>
          {/* <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Agents (Change Date to Filter)</h2>
      </header>
      <div className="p-3" >
        <div className="overflow-x-auto max-h-[60vh]" >
          {ARTop?.length>0?<table className="table-auto w-full">
            <thead className=" sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
              <tr >
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Agent Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Site Visit</div>
                </th>
				<th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Booked</div>
                </th>
				<th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Total Leads</div>
                </th>
              </tr>
            </thead>
            
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                ARTop&&ARTop.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td className="p-4 whitespace-nowrap">
						  <div className="text-base text-center text-black dark:text-slate-300">{item?.assigned_to__name??"-"}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
						  <div className="text-base text-center text-black dark:text-slate-300">{item?.site_visit_count??"-"}</div>
                      </td>
					  <td className="p-4 whitespace-nowrap">
						  <div className="text-base text-center text-black dark:text-slate-300">{item?.booked_count??"-"}</div>
                      </td>
					  <td className="p-4 whitespace-nowrap">
						  <div className="text-base text-center text-black dark:text-slate-300">{item?.total_count??"-"}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>:<div className='w-full flex items-center justify-center'>
		<p className='lg:text-xl text-base font-semibold'>No Details Found</p>
	  </div>}
        </div>
      </div>
    </div> */}
        </div>
      )}
      <div className="flex items-center justify-between my-5 flex-col md:flex-row">
        <Heading title={"Additional Report"} />
        {/* <DateFilter placeholderGRT={'Date Greater then'} placeholderLES={'Date Less then'} valueGRT={dateADR.start_date} nameLes={'end_date'} nameGRT={'start_date'} valueLES={dateAR.end_date} onChangeGRT={handleChangeADR} onChangeLES={handleChangeADR}/> */}
      </div>
      {loadingADR ? (
        <Spinner />
      ) : (
        <div className=" space-y-5">
          {/* ADR TOTAL LEAD */}
          <div className="flex items-center justify-between gap-5 lg:flex-row flex-col">
            <DashboardSingleValueCard
              heading={"Total"}
              subHeading={"Lead"}
              value={ADRAll?.total_leads ?? 0}
              style={"lg:w-full"}
            />
          </div>
          {/* ADR LEAD SOURCE ANALYSIS */}
          <div className="flex items-end justify-end gap-5 flex-col md:flex-row">
            <Button
              title={"Monthly"}
              onClick={() => setAdrPerformanceButton("month")}
            />
            <Button
              title={"Quartly"}
              onClick={() => setAdrPerformanceButton("quarter")}
            />
            <Button
              title={"Yearly"}
              onClick={() => setAdrPerformanceButton("year")}
            />
          </div>
          <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 transition-transform duration-300 ease-in-out">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Agent report /{" "}
                <span className=" capitalize">{adrPerformanceButton}</span>ly
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto max-h-[60vh]">
                {ADRPerformance?.length > 0 ? (
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className=" sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center capitalize">
                            {adrPerformanceButton}
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Site Visit
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Booked
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Total Leads
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                      {ADRPerformance &&
                        ADRPerformance.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {adrPerformanceButton == "month"
                                    ? `${moment(item?.period).format(
                                        "MMMM"
                                      )} ${moment(item?.period).format("yyyy")}`
                                    : adrPerformanceButton == "quarter"
                                    ? `${moment(
                                        item?.period
                                      ).quarter()}Q ${moment(
                                        item?.period
                                      ).format("yyyy")}`
                                    : adrPerformanceButton == "year"
                                    ? moment(item?.period).format("YYYY")
                                    : "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.site_visit_count ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.booked_count ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.total_count ?? "-"}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <p className="lg:text-xl text-base font-semibold">
                      No Details Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end gap-5 flex-col md:flex-row">
            <Button
              title={"Monthly"}
              onClick={() => setAdrPlatformButton("month")}
            />
            <Button
              title={"Quartly"}
              onClick={() => setAdrPlatformButton("quarter")}
            />
            <Button
              title={"Yearly"}
              onClick={() => setAdrPlatformButton("year")}
            />
          </div>
          <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Platform Report /{" "}
                <span className=" capitalize">{adrPlatformButton}</span>ly
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto max-h-[60vh]">
                {ADRPlatform?.length > 0 ? (
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className=" sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center capitalize">
                            {adrPlatformButton}
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Source
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Site Visit
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Booked
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Total Leads
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                      {ADRPlatform &&
                        ADRPlatform.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {adrPlatformButton == "month"
                                    ? `${moment(item?.period).format(
                                        "MMMM"
                                      )} ${moment(item?.period).format("yyyy")}`
                                    : adrPlatformButton == "quarter"
                                    ? `${moment(
                                        item?.period
                                      ).quarter()}Q ${moment(
                                        item?.period
                                      ).format("yyyy")}`
                                    : adrPlatformButton == "year"
                                    ? moment(item?.period).format("YYYY")
                                    : "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.lead_source__lead_source ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.site_visit_count ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.booked_count ?? "-"}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-base text-center text-black dark:text-slate-300">
                                  {item?.total_count ?? "-"}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <p className="lg:text-xl text-base font-semibold">
                      No Details Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
