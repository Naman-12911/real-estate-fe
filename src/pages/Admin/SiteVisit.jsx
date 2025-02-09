import React, { useEffect, useRef, useState } from "react";
import Heading from "../../components/Heading";
// import DashboardCard10_ViewLeads from "../../partials/dashboard/DashboardCard10_ViewLeads";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
// import FilterButton from "../../components/FilterButton";
// import Datepicker from "../../components/Datepicker";

import Axios from "../../Axios";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
// import ViewLeadsMainAdmin from "../../components/ViewLeadsMainAdmin";
import DateFilter from "../../components/DateFilter";
import dateFormat from "dateformat";
import Pagination from "../../components/Pagination";
import HorizontalScrollButton from "../../components/HorizontalScrollButton";
import { useLocation, useNavigate } from "react-router-dom";
import SearchSingleSelectInput from "../../components/SearchSingleSelectInput";
import Table from "../../components/Table";
import moment from "moment";
import downloadWordExcel from "../../components/advanceComponent/downloadWordExcel";
import { currentDateTime } from "../../components/advanceComponent/currentDateTime";
import CountInfoCardAdmin from "../../components/CountInfoCardAdmin";
import axios from "axios";

export default function SiteVisit() {
  const accessToken = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const {state}=useLocation()

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [dateSearchGrt, setdateSearchGrt] = useState(state?.start_date||"");
  const [dateSearchLess, setdateSearchLess] = useState(state?.end_date||"");
  const [projectData, setProjectData] = useState([]);
  const [columnFilter, setColumnFilter] = useState([]);
  const [leadStatusData, setLeadStatusData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [count,setCount]=useState({
    count:0,
    project:{},
  })
  // console.log(count);

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
          value: item.project_name,
        }));
        setProjectData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Lead Status Type
    Axios.get(`/social/status-lead/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.status_lead.replace(/_/g, " "),
          value: item.status_lead,
        }));
        setLeadStatusData(data);
      })
      .catch((err) => {
        console.log(err);
      });



      //Agent
      Axios.get('/admin-leads/sales-person-count/',{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          },
      })
      .then(res=>{
        const data = res.data.map((item) => ({
          label: item.user,
          value: item.user,
        }));
        setAgentData(data);
      })
      .catch(err=>{
        console.log(err.response.data)
      })
  }, []);

  useEffect(()=>{
    const paramObject = {
      start_date: dateSearchGrt,
      end_date: dateSearchLess,
    };

    columnFilter.forEach((filter) => {
      paramObject[filter.id] = filter.value;
    });

    const paramArray = [];

    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }
    const queryString = paramArray.join("&");

    //Lead Count
    Axios.get(`/admin-pannel/count-of-site-viste-project/?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setCount(prev=>({
          ...prev,
          project:res.data
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  },[dateSearchGrt,dateSearchLess])

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");

  const pendingRequests = useRef(0);
  const cancelTokens = useRef([]);

  const handleSearch = () => {
    pendingRequests.current += 1;
    setLoading(true);
    const cancelTokenSource = axios.CancelToken.source();
    cancelTokens.current.push(cancelTokenSource);

    // setData(null);
    const paramObject = {
      created_at__gte: dateSearchGrt,
      created_at__lte: dateSearchLess,
      page,
    };

    columnFilter.forEach((filter) => {
      paramObject[filter.id] = filter.value;
    });

    const paramArray = [];

    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }
    const queryString = paramArray.join("&");
    Axios.get(`/admin-pannel/fb-lead/filter/site-visit/?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cancelToken: cancelTokenSource.token,
    })
      .then((res) => {
        // console.log(res.data)
        setTotalPage(res.data.total_pages);
        setData(res.data.results);
        setCount(prev=>({
          ...prev,
          count:res.data.count
        }))
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        // setLoading(false);
      })
      .finally(() => {
        pendingRequests.current -= 1;
        if (pendingRequests.current === 0) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    handleSearch();
    // console.log(columnFilter)
    return () => {
      cancelTokens.current.forEach(source => source.cancel());
      cancelTokens.current = [];
    };

  }, [dateSearchGrt, dateSearchLess, page, columnFilter]);

  const columns = [
    {
      id: "slNo",
      header: "SL No",
      cell: (info) => {
        return (page - 1) * 50 + info.row.index + 1;
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      accessorKey: "created_at",
      header: "Enquiry Date",
      cell: (info) => {
        const { created_at } = info.row.original;
        return moment(new Date(created_at)).format("DD-MM-YYYY");
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      accessorKey: "visit_date",
      header: "Site Visit Date",
      cell: (info) => {
        const { visit_date, created_at } = info.row.original;
        return moment(new Date(visit_date || created_at)).format("DD-MM-YYYY");
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      accessorKey: "full_name",
      header: "Customer Name",
      meta: {
        filterVariant: "text",
        textWrap: true,
      },
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
      meta: {
        filterVariant: "text",
        filterTextType: "number",
      },
    },
    {
      accessorKey: "visit_number",
      header: "Visit Count",
      meta: {
          filterVariant: "text",
          filterTextType: "number",
          smallWidth: true,
      },
    },
    {
      accessorKey: "get_site_visit_to_name",
      header: "Visited By",
      meta: {
        filterVariant: "select",
        options:agentData
      },
    },
    {
      accessorKey: "assigned_to_name",
      header: "Current Assigned Agent",
      meta: {
        filterVariant: "select",
        options:agentData
      },
    },
    {
      accessorKey: "project_name",
      header: "Project Name",
      meta: {
        filterVariant: "select",
        options: projectData,
      },
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
      meta: {
        filterVariant: "text",
        textWrap: true,
      },
    },
    {
      accessorKey: "status_of_lead",
      header: "Lead Status",
      meta: {
        filterVariant: "select",
        options: leadStatusData,
      },
    },
    {
      accessorKey: "status_of_lead_warm_hot_cold",
      header: "HOT/WARM/COLD",
      meta: {
        filterVariant: "select",
        options:[{value:'Hot',label:'HOT'},{value:'Warm',label:'WARM'},{value:'Cold',label:'COLD'},]
      },
    },
    {
      header: "Action",
      cell: (info) => {
        const data = info.row.original;
        return (
          <div className="flex items-center justify-center gap-4">
            <div
              aria-controls="search-modal"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="View"
              onClick={() => navigate("/admin/leadprofile", { state: data })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer"
                viewBox="0 0 576 512"
              >
                <path
                  className=" fill-current "
                  d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"
                />
              </svg>
            </div>
          </div>
        );
      },
      meta: {
        smallWidth: true,
      },
    },
  ];

  const handleExcel = async (urla) => {
    const paramObject = {
      start_date: dateSearchGrt,
      end_date: dateSearchLess,
    };

    columnFilter.forEach((filter) => {
      paramObject[filter.id] = filter.value;
    });

    const paramArray = [];
    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }

    const queryString = paramArray.join("&");

    downloadWordExcel(
      `excel-files/all-leads-site-visit/?${queryString}`,
      `SiteVisitLeads_${dateSearchGrt}_${dateSearchLess}_${currentDateTime()}.xlsx`,
      accessToken,
      "Processing Excel File...",
      "Excel File Saved to your Device Successfully",
      "Excel File Downloaded Successfully",
      "There was a problem with Excel file, please try again"
    );
  };

  // console.log(columnFilter);

  return (
    <div>
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Site Visits"} />
      </div>
      <div className="py-3 w-full max-w-[1000rem] mx-auto space-y-5">
      <div className="flex items-center md:gap-5 gap-2 flex-row justify-evenly flex-wrap">
        
          {/* <CountInfoCardAdmin title={'Total Site Visit'} count={count?.count}/> */}
          {count?.project.length>0&&count?.project?.map((item,index)=>(
            <CountInfoCardAdmin key={index} title={item.project_name} cursor={item.project_name=='Both Projects Count'?'default':'pointer'} count={item?.count} onClick={()=>item.project_name=='Both Projects Count'?'':setColumnFilter(prev=>([
              ...prev,
              {
                id: "project_name",
                value:item.project_name=='Total Site Visits'?'':item.project_name,
            }
            ]))}/>
          ))}
          {/* <CountInfoCardAdmin title={'CI Grand'} count={count?.ci_grand}/>
          <CountInfoCardAdmin title={'CI Estate'} count={count?.ci_estate}/> */}
          
       </div>
        <div className="flex justify-between items-end gap-5 xl:flex-row flex-col">
          <div className="flex justify-between items-end gap-5 xl:flex-row flex-col xl:w-auto w-full">
            <Button title={"Export Excel"} onClick={handleExcel} />
            <Button
              title={"Add Site Visit"}
              onClick={() => navigate("/newsitevisits")}
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
      </div>

      <Table
        setColumnFilter={setColumnFilter}
        columns={columns}
        data={data}
        pageNumber={page}
        setPageNumber={setPage}
        totalPageNumber={totalPage}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Site Visit Leads
          </h2>
        }
      />
    </div>
  );
}
