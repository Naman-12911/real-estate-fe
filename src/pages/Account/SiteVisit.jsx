import React, { useEffect, useRef, useState } from "react";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import DateFilter from "../../components/DateFilter";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import moment from "moment";
import axios from "axios";

export default function SiteVisit() {
  const accessToken = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [dateSearchGrt, setdateSearchGrt] = useState("");
  const [dateSearchLess, setdateSearchLess] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [columnFilter, setColumnFilter] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [leadStatusData, setLeadStatusData] = useState([]);

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
    Axios.get(`/social/fb-lead/filter/site-visit/?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cancelToken: cancelTokenSource.token,
    })
      .then((res) => {
        // console.log(res.data)
        setTotalPage(res.data.total_pages);
        setData(res.data.results);
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
      meta:{
        smallWidth:true,
      }
    },
    {
      accessorKey: "created_at",
      header: "Enquiry Date",
      cell: (info) => {
        const { created_at } = info.row.original;
        return moment(new Date(created_at)).format("DD-MM-YYYY");
      },
      meta:{
        smallWidth:true,
      }
    },
    {
      accessorKey: "visit_date",
      header: "Site Visit Date",
      cell: (info) => {
        const { visit_date,created_at } = info.row.original;
        return moment(new Date(visit_date||created_at)).format("DD-MM-YYYY");
      },
      meta:{
        smallWidth:true,
      }
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
      accessorKey: "visit_number",
      header: "Visit Count",
      meta: {
          filterVariant: "text",
          filterTextType: "number",
          smallWidth: true,
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
      accessorKey: "get_site_visit_to_name",
      header: "Visited By",
      meta: {
        filterVariant: "select",
        options: agentData,
      },
    },
    {
      accessorKey: "assigned_to_name",
      header: "Current Assigned Agent",
      meta: {
        filterVariant: "select",
        options: agentData,
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
  ];

  return (
    <div>
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Site Visits"} />
      </div>
      <div className="py-3 w-full max-w-[1000rem] mx-auto space-y-5">
        <div className="flex justify-between items-end gap-5 xl:flex-row flex-col">
          <Button
            title={"Add Site Visit"}
            onClick={() => navigate("/newsitevisits")}
          />
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
